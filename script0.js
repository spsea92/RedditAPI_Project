const snoowrap = require('snoowrap');

 const r = new snoowrap({
    userAgent: 'put your user-agent string here',
    clientId: 'r7GLGBNQBTECDA',
    clientSecret: 'i91T_SezJ3X6Bs8YKIeoUw-V2ZY',
    refreshToken: '25765789422-E-9uLN6x02R12YSJQ4NLYOwMJ5o'
  });

// New 100 submissions (author, title, and number of comments) by ID
let postTitleAuthNumOfComments = {};
r.getNew('mealkits', {limit: 100})
  .map(({ id, title, num_comments, author: { name: postAuthor } }) => ({ id, title, num_comments, postAuthor }))
  .then(posts => {
    const commentsPromises = []
    posts.forEach(({ id, title, num_comments, postAuthor }) => {
      postTitleAuthNumOfComments[id] = {
        title,
        postAuthor,
        num_comments,
      }
      const commentsPromise = r.getSubmission(id).comments
        .map(({ author: { name: commentAuthor }, body }) => ({ commentAuthor, body }))
        .then(comments => {
          postTitleAuthNumOfComments[id].comments = comments
        })
      commentsPromises.push(commentsPromise)
    })
    // console.log(postTitleAuthNumOfComments)
    return Promise.all(commentsPromises)
  })
  .then(() => {
    Object.values(postTitleAuthNumOfComments)
      .forEach(item => {
        item.authorComments = item.comments.filter(comment => comment.commentAuthor === item.postAuthor)
      })
    // console.log(postTitleAuthNumOfComments)
  })