/**
 * 判断数据类型
 * @param {any} v 
 */
function typeOf(v) {
	return typeof v
}
/**
 * 判断Null
 * @param {any} v 
 */
function isNull(v) {
	return Object.prototype.toString.call(v) === '[object Null]'
}
/**
 * 判断Undefined
 * @param {any} v 
 */
function isUndefined(v) {
	return Object.prototype.toString.call(v) === '[object Undefined]'
}
/**
 * 判断是否数组
 * @param {any} obj 
 */
function isArray(obj) {
	if(Array.isArray) return Array.isArray(obj)
	return obj.constructor === Array && obj.prototype.toString.call(obj) === '[object Array]'
}
/**
 * @description 小写转换成大写
 * @param str string 接收一个字符串类型
 * @return string 返回一个字符串类型
 * @example toUpperCase("abc") => ABC
 */
function toUpperCase(str) {
	let _arr = str.split("");
	let _ascii;
	let _max = "z".charCodeAt(0);
	let _min = "a".charCodeAt(0);
	for (let i = 0; i < _arr.length; i++) {
		_ascii = _arr[i].charCodeAt(0);
		if (_max >= _ascii && _min <= _ascii) {
			_arr[i] = String.fromCharCode(_ascii - 32);
		}
	}
	return _arr.join("");
}
/**
 * @description 大写转换成小写
 * @param str string 接收一个字符串类型
 * @return string 返回一个字符串类型
 * @example toUpperCase("ABC") => abc
 */
function toLowerCase(str) {
	let _arr = str.split("");
	let _ascii;
	let _max = "Z".charCodeAt(0);
	let _min = "A".charCodeAt(0);
	for (let i = 0; i < _arr.length; i++) {
		_ascii = _arr[i].charCodeAt(0);
		if (_max >= _ascii && _min <= _ascii) {
			_arr[i] = String.fromCharCode(_ascii + 32);
		}
	}
	return _arr.join("");
}
/**
 * 对对象自有的属性进行遍历
 * @param {object} obj 
 * @param {function} cb 
 */
function forEach(obj, cb) {
	if (isNull(obj) || isUndefined(obj)) return
	if(typeOf(obj) !== 'object') obj = [obj]
	if(isArray(obj)) {
		for(let i = 0; i < obj.length; i++) {
			cb.call(null, obj[i], i, obj)
		}
		return
	}
	for(let key in obj) {
		if(Object.prototype.hasOwnProperty.call(obj, key))
			cb.call(null, obj[key], key, obj)
	}
}
/**
 * 将函数绑定到另个对象
 * @param {object} fn 
 * @param {object} ctx 
 */
function bind(fn, ctx) {
	return function wrap() {
		let args = Array.prototype.slice.call(arguments, 0)
		return fn.apply(ctx, args)
	}
}
function extend(a, b, thisArg) {
	forEach(b, function (val, key) {
	  if (thisArg && typeOf(val) === 'function') {
		a[key] = bind(val, thisArg)
	  }else {
		a[key] = val
	  }
	})
	return a
}
function extendMini(a, b) {
	forEach(['get', 'post', 'put', 'delete', 'trace', 'options', 'head', 'connect'], function (method) {
		a.__proto__[method] = function(url, data = {}) {
			return b.request(merge(b.defaults || {}, {
				method: toUpperCase(method),
				url,
				data
			}))
		}
	})
}
/**
 * 合并对象
 * @param  {...any[]} args 
 */
function merge() {
	let result = {}
    for(let i = 0; i < arguments.length; i++) {
        forEach(arguments[i], function(value, key) {
            //多层, 某个属性是object类型的情况
            if(typeOf(result[key]) === 'object' && typeOf(value) === 'object') {
                result[key] = merge(result[key], value)
            }else {
                result[key] = value
            }
        })
	}
	return result
}

module.exports = {
	typeOf,
	isNull,
	isUndefined,
	isArray,
	forEach,
	bind,
	extend,
	merge,
	extendMini,
	toUpperCase,
	toLowerCase
}