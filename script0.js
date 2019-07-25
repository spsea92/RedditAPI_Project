const snoowrap = require('snoowrap');

const r = new snoowrap({
  userAgent: 'put your user-agent string here',
  clientId: 'r7GLGBNQBTECDA',
  clientSecret: 'i91T_SezJ3X6Bs8YKIeoUw-V2ZY',
  refreshToken: '25765789422-E-9uLN6x02R12YSJQ4NLYOwMJ5o'
});

/*
Retrieving the first 10 new posts from the mealkits subreddit.
Listings will have all of the properties and values for posts.
*/
// r.getNew('mealkits', {limit: 10}).map(post => post).then(console.log)

// New 100 submissions (author, title, and number of comments) by ID
let listingOfPosts = {};
r.getNew('mealkits', {limit: 100})
  .map(({ id, title, selftext: postText, url, num_comments, author: { name: postAuthor } }) => ({ id, title, postText, url, num_comments, postAuthor }))
  .then(posts => {
    const commentsPromises = []
    posts.forEach(({ id, title, postText, url, num_comments, postAuthor }) => {
      listingOfPosts[id] = { // Retrieving post's title, author, and the number of comments
        title,
        postAuthor,
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
    Object.values(listingOfPosts)
      .forEach(item => { // Creating a property for the post author's replies
        item.authorComments = item.comments.filter(comment => comment.commentAuthor === item.postAuthor)
      })
    console.log(listingOfPosts)
  })