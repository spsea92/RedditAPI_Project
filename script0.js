const snoowrap = require('snoowrap');

 const r = new snoowrap({
    userAgent: 'put your user-agent string here',
    clientId: 'r7GLGBNQBTECDA',
    clientSecret: 'i91T_SezJ3X6Bs8YKIeoUw-V2ZY',
    refreshToken: '25765789422-E-9uLN6x02R12YSJQ4NLYOwMJ5o'
  });

// New submissions (author, title, and number of comments) by ID
let postTitleAuthNumOfComments = {};
r.getNew('mealkits', {limit: 10})
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
    // console.log(postTitleAuthNumOfComments)
    // Object.keys(postTitleAuthNumOfComments).forEach(item => console.log(postTitleAuthNumOfComments[item].comments[0]))
    Object.values(postTitleAuthNumOfComments)
      .forEach(item => {
        item.authorComments = item.comments.filter(comment => comment.commentAuthor === item.postAuthor)
      })
    console.log(postTitleAuthNumOfComments)
/*     console.log(Object.keys(postTitleAuthNumOfComments).filter(id => {
      Object.keys(postTitleAuthNumOfComments[id])
    })) */
/*     Object.keys(postTitleAuthNumOfComments).forEach(item => 
      postTitleAuthNumOfComments[item].comments.forEach(comment => {
        //console.log(comment.commentAuthor)
        if (comment.commentAuthor === postTitleAuthNumOfComments[item].postAuthor) {
            console.log("Cool", postTitleAuthNumOfComments[item].postAuthor, comment.commentAuthor)
        }
        else {
          console.log("Nope", postTitleAuthNumOfComments[item].postAuthor, comment.commentAuthor)
        }
      })
    ) */
/*     console.log(filter(postTitleAuthNumOfComments['cd97m4'].comments, comment => {
      comment.forEach(commentObj =>{
        commentObj.commentAuthor
      })
    })) */
/*     postTitleAuthNumOfComments['cd97m4'].comments.forEach(comment => {
      if (comment.commentAuthor === postTitleAuthNumOfComments['cd97m4'].postAuthor) {
        console.log(comment.commentAuthor)
      }
      else {
        console.log("No such author")
      }
    }) */
  })