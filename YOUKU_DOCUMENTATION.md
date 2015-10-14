# Youku OpenAPI - English Documentation

Source: http://open.youku.com/docs
Disclaimer: I used google translate to create this and I haven't tested all these endpoints. I make no guarantees to the accuracy of this document.

**Endpoints**

#### Users
  - [`users/myinfo`](#users/myinfo)
  - [`users/myinfo`](#users/myinfo)
  - [`users/show`](#users/show)
  - [`users/show_batch`](#users/show_batch)
  - [`users/friendship/followings`](#users/friendship/followings)
  - [`users/friendship/followers`](#users/friendship/followers)
  - [`users/friendship/create`](#users/friendship/create)
  - [`users/subscribe/create`](#users/subscribe/create)
  - [`users/subscribe/get`](#users/subscribe/get)
  - [`users/subscribe/notice`](#users/subscribe/notice)

#### Comments
  - [`comments/show`](#comments/show)
  - [`comments/show_batch`](#comments/show_batch)
  - [`comments/by_video`](#comments/by_video)
  - [`comments/hot/by_video`](#comments/hot/by_video)
  - [`comments/by_me`](#comments/by_me)
  - [`comments/by_mention_me`](#comments/by_mention_me)
  - [`comments/by_reply_me`](#comments/by_reply_me)
  - [`comments/to_me`](#comments/to_me)
  - [`comments/create`](#comments/create)
  - [`comments/destroy`](#comments/destroy)

#### Video
  - [`videos/show_basic`](#videos/show_basic)
  - [`videos/show_basic_batch`](#videos/show_basic_batch)
  - [`videos/show`](#videos/show)
  - [`videos/show_batch`](#videos/show_batch)
  - [`videos/by_me`](#videos/by_me)
  - [`videos/by_user`](#videos/by_user)
  - [`videos/update`](#videos/update)
  - [`videos/destroy`](#videos/destroy)
  - [`videos/by_related`](#videos/by_related)
  - [`videos/favorite/by_me`](#videos/favorite/by_me)
  - [`videos/favorite/by_user`](#videos/favorite/by_user)
  - [`videos/favorite/create`](#videos/favorite/create)
  - [`videos/favorite/destroy`](#videos/favorite/destroy)
  - [`videos/by_category`](#videos/by_category)

#### Programs
#### Playlists/Albums
#### Search
#### People
#### Schemas
#### OAuth2 Authorization
#### Image verification
#### Uploads

-----
### Users
<a name="users/myinfo" />
##### users/myinfo
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |    |
| access_token | string | true |    |

-
<a name="users/myinfo" />
##### users/myinfo
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |    |
| user_id | integer | false |    |
| user_name | string | false |    |

-
<a name="users/show" />
##### users/show
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| user_id | integer | false |   |
| user_name | string | false |   |

-
<a name="users/show_batch" />
##### users/show_batch
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| user_ids | string | false |   |
| user_names | string | false |   |

Note: `user_ids` and `user_names` are a comma separated list of values.

-
<a name="users/friendship/followings" />
##### users/friendship/followings
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| user_id | integer | false |   |
| user_name | string | false |   |
| page | integer | false | 1 |
| count | integer | false | 20 |


-
<a name="users/friendship/followers" />
##### users/friendship/followers
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| user_id | integer | false |   |
| user_name | string | false |   |
| page | integer | false | 1 |
| count | integer | false | 20 |

-
<a name="users/friendship/create" />
##### users/friendship/create
method: `POST`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |

-
<a name="users/subscribe/create" />
##### users/subscribe/create
method: `POST`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| access_token | string | true |   |
| show_id | string | true |   |

-
<a name="users/subscribe/get" />
##### users/subscribe/get
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| access_token | string | true |   |
| page | integer | false | 1 |
| count | integer | false | 20 |

-
<a name="users/subscribe/notice" />
##### users/subscribe/notice
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| access_token | string | true |   |

-----
### Comments
<a name="comments/show" />
##### comments/show
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| comment_id | string | true |   |

-
<a name="comments/show_batch" />
##### comments/show_batch
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| comment_ids | string | true |   |

Note: `comment_ids` is a comma separated string of values.

-
<a name="comments/by_video" />
##### comments/by_video
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| video_id | string | true |   |
| page | integer | false | 1 |
| count | integer | false | 20 |

-
<a name="comments/hot/by_video" />
##### comments/hot/by_video
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| video_id | string | true |   |
| page | integer | false | 1 |
| count | integer | false | 20 |

-
<a name="comments/by_me" />
##### comments/by_me
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| access_token | string | true |   |
| page | integer | false | 1 |
| count | integer | false | 20 |

-
<a name="comments/by_mention_me" />
##### comments/by_mention_me
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| access_token | string | true |   |
| page | integer | false | 1 |
| count | integer | false | 20 |

-
<a name="comments/by_reply_me" />
##### comments/by_reply_me
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| access_token | string | true |   |
| page | integer | false | 1 |
| count | integer | false | 20 |

-
<a name="comments/to_me" />
##### comments/to_me
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| access_token | string | true |   |
| page | integer | false | 1 |
| count | integer | false | 20 |

-
<a name="comments/create" />
##### comments/create
method: `POST`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| access_token | string | true |   |
| video_id | string | true |   |
| content | string | true |   |
| reply_id | string | false |   |
| captcha_key | string | false |   |
| captcha_text | string | false |   |

-
<a name="comments/destroy" />
##### comments/destroy
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| access_token | string | true |   |
| comment_id | string | true |   |

-----
### Video

<a name="videos/show_basic" />
##### videos/show_basic
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| video_id | string | false |   |
| video_url | string | false |   |


<a name="videos/show_basic_batch" />
##### videos/show_basic_batch
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| video_ids | string | true |   |

Note: `video_ids` is a comma separated list of values.

<a name="videos/show" />
##### videos/show
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| video_id | string | true |   |
| ext | string | false |   |

Note: `ext` is a comma separated list of values. Each value represents extended information that can be returned. The list can be found [here](http://open.youku.com/docs?id=46).

<a name="videos/show_batch" />
##### videos/show_batch
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| video_ids | string | true |   |
| ext | string | false |   |

Note: `video_ids` and `ext` are a comma separated list of values. Each value in `ext` represents extended information that can be returned. The list can be found [here](http://open.youku.com/docs?id=47).

<a name="videos/by_me" />
##### videos/by_me
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| access_token | string | true |   |
| orderby | string | false |  published  |
| page | integer | false | 1 |
| count | integer | false | 20 |
| last_item | json string | false |    |

`orderby`: published/view-count/comment-count/favorite-count

Note: not too sure what `last_item` does.

<a name="videos/by_user" />
##### videos/by_user
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| user_id | integer | false |   |
| user_name | string | false |   |
| orderby | string | false |  published  |
| page | integer | false | 1 |
| count | integer | false | 20 |
| last_item | json string | false |    |

`orderby`: published/view-count/comment-count/favorite-count

Note: not too sure what `last_item` does.

<a name="videos/update" />
##### videos/update
method: `POST`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| access_token | string | true |   |
| video_id | string | true |   |
| title | string | false |   |
| tags | string | false |   |
| category | string | false |   |
| copyright_type | string | false |   |
| public_type | string | false |   |
| watch_password | string | false |   |
| description | string | false |   |
| thumbnail_seq | integer | false |   |

`title`: limited to 2-50 single-byte characters, can't all be numbers  
`tags`: each tag is 2-6 characters or 2-12 letters, no more than 10 tags (my translation on this one was a bit rough)  
`category`: ex. the film  
`copyright_type`: values are original/reproduced  
`public_type`: all (everyone can see), friend (friends only), password (password protected)  
`watch_password`: no idea


<a name="videos/destroy" />
##### videos/destroy
method: `POST`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| access_token | string | true |   |
| video_id | string | true |   |

<a name="videos/by_related" />
##### videos/by_related
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| video_id | string | true |   |
| count | integer | false | 20 |

<a name="videos/favorite/by_me" />
##### videos/favorite/by_me
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| access_token | string | true |   |
| orderby | string | false |  favorite-time  |
| page | integer | false | 1 |
| count | integer | false | 20 |

`orderby`: doesn't seem like theres another option other than favorite-time

<a name="videos/favorite/by_user" />
##### videos/favorite/by_user
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| user_id | integer | false |    |
| user_name | string | false |    |
| orderby | string | false |  favorite-time  |
| page | integer | false | 1 |
| count | integer | false | 20 |

`orderby`: doesn't seem like theres another option other than favorite-time

<a name="videos/favorite/create" />
##### videos/favorite/create
method: `POST`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| access_token | string | true |   |
| video_id | string | true |   |

<a name="videos/favorite/destroy" />
##### videos/favorite/destroy
method: `POST`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| access_token | string | true |   |
| video_id | string | true |   |

<a name="videos/by_category" />
##### videos/by_category
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| category | string | false |    |
| genre | string | false |    |
| period | string | false |  today  |
| orderby | string | false |  published  |
| page | integer | false | 1 |
| count | integer | false | 20 |

`period`: today/week/month/history (i believe history is all time)
`orderby`: published/view-count/comment-count/favorite-count

-----
### Programs

-----
### Playlists/Albums

-----
### Search

-----
### People

-----
### Schemas

-----
### OAuth2 Authorization

-----
### Image verification

-----
### Uploads


