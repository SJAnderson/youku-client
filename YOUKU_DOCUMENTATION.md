# Youku OpenAPI - English Documentation

Source: http://open.youku.com/docs
Disclaimer: I used google translate to create this and I haven't tested all these endpoints. I make no guarantees to the accuracy of this document.

**Endpoints**
- [Users](#Users)
- [Comments](#Comments)
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
#### users/myinfo
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |    |
| access_token | string | true |    |

-
##### users/myinfo
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |    |
| user_id | string | false |    |
| user_name | string | false |    |

-
##### users/show
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| user_id | string | false |   |
| user_name | string | false |   |

-
##### users/show_batch
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| user_ids | string | false |   |
| user_names | string | false |   |

Note: `user_ids` and `user_names` are a comma separated list of values.

-
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
##### users/friendship/create
method: `POST`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |

-
##### users/subscribe/create
method: `POST`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| access_token | string | true |   |
| show_id | string | true |   |

-
##### users/subscribe/get
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| access_token | string | true |   |
| page | integer | false | 1 |
| count | integer | false | 20 |

-
##### users/subscribe/notice
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| access_token | string | true |   |

-----
<a name="Comments" />
### Comments
##### comments/show
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| comment_id | string | true |   |

-
##### comments/show_batch
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| comment_ids | string | true |   |

Note: `comment_ids` is a comma separated string of values.

-
##### comments/by_video
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| video_id | string | true |   |
| page | integer | false | 1 |
| count | integer | false | 20 |

-
##### comments/hot/by_video
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| video_id | string | true |   |
| page | integer | false | 1 |
| count | integer | false | 20 |

-
##### comments/by_me
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| access_token | string | true |   |
| page | integer | false | 1 |
| count | integer | false | 20 |

-
##### comments/by_mention_me
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| access_token | string | true |   |
| page | integer | false | 1 |
| count | integer | false | 20 |

-
##### comments/by_reply_me
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| access_token | string | true |   |
| page | integer | false | 1 |
| count | integer | false | 20 |

-
##### comments/to_me
method: `GET`

| parameter | type | required | default |
| ------- | ------- | ------- | ------- |
| client_id | string | true |   |
| access_token | string | true |   |
| page | integer | false | 1 |
| count | integer | false | 20 |

-
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


