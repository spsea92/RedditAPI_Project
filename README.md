# Reddit API Project

Creating a listing of new posts from the subreddit r/mealkits by using [Snoowrap](https://github.com/not-an-aardvark/snoowrap), a JavaScript API wrapper.

## Post Information

Each post objects is defined by a Reddit post ID and consists of the following properties:

* Title
* Author's reddit username
* Number of comments/replies
* Image URL *if post is an image*
* Text of post *if post is not an image*
* Listing of all of the comments/replies
* Listing of post author's comments/replies

The listing will contain 100 new posts. The number of posts can be changed by changing the limit:
```javascript
r.getNew('mealkits', {limit: 100})
```

