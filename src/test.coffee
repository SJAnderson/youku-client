assert = require 'assert'
Youku = require '../lib/youku'
nock = require 'nock'
VERSION = require('../package.json').version

CLIENT_ID = process.env.YOUKU_CLIENT_ID
CLIENT_SECRET = process.env.YOUKU_CLIENT_SECRET

if not CLIENT_SECRET and not CLIENT_ID
  throw new Error("Missing CLIENT_ID and/or CLIENT_SECRET")

describe 'Youku', ->
  this.timeout 30000
  describe 'Constructor', ->
    describe 'new Youku()', ->
      defaults = {}
      before ->
        defaults = {
          access_token: null
          client_id: null
          client_secret: null
          redirect_uri: null
          rest_base: 'https://openapi.youku.com/v2'
          request_options:
            headers:
              'Accept': '*/*'
              'Connection': 'close'
              'user-agent': "youku-client/#{VERSION}"
        }

      it 'creates new instance', ->
        client = new Youku()
        assert client instanceof Youku

      it 'has default options', ->
        client = new Youku()
        assert.deepEqual Object.keys(defaults), Object.keys(client.options)

      it 'accepts and overrides options', ->
        options = {
          client_id: 12345
          units: 'metric'
          request_options:
            headers:
              'Accepts': 'application/json'
        }

        client = new Youku options
        assert client.options['units']
        assert.equal client.options.power, options.power
        assert.equal client.options.consumer_key, options.consumer_key
        assert.equal client.options.request_options.headers.Accepts, options.request_options.headers.Accepts

      it 'has pre-configured request object', (next) ->
        client = new Youku {
          request_options:
            headers:
              foo: 'bar'
        }

        assert client.request?

        # setup mock endpoint
        nock('http://node.youku').get('/').reply 200
        client.request.get 'http://node.youku/', (err, resp) ->
          {headers} = resp.request

          assert headers.foo?
          assert headers.foo, 'bar'
          assert.equal headers['User-Agent'], "node-youku-client/#{VERSION}"
          next()

  describe 'Prototypes', ->
    client = null

    describe 'authorizeUser()', ->
      before ->
        client = new Youku {
          client_id: CLIENT_ID
          client_secret: CLIENT_SECRET
        }

      it 'method exists', ->
        assert.equal typeof(client.authorizeUser), 'function'

      it 'makes a authorization_code request', (done) ->
        client.authorizeUser null, (err, resp) ->
          assert.equal typeof(err), 'object'
          assert.equal err?.type, 'OAuth2Exception'
          done()

    describe 'endpointBuilder()', ->
      before ->
        client = new Youku {
          client_id: CLIENT_ID
          client_secret: CLIENT_SECRET
        }

      it 'method exists', ->
        assert.equal typeof(client.endpointBuilder), 'function'

      it 'build url', ->
        path = 'videos/by_user'
        endpoint = 'https://openapi.youku.com/v2/videos/by_user'

        assert.throws client.endpointBuilder, Error

        assert.equal(
          client.endpointBuilder(path),
          "#{client.options.rest_base}/#{path}.json"
        )

        assert.equal(
          client.endpointBuilder(path + '.json'),
          "#{client.options.rest_base}/#{path}.json"
        )

        assert.equal(
          client.endpointBuilder("/#{path}"),
          "#{client.options.rest_base}/#{path}.json"
        )

        assert.equal(
          client.endpointBuilder("#{path}/"),
          "#{client.options.rest_base}/#{path}.json"
        )

        assert.equal(
          client.endpointBuilder(endpoint),
          endpoint + '.json'
        )

    describe 'get()', ->
      before ->
        client = new Youku {
          client_id: CLIENT_ID
          client_secret: CLIENT_SECRET
        }

      it 'method exists', ->
        assert.equal typeof(client.get), 'function'

      it 'retrives data', (done) ->
        client.get 'videos/by_user', {
          user_id: 77296796
        }, (err, data) ->
          throw new Error(err) if err
          assert.equal typeof(data), 'object'
          done()

      it 'handles request errors', (done) ->
        client.get 'bad/endpoint', (err, data) ->
          assert.throws ->
            throw new Error(err) if err
          done()

      it 'handles response errors', (done) ->
        client.options.client_id = null
        client.get 'videos/by_user', {
          user_id: 77296796
        }, (err, data) ->
          assert.throws ->
            throw new Error(err) if err
          done()

    describe 'getAuthorizationUrl()', ->
      before ->
        client = new Youku {
          client_id: CLIENT_ID
          client_secret: CLIENT_SECRET
        }

      it 'method exists', ->
        assert.equal typeof(client.getAuthorizationUrl), 'function'

      it 'returns a string', ->
        assert.equal typeof(client.getAuthorizationUrl()), 'string'

    describe 'refreshToken()', ->
      before ->
        client = new Youku {
          client_id: CLIENT_ID
          client_secret: CLIENT_SECRET
        }

      it 'method exists', ->
        assert.equal typeof(client.refreshToken), 'function'

      it 'makes a refresh_token request', (done) ->
        client.refreshToken null, (err, resp) ->
          assert.equal typeof(err), 'object'
          assert.equal err?.type, 'OAuth2Exception'
          done()

    describe 'requestBuilder()', ->
      before ->
        client = new Youku {
          client_id: CLIENT_ID
          client_secret: CLIENT_SECRET
        }

      it 'method exists', ->
        assert.equal typeof(client.requestBuilder), 'function'

      it 'retrives GET data', (done) ->
        client.requestBuilder 'get', 'videos/by_user', {
          user_id: 77296796
        }, (err, data) ->
          throw new Error(err) if err
          assert.equal typeof(data), 'object'
          done()

      it 'retrives POST data', (done) ->
        client.requestBuilder 'post', 'videos/by_user', {
          user_id: 77296796
        }, (err, data) ->
          throw new Error(err) if err
          assert.equal typeof(data), 'object'
          done()

      it 'handles request errors', (done) ->
        client.requestBuilder 'get', 'bad/endpoint', (err, data) ->
          assert.throws ->
            throw new Error(err) if err
          done()

      it 'handles response errors', (done) ->
        client.options.client_id = null
        client.requestBuilder 'get', 'videos/by_user', {
          user_id: 77296796
        }, (err, data) ->
          assert.throws ->
            throw new Error(err) if err
          done()

    describe 'push()', ->
      before ->
        client = new Youku {
          client_id: CLIENT_ID
          client_secret: CLIENT_SECRET
        }

      it 'method exists', ->
        assert.equal typeof(client.post), 'function'

      it 'retrives data', (done) ->
        client.post 'videos/by_user', {
          user_id: 77296796
        }, (err, data) ->
          throw new Error(err) if err
          assert.equal typeof(data), 'object'
          done()

      it 'handles request errors', (done) ->
        client.get 'bad/endpoint', (err, data) ->
          assert.throws ->
            throw new Error(err) if err
          done()

      it 'handles response errors', (done) ->
        client.options.client_id = null
        client.get 'videos/by_user', {
          user_id: 77296796
        }, (err, data) ->
          assert.throws ->
            throw new Error(err) if err
          done()







