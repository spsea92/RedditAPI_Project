const mongoose = require('mongoose')
mongoose.Promise = Promise

const connectPromise = mongoose.connect('mongodb://post-collector:iloveredditposts1@ds157857.mlab.com:57857/reddit-posts')

const postsSchema = mongoose.Schema({
  id: String, // the Reddit ID of the post
  title: String, // the post title
  // TODO: rest of fields here
})
const MealKitsPost = mongoose.model('mealkits-posts', postsSchema)

module.exports = {
  connectPromise,
  MealKitsPost,
}