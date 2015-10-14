assert = require 'assert'
Youku = require '../lib/youku'
nock = require 'nock'
VERSION = require('../package.json').version

describe 'Youku', ->
  describe 'Constructor', ->
    describe 'new Youku()', ->
      defaults = {}
      before ->
        defaults = {
          access_token: null
          client_id: null
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
    describe 'endpointBuilder()', ->
      client = null
      before ->
        client = new Youku()

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
