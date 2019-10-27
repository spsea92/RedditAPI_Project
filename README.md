# Reddit API Project

This simple script that makes a call to the Reddit API in order to create listings of new posts from the subreddit r/mealkits by using [Snoowrap](https://github.com/not-an-aardvark/snoowrap), a JavaScript API wrapper. The post's information is stored in a NoSQL database and would be used for data analysis. 

The listing will contain 100 new posts. This number was arbitrary and can be changed by changing the limit:
```javascript
r.getNew('mealkits', {limit: 100})
```

## Post Information

Each post objects is defined by a Reddit post ID and consists of the following properties:

* Title
* Author's reddit username
* Number of comments/replies
* Image URL *if post is an image*
* Text of post *if post is not an image*
* Listing of all of the comments/replies
* Listing of post author's comments/replies

