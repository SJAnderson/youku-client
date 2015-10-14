(function() {
  var VERSION, Youku, assert, nock;

  assert = require('assert');

  Youku = require('../lib/youku');

  nock = require('nock');

  VERSION = require('../package.json').version;

  describe('Youku', function() {
    describe('Constructor', function() {
      return describe('new Youku()', function() {
        var defaults;
        defaults = {};
        before(function() {
          return defaults = {
            client_id: null,
            rest_base: 'https://openapi.youku.com/v2',
            request_options: {
              headers: {
                'Accept': '*/*',
                'Connection': 'close',
                'user-agent': "youku-client/" + VERSION
              }
            }
          };
        });
        it('creates new instance', function() {
          var client;
          client = new Youku();
          return assert(client instanceof Youku);
        });
        it('has default options', function() {
          var client;
          client = new Youku();
          return assert.deepEqual(Object.keys(defaults), Object.keys(client.options));
        });
        it('accepts and overrides options', function() {
          var client, options;
          options = {
            client_id: 12345,
            units: 'metric',
            request_options: {
              headers: {
                'Accepts': 'application/json'
              }
            }
          };
          client = new Youku(options);
          assert(client.options['units']);
          assert.equal(client.options.power, options.power);
          assert.equal(client.options.consumer_key, options.consumer_key);
          return assert.equal(client.options.request_options.headers.Accepts, options.request_options.headers.Accepts);
        });
        return it('has pre-configured request object', function(next) {
          var client;
          client = new Youku({
            request_options: {
              headers: {
                foo: 'bar'
              }
            }
          });
          assert(client.request != null);
          nock('http://node.youku').get('/').reply(200);
          return client.request.get('http://node.youku/', function(err, resp) {
            var headers;
            headers = resp.request.headers;
            assert(headers.foo != null);
            assert(headers.foo, 'bar');
            assert.equal(headers['User-Agent'], "node-youku-client/" + VERSION);
            return next();
          });
        });
      });
    });
    return describe('Prototypes', function() {
      return describe('endpointBuilder()', function() {
        var client;
        client = null;
        before(function() {
          return client = new Youku();
        });
        it('method exists', function() {
          return assert.equal(typeof client.endpointBuilder, 'function');
        });
        return it('build url', function() {
          var endpoint, path;
          path = 'videos/by_user';
          endpoint = 'https://openapi.youku.com/v2/videos/by_user';
          assert.throws(client.endpointBuilder, Error);
          assert.equal(client.endpointBuilder(path), "" + client.options.rest_base + "/" + path + ".json");
          assert.equal(client.endpointBuilder(path + '.json'), "" + client.options.rest_base + "/" + path + ".json");
          assert.equal(client.endpointBuilder("/" + path), "" + client.options.rest_base + "/" + path + ".json");
          assert.equal(client.endpointBuilder("" + path + "/"), "" + client.options.rest_base + "/" + path + ".json");
          return assert.equal(client.endpointBuilder(endpoint), endpoint + '.json');
        });
      });
    });
  });

}).call(this);
