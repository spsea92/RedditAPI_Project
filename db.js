const mongoose = require('mongoose')
mongoose.Promise = Promise

const connectPromise = mongoose.connect('mongodb://post-collector:iloveredditposts1@ds157857.mlab.com:57857/reddit-posts')

/* Should be:
const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST, MONGO_PORT, MONGO_DB } = process.env

mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`)

To tell if this will work, run this before "node script0":
  $ echo $MONGO_USER
  post-collector
*/

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