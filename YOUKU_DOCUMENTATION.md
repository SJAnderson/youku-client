# Youku OpenAPI - English Documentation

Source: http://open.youku.com/docs
Disclaimer: I used google translate to create this and I haven't tested all these endpoints. I make no guarantees to the accuracy of this document.

**Endpoints**
- [Users](#Users)
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
- [Comments](#Comments)
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
- [Video](#Video)
- [Programs](#Programs)
- [Playlists/Albums](#Playlists)
- [Search](#Search)
- [People](#People)
- [Schemas](#Schemas)
- [OAuth2 Authorization](#OAuth2)
- [Image verification](#Image)
- [Uploads](#Uploads)

-----
<a name="Users" />
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
| user_id | string | false |    |
| user_name | string | false |    |

-
<a name="users/show" />
##### users/show
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| user_id | string | false |   |
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
| user_id | string | false |   |
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
| user_id | string | false |   |
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
<a name="Comments" />
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
<a name="Video" />
### Video

-----
<a name="Programs" />
### Programs

-----
<a name="Playlists" />
### Playlists/Albums

-----
<a name="Search" />
### Search

-----
<a name="People" />
### People

-----
<a name="Schemas" />
### Schemas

-----
<a name="OAuth2" />
### OAuth2 Authorization

-----
<a name="Image" />
### Image verification

-----
<a name="Uploads" />
### Uploads


