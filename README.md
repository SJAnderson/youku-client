# Youku for Node.js 

An asyncronous client library for the Youku REST api.

[![Build Status](https://travis-ci.org/SJAnderson/youku-client.svg)](https://travis-ci.org/SJAnderson/youku-client) [![npm version](https://badge.fury.io/js/youku-client.svg)](https://badge.fury.io/js/youku-client)

```js
var Youku = require('youku');
 
var client = new Youku({client_id: ''});
 
client.get('videos/by_user', {
  user_id: 77296796
}, function(error, data, response){
  if (error) {
    return console.log("Error: " + error);
  }
  console.log(data);
});
```

### Installation

`npm install youku-client`

### Quick Start

You will need a developer client id from Youku, which can be obtained [here](http://open.youku.com/). If using chrome and you don't speak chinese, right-click anywhere on the page and select "Translate to <language>".

I highly recommend placing your credentials somewhere private and safe.

```js
var CLIENT_ID = require('/keys/youku.json').client_id;
var client = new Youku({client_id: CLIENT_ID});
```

To make GET and POST requests:

```js
client.get(path, params, callback);
client.post(path, params, callback);
```

### Making Requests

Youku API documentation can be found [here](http://open.youku.com/docs). Though youku provides an english language version of the site, it's incomplete. I'll be adding API documentation to this repository when I get around to it.

Get data about a video:
```js
client.get('videos/show', {
  video_id: XODkyODA3MjI4
}, function(err, video, resp) {
  if (err) {
    return console.log("Error: " + err);
  }
  console.log(video);
  return console.log(resp);
});
```

Get user details:
```js
client.get('users/show', {
  user_name: "Ｈ＆Ｍ"
}, function(err, user, resp) {
  if (err) {
    return console.log("Error: " + err);
  }
  console.log(user);
  return console.log(resp);
});
```
