(function() {
  var CLIENT_ID, CLIENT_SECRET, VERSION, Youku, assert, nock;

  assert = require('assert');

  Youku = require('../lib/youku');

  nock = require('nock');

  VERSION = require('../package.json').version;

  CLIENT_ID = process.env.YOUKU_CLIENT_ID;

  CLIENT_SECRET = process.env.YOUKU_CLIENT_SECRET;

  if (!CLIENT_SECRET && !CLIENT_ID) {
    throw new Error("Missing CLIENT_ID and/or CLIENT_SECRET");
  }

  describe('Youku', function() {
    this.timeout(30000);
    describe('Constructor', function() {
      return describe('new Youku()', function() {
        var defaults;
        defaults = {};
        before(function() {
          return defaults = {
            access_token: null,
            client_id: null,
            client_secret: null,
            redirect_uri: null,
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
      var client;
      client = null;
      describe('authorizeUser()', function() {
        before(function() {
          return client = new Youku({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET
          });
        });
        it('method exists', function() {
          return assert.equal(typeof client.authorizeUser, 'function');
        });
        return it('makes a authorization_code request', function(done) {
          return client.authorizeUser(null, function(err, resp) {
            assert.equal(typeof err, 'object');
            assert.equal(err != null ? err.type : void 0, 'OAuth2Exception');
            return done();
          });
        });
      });
      describe('endpointBuilder()', function() {
        before(function() {
          return client = new Youku({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET
          });
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
      describe('get()', function() {
        before(function() {
          return client = new Youku({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET
          });
        });
        this.timeout(3000);
        it('method exists', function() {
          return assert.equal(typeof client.get, 'function');
        });
        it('retrives data', function(done) {
          return client.get('videos/by_user', {
            user_id: 77296796
          }, function(err, data) {
            if (err) {
              throw new Error(err);
            }
            assert.equal(typeof data, 'object');
            return done();
          });
        });
        it('handles request errors', function(done) {
          return client.get('bad/endpoint', function(err, data) {
            assert.throws(function() {
              if (err) {
                throw new Error(err);
              }
            });
            return done();
          });
        });
        return it('handles response errors', function(done) {
          client.options.client_id = null;
          return client.get('videos/by_user', {
            user_id: 77296796
          }, function(err, data) {
            assert.throws(function() {
              if (err) {
                throw new Error(err);
              }
            });
            return done();
          });
        });
      });
      describe('getAuthorizationUrl()', function() {
        before(function() {
          return client = new Youku({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET
          });
        });
        it('method exists', function() {
          return assert.equal(typeof client.getAuthorizationUrl, 'function');
        });
        return it('returns a string', function() {
          return assert.equal(typeof (client.getAuthorizationUrl()), 'string');
        });
      });
      describe('refreshToken()', function() {
        before(function() {
          return client = new Youku({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET
          });
        });
        it('method exists', function() {
          return assert.equal(typeof client.refreshToken, 'function');
        });
        return it('makes a refresh_token request', function(done) {
          return client.refreshToken(null, function(err, resp) {
            assert.equal(typeof err, 'object');
            assert.equal(err != null ? err.type : void 0, 'OAuth2Exception');
            return done();
          });
        });
      });
      describe('requestBuilder()', function() {
        before(function() {
          return client = new Youku({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET
          });
        });
        it('method exists', function() {
          return assert.equal(typeof client.requestBuilder, 'function');
        });
        it('retrives GET data', function(done) {
          return client.requestBuilder('get', 'videos/by_user', {
            user_id: 77296796
          }, function(err, data) {
            if (err) {
              throw new Error(err);
            }
            assert.equal(typeof data, 'object');
            return done();
          });
        });
        it('retrives POST data', function(done) {
          return client.requestBuilder('post', 'videos/by_user', {
            user_id: 77296796
          }, function(err, data) {
            if (err) {
              throw new Error(err);
            }
            assert.equal(typeof data, 'object');
            return done();
          });
        });
        it('handles request errors', function(done) {
          return client.requestBuilder('get', 'bad/endpoint', function(err, data) {
            assert.throws(function() {
              if (err) {
                throw new Error(err);
              }
            });
            return done();
          });
        });
        return it('handles response errors', function(done) {
          client.options.client_id = null;
          return client.requestBuilder('get', 'videos/by_user', {
            user_id: 77296796
          }, function(err, data) {
            assert.throws(function() {
              if (err) {
                throw new Error(err);
              }
            });
            return done();
          });
        });
      });
      return describe('push()', function() {
        before(function() {
          return client = new Youku({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET
          });
        });
        it('method exists', function() {
          return assert.equal(typeof client.post, 'function');
        });
        it('retrives data', function(done) {
          return client.post('videos/by_user', {
            user_id: 77296796
          }, function(err, data) {
            if (err) {
              throw new Error(err);
            }
            assert.equal(typeof data, 'object');
            return done();
          });
        });
        it('handles request errors', function(done) {
          return client.get('bad/endpoint', function(err, data) {
            assert.throws(function() {
              if (err) {
                throw new Error(err);
              }
            });
            return done();
          });
        });
        return it('handles response errors', function(done) {
          client.options.client_id = null;
          return client.get('videos/by_user', {
            user_id: 77296796
          }, function(err, data) {
            assert.throws(function() {
              if (err) {
                throw new Error(err);
              }
            });
            return done();
          });
        });
      });
    });
  });

}).call(this);
