(function() {
  var VERSION, Youku, extend, request, url;

  extend = require('deep-extend');

  request = require('request');

  url = require('url');

  VERSION = require('../package.json').version;

  Youku = (function() {
    function Youku(options) {
      this.options = extend({
        access_token: null,
        client_id: null,
        client_secret: null,
        redirect_uri: null,
        rest_base: 'https://openapi.youku.com/v2',
        request_options: {
          headers: {
            'Accept': '*/*',
            'Connection': 'close',
            'User-Agent': "node-youku-client/" + VERSION
          }
        }
      }, options);
      this.request = request.defaults(this.options.request_options);
    }

    Youku.prototype.authorizeUser = function(code, callback) {
      var base, params;
      base = this.endpointBuilder('/oauth2/token');
      params = {
        client_id: this.options.client_id,
        client_secret: this.options.client_secret,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: this.options.redirect_uri
      };
      return this.post(base, params, callback);
    };

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

    Youku.prototype.getAuthorizationUrl = function(redirect_uri) {
      var base, params, url_obj;
      base = "" + this.options.rest_base + "/oauth2/authorize";
      redirect_uri = redirect_uri || this.options.redirect_uri;
      params = {
        client_id: this.options.client_id,
        redirect_uri: this.options.redirect_uri,
        response_type: 'code'
      };
      url_obj = url.parse(base);
      url_obj.query = params;
      return url.format(url_obj);
    };

    Youku.prototype.refreshToken = function(refresh_token, callback) {
      var base, params;
      base = this.endpointBuilder('/oauth2/token');
      params = {
        client_id: this.options.client_id,
        client_secret: this.options.client_secret,
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      };
      return this.post(base, params, callback);
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
        options.form = extend(params, {
          client_id: this.options.client_id
        });
      } else if (method === 'get') {
        options.qs = extend(params, {
          client_id: this.options.client_id
        });
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
          return callback(err, data, resp);
        }
        if (typeof data.error !== 'undefined') {
          return callback(data.error, data, resp);
        } else if (resp.statusCode !== 200) {
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
