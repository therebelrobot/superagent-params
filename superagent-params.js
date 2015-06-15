var URIUtil = require('uri-util');
module.exports = function(params){
  params = params || {}
  return function (request){
    var query = URIUtil.parse(request.url)
    var newQuery = {}
    if(request.url.indexOf('?') > -1){
      request.url = request.url.split('?')[0]
    }
    Object.keys(query).forEach(function _forEachCurrentQuery(key){
      if(!params[key] && key !== request.url){
        newQuery[key] = query[key]
      }
    })
    Object.keys(params).forEach(function _forEachNewParam(key){
      newQuery[key] = params[key]
    })
    var querystring = URIUtil.stringify(newQuery)
    request.url += '?'+querystring
    return request
  }
}