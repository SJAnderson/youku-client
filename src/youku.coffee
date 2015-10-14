# dependencies
extend = require 'deep-extend'
request = require 'request'
url = require 'url'

VERSION = require('../package.json').version

class Youku

  constructor: (options) ->

    # merge default options with client submitted options
    @options = extend {
      client_id: null
      rest_base: 'https://openapi.youku.com/v2'
      request_options:
        headers:
          'Accept': '*/*'
          'Connection': 'close'
          'User-Agent': "node-youku-client/#{VERSION}"
    }, options

    # create request and pass client submitted request options
    params = extend @options.request_options, {
      client_id: @options.client_id
    }
    @request = request.defaults params

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

  requestBuilder: (method, path, params, callback) ->

    # set the callback if no params are present
    [callback, params] = [params, {}] unless callback

    # build options
    options = {
      method: method.toLowerCase()
      url: @endpointBuilder path
    }

    if method is 'post'
      options.form = params
    else if method is 'get'
      options.qs = params

    @request options, (err, resp, data) ->
      return callback err, data, resp if err

      try
        data = JSON.parse data
      catch parse_err
        err = new Error "Status Code: #{resp.statusCode}"
        return callback err, data, resp

      if typeof data.errors isnt 'undefined'
        callback data.errors, data, resp
      else if resp.statusCode isnt 200
        err = new Error "Status Code: #{resp.statusCode}"
        callback err, data, resp
      else
        callback null, data, resp

  get: (url, params, callback) ->
    @requestBuilder 'get', url, params, callback

  post: (url, params, callback) ->
    @requestBuilder 'post', url, params, callback

  version: VERSION

module.exports = Youku
