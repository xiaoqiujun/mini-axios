const wxAxios = require("./core")
const {
	typeOf,
	forEach,
	merge,
	bind,
	extend,
	extendMini
} = require("./utils")
const page = Page
const com = Component
const app = App
if (!page || !com) throw new Error("[wxAxios] 请检查是否有小程序环境");
function getInstance(config) {
	let ctx = new wxAxios(config)
	let instance = bind(wxAxios.prototype.request, ctx)
	extend(instance, wxAxios.prototype, ctx)
	extend(instance, ctx)
	return instance
}

let defaultConfig = {
	url: '',
    data: {},
    header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    method: 'GET',
    dataType: 'json',
    responseType: 'text'
}
let axios = getInstance(defaultConfig);
axios.create = function create(config) {
	return getInstance(merge(defaultConfig, config))
}
axios.all = function all(promise) {
	forEach(promise,function(fn, i){
		promise[i] = fn()
	})
	return Promise.all(promise)
}
axios.race = function all(promise) {
	forEach(promise,function(fn, i){
		promise[i] = fn()
	})
	return Promise.race(promise)
}
axios.axios = axios

App = function (_option) {
	_option.$axios = axios
	extendMini(_option.$axios, axios)
	_option.$axios.__proto__.all = axios.all
	_option.$axios.__proto__.race = axios.race
	app(_option)
}
Page = function (_option) {
	_option.$axios = getApp().$axios
	page(_option)
}
Component = function(_option) {
	_option.$axios = getApp().$axios
	com(_option)
}
module.exports = axios