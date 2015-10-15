# dependencies
extend = require 'deep-extend'
request = require 'request'
url = require 'url'

VERSION = require('../package.json').version

class Youku

  constructor: (options) ->

    # merge default options with client submitted options
    @options = extend {
      access_token: null
      client_id: null
      client_secret: null
      redirect_uri: null
      rest_base: 'https://openapi.youku.com/v2'
      request_options:
        headers:
          'Accept': '*/*'
          'Connection': 'close'
          'User-Agent': "node-youku-client/#{VERSION}"
    }, options

    # create request and pass client submitted request options
    @request = request.defaults @options.request_options

  authorizeUser: (code, callback) ->
    base = @endpointBuilder '/oauth2/token'

    params = {
      client_id: @options.client_id
      client_secret: @options.client_secret
      code: code
      grant_type: 'authorization_code'
      redirect_uri: @options.redirect_uri
    }

    @post base, params, callback

  endpointBuilder: (path) ->
    base = @options.rest_base

    if url.parse(path).protocol isnt null
      endpoint = path
    else
      path = path.replace /^\//, ''
      endpoint = "#{base}/#{path}"

    # remove trailing slash
    endpoint = endpoint.replace /\/$/, ''

    # add json extension if not provided
    if path.split('.').pop() isnt 'json'
      endpoint += '.json'

    return endpoint

  getAuthorizationUrl: (redirect_uri) ->
    base = "#{@options.rest_base}/oauth2/authorize"

    redirect_uri = redirect_uri or @options.redirect_uri

    params = {
      client_id: @options.client_id
      redirect_uri: @options.redirect_uri
      response_type: 'code'
    }

    url_obj = url.parse base
    url_obj.query = params

    return url.format url_obj

  refreshToken: (refresh_token, callback) ->
    base = @endpointBuilder '/oauth2/token'

    params = {
      client_id: @options.client_id
      client_secret: @options.client_secret
      grant_type: 'refresh_token'
      refresh_token: refresh_token
    }

    @post base, params, callback

  requestBuilder: (method, path, params, callback) ->

    # set the callback if no params are present
    [callback, params] = [params, {}] unless callback

    # build options
    options = {
      method: method.toLowerCase()
      url: @endpointBuilder path
    }

    if method is 'post'
      options.form = extend {
        access_token: @options.access_token
        client_id: @options.client_id
      }, params

    else if method is 'get'
    options.qs = extend {
      access_token: @options.access_token
      client_id: @options.client_id
    }, params

    @request options, (err, resp, data) ->
      return callback err, data, resp if err

      try
        data = JSON.parse data
      catch parse_err
        return callback err, data, resp

      if typeof data.error isnt 'undefined'
        callback data.error, data, resp
      else if resp.statusCode isnt 200
        callback err, data, resp
      else
        callback null, data, resp

  get: (url, params, callback) ->
    @requestBuilder 'get', url, params, callback

  post: (url, params, callback) ->
    @requestBuilder 'post', url, params, callback

  version: VERSION

module.exports = Youku
