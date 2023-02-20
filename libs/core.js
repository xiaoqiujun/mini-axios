const InterceptorManager = require("./InterceptorManager")
const dispatchRequest = require("./dispatchRequest")
const {
	typeOf,
	forEach,
	merge,
	toUpperCase
} = require("./utils")
function Http(defaults) {
	this.defaults = defaults || {}
	this.interceptors = {
		request:new InterceptorManager(),
		response:new InterceptorManager()
	}
}
Http.prototype.request = function request(config) {
	if(typeOf(config) === 'string') config = merge({url:arguments[0]},arguments[1])
	config = merge(this.defaults, config)
	let promise = Promise.resolve(config)
	let chain = []

	this.interceptors.request.forEach(function(interceptors) {
		chain.push(interceptors.fulfilled, interceptors.rejected)
	})
	chain.push(dispatchRequest, null)
	this.interceptors.response.forEach(function(interceptors) {
		chain.push(interceptors.fulfilled, interceptors.rejected)
	})

	while(chain.length) {
		promise = promise.then(chain.shift(), chain.shift())
	}
	return promise
}

forEach(['get', 'post', 'put', 'delete', 'options'], function (method) {
    Http.prototype[method] = function(url, data = {}) {
        return this.request(merge(this.defaults || {}, {
            method: toUpperCase(method),
			url,
			data
        }))
    }
})
module.exports = Http