(function() {
  var VERSION, Youku, extend, request, url;

  extend = require('deep-extend');

  request = require('request');

  url = require('url');

  VERSION = require('../package.json').version;

  Youku = (function() {
    function Youku(options) {
      var params;
      this.options = extend({
        client_id: null,
        rest_base: 'https://openapi.youku.com/v2',
        request_options: {
          headers: {
            'Accept': '*/*',
            'Connection': 'close',
            'User-Agent': "node-youku-client/" + VERSION
          }
        }
      }, options);
      params = extend(this.options.request_options, {
        client_id: this.options.client_id
      });
      this.request = request.defaults(params);
    }

    Youku.prototype.endpointBuilder = function(path) {
      var base, endpoint;
      base = this.options.rest_base;
      if (url.parse(path).protocol !== null) {
        endpoint = path;
      } else {
        path = path.replace(/^\//, '');
        endpoint = "" + base + "/" + path;
      }
      endpoint = endpoint.replace(/\/$/, '');
      if (path.split('.').pop() !== 'json') {
        endpoint += '.json';
      }
      return endpoint;
    };

    Youku.prototype.requestBuilder = function(method, path, params, callback) {
      var options, _ref;
      if (!callback) {
        _ref = [params, {}], callback = _ref[0], params = _ref[1];
      }
      options = {
        method: method.toLowerCase(),
        url: this.endpointBuilder(path)
      };
      if (method === 'post') {
        options.form = params;
      } else if (method === 'get') {
        options.qs = params;
      }
      return this.request(options, function(err, resp, data) {
        var parse_err;
        if (err) {
          return callback(err, data, resp);
        }
        try {
          data = JSON.parse(data);
        } catch (_error) {
          parse_err = _error;
          err = new Error("Status Code: " + resp.statusCode);
          return callback(err, data, resp);
        }
        if (typeof data.errors !== 'undefined') {
          return callback(data.errors, data, resp);
        } else if (resp.statusCode !== 200) {
          err = new Error("Status Code: " + resp.statusCode);
          return callback(err, data, resp);
        } else {
          return callback(null, data, resp);
        }
      });
    };

    Youku.prototype.get = function(url, params, callback) {
      return this.requestBuilder('get', url, params, callback);
    };

    Youku.prototype.post = function(url, params, callback) {
      return this.requestBuilder('post', url, params, callback);
    };

    Youku.prototype.version = VERSION;

    return Youku;

  })();

  module.exports = Youku;

}).call(this);
