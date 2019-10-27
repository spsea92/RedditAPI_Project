const snoowrap = require('snoowrap');
const { connectPromise, MealKitsPost } = require('./db');

const r = new snoowrap({
  userAgent: 'put your user-agent string here',
  clientId: 'hidden',
  clientSecret: 'hidden',
  refreshToken: 'hidden'
});

/*
Retrieving the first 10 new posts from the mealkits subreddit.
Listings will have all of the properties and values for posts.
*/
// r.getNew('mealkits', {limit: 10}).map(post => post).then(console.log)

// New 100 submissions (author, title, and number of comments) by ID
let listingOfPosts = {};
const redditPromise = r.getNew('mealkits', {limit: 103})
  .map(({ id, title, selftext: postText, created_utc, url, num_comments, author: { name: postAuthor } }) => ({ id, title, postText, created_utc, url, num_comments, postAuthor }))

Promise.all([redditPromise, connectPromise])
  .then(([posts]) => {
    const commentsPromises = []
    posts.forEach(({ id, title, postText, created_utc, url, num_comments, postAuthor }) => {
      listingOfPosts[id] = { // Retrieving post's title, author, and the number of comments
        id,
        title,
        postAuthor,
        created_utc,
        num_comments,
      }
      if (postText === '') { // Retrieving post's image URL if post is image
        listingOfPosts[id].url = url
      }
      else { // Retrieving post's body text if post is not image
        listingOfPosts[id].postText = postText
      }
      const commentsPromise = r.getSubmission(id).comments // Retrieving comments/replies of each posts
        .map(({ author: { name: commentAuthor }, body }) => ({ commentAuthor, body }))
        .then(comments => {
          listingOfPosts[id].comments = comments
        })
      commentsPromises.push(commentsPromise)
    })
    // console.log(listingOfPosts)
    return Promise.all(commentsPromises)
  })
  .then(() => {
    const savePromises = Object.values(listingOfPosts)
      .map(item => { // Creating a property for the post author's replies
        item.authorComments = item.comments.filter(comment => comment.commentAuthor === item.postAuthor)
        return MealKitsPost.findOneAndUpdate({ id: item.id }, item, { upsert: true }).exec()
      })
    // console.log(listingOfPosts)
    return Promise.all(savePromises)
  })
  .then(() => {
    process.exit(0)
  })
  .catch(err => {
    console.error('Error occurred:', err)
    process.exit(1)
  })