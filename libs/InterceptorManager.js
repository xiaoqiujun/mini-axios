const {forEach} = require("./utils")
function InterceptorManager() {
    this.handlers = []
}
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	this.handlers.push({
		fulfilled,
		rejected
	})
	return this.handlers.length - 1
}
InterceptorManager.prototype.eject = function eject(id) {
	if(this.handlers[id]) this.handlers[id] = null
}
InterceptorManager.prototype.forEach = function (fn) {
	forEach(this.handlers, function(v, i){
		if(v) fn(v, i)
	})
}

module.exports = InterceptorManager