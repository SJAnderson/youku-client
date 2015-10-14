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

You will need a developer client id from Youku, which can be obtained [here](http://open.youku.com/). If using chrome and you don't speak chinese, right-click anywhere on the page and select "Translate to (your language)".

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

### Documentation

I've included Youku API documentation in english [here](https://github.com/SJAnderson/youku-client/blob/master/YOUKU_DOCUMENTATION.md) for your convenience. Youku provides english documentation on their site, but it's incomplete.

### Examples

Examples will go here.

### Contributors

Authored and maintained by [@sjanderson](http://www.github.com/sjanderson).

### License

The MIT License (MIT)

youku-client: Copyright (c) 2015 Steve Anderson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
