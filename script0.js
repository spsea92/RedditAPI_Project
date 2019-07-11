const snoowrap = require('snoowrap');

 const r = new snoowrap({
    userAgent: 'put your user-agent string here',
    clientId: 'r7GLGBNQBTECDA',
    clientSecret: 'i91T_SezJ3X6Bs8YKIeoUw-V2ZY',
    refreshToken: '25765789422-E-9uLN6x02R12YSJQ4NLYOwMJ5o'
  });

// New submissions (author, title, and number of comments) by ID
let postTitleAuthNumOfComments = {};
r.getNew('mealkits', {limit: 5})
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
    console.log(postTitleAuthNumOfComments)
    return Promise.all(commentsPromises)
  })
  .then(() => {
    console.log(postTitleAuthNumOfComments)
  })

// let submissionsAndComments = []
// r.getNew('mealkits', {limit:1})
//   .map(post => [post.id, post.title, post.author.name, post.num_comments])
//   .then(data => {
//     data.forEach([] => {
//       let submissionDetail = {
//         submissionID: datum[0],
//         submissionTitle: datum[1],
//         submissionAuthor: datum[2],
//         commentsOfSubmission: []
//       }
//       //submissionsAndComments.push(submissionDetail)
//       r.getSubmission(datum[0]).comments.map(({ author: { name }, body }) => ({ author, body }))
//       .then(comments => {
//         submissionDetail.commentsOfSubmission.push
//       })
//         //submissionDetail.commentsOfSubmission.push()
//         //console.log({author: comment.author.name})
//         submissionDetail.commentsOfSubmission = Object.assign(submissionDetail.commentsOfSubmission, {
//           author: comment.author.name, 
//           commentBody: comment.body
//         })
//         // console.log(submissionDetail)
//       })
//       submissionsAndComments.push(submissionDetail)
//       console.log(submissionsDetails)

//     })
//   })


// Array with new submissions IDs
// let newSubmissionID = []
// r.getNew('mealkits', {limit: 2})
//   .map(post => post.id)
//   .forEach(item => {
//     let itemInside = []
//     r.getSubmission(item).comments.forEach(comment => {
//       itemInside.push({
//         submissionID: item,
//         commentAuthor: comment.author.name
//       })
//       //console.log(itemInside)
//       return itemInside
//     })
//     .then(console.log(itemInside))
//     //r.getSubmission(item).comments.then(console.log) //-- Worked!
//     // r.getSubmission(item).comments.forEach(comment => {
//     //   newSubmissionID.push({
//     //     commentAuthor: comment.author.name
//     //     //commentBody: comment.body
//     //   })
//     //   console.log(newSubmissionID)
//     // })
//   })





// Comments and it's author of a submission
//r.getSubmission('cbagr0').comments.forEach(comment => console.log(comment.author.name, ":\n", comment.body))

// * Make array of submission IDs
// * -> Make an array of comments for each submission
// * -> Keep only comments made by OP