/**
 * 小程序网络请求简单封装
 * ------------------
 * @author 肖均
 * @github https://github.com/xiaoqiujun
 * @update 2019.1.26
 * @version v1.2.0 测试版 未完善
 */
module.exports = (function() {
    var request = null
    var requestConfig = Object.create(null)
    var successConfig = Object.create(null)
    var failConfig = Object.create(null)
    var interceptConfig = Object.create(null)
    let timer = null
    const page = Page
    const com = Component

    function Http(option = {}) {
        this.option = option || {}
        this.domain = this.option.baseUrl || ''
    }
    Promise.prototype.header = function(fn) {
        if (request != null) {
            request.onHeadersReceived(header => {
                if (typeof fn === 'function')
                    return fn(header.header)
                else
                    console.error('header必须有个回调函数')
                return
            })
        }
    }
    /**
     * 添加request拦截器
     * @update 2019.01.26
     */
    Http.prototype.interceptor = function(config = {}) {
        let _this = this
        Object.keys(config).forEach(key => {
            interceptConfig[key] = config[key]
        })
        if (typeof config.request === 'function') {
            if (Object.keys(requestConfig)) {
                requestConfig = config.request.call(this, requestConfig)
            }
        }
        if (typeof config.success === 'function') {
            if (Object.keys(successConfig).length) {
                successConfig = config.success.call(this, successConfig)
            }
        }
        if (typeof config.fail === 'function') {
            if (Object.keys(failConfig).length) {
                failConfig = config.fail.call(this, failConfig)
            }
        }
        return this.option = {
            ...this._option,
            baseUrl: config.baseUrl,
            header: config.header
        }
    }
    /**
     * @description 发起GET请求
     * @param url String 接收一个Url地址
     * @param data Object 接收一个对象 请求的参数
     * @param isload Boolean 是否开启Loading 
     * @param loadtext String Loading自定义显示的内容
     */
    Http.prototype.get = function(...args) {
        let _this = this
        interceptConfig.request.call(this, requestConfig)
        if (args[2] === true) {
            if (wx.showLoading) {
                if (timer) {
                    clearTimeout(timer)
                }
                wx.showLoading({
                    title: args[3] || '加载中'
                })
            }
        }
        return new Promise((resolve, reject) => {
            if (args[0] === '') return console.error('request:fail invalid url ""') || reject({
                code: -1,
                msg: '请求错误：url地址不能为空'
            })
            request = wx.request({
                url: _this.option.baseUrl + args[0],
                method: 'GET',
                header: _this.option.header,
                data: {
                    ...((typeof args[1] === 'object') && args[1]) || {},
                    ...requestConfig
                },
                success(response) {
                    if (response.errMsg === 'request:ok') {
                        resolve(response)
                        if (args[2] && wx.hideLoading) {
                            timer = setTimeout(function() {
                                wx.hideLoading()
                            }, 500)
                        }
                    }
                    interceptConfig.success.call(this, response)
                },
                fail(error) {
                    interceptConfig.fail.call(this, error)
                    reject(error)
                }
            })
        })
    }
    /**
     * @description 发起POST请求
     * @param url String 接收一个Url地址
     * @param data Object 接收一个对象 请求的参数
     * @param isload Boolean 是否开启Loading 
     * @param loadtext String Loading自定义显示的内容
     */
    Http.prototype.post = function(...args) {
        let _this = this
        interceptConfig.request.call(this, requestConfig)
        if (args[2] === true) {
            if (wx.showLoading) {
                if (timer) {
                    clearTimeout(timer)
                }
                wx.showLoading({
                    title: args[3] || '加载中'
                })
            }
        }
        return new Promise((resolve, reject) => {
            if (args[0] === '') return console.error('request:fail invalid url ""') || reject({
                code: -1,
                msg: '请求错误：url地址不能为空'
            })
            wx.request({
                url: _this.option.baseUrl + args[0],
                method: 'POST',
                header: _this.option.header,
                data: {
                    ...((typeof args[1] === 'object') && args[1]) || {},
                    ...requestConfig
                },
                success(response) {
                    if (response.errMsg === 'request:ok') {
                        resolve(response)
                        if (args[2] && wx.hideLoading) {
                            timer = setTimeout(function() {
                                wx.hideLoading()
                            }, 500)
                        }
                    }
                    interceptConfig.success.call(_this, response)
                },
                fail(error) {
                    interceptConfig.fail.call(_this, error)
                    reject(error)
                }
            })
        })
    }
    Http.prototype.uploadFile = function(url, name, filePath, formData) {
        let _this = this
        return new Promise((resolve, reject) => {
            wx.uploadFile({
                url: _this.option.baseUrl + url,
                filePath: filePath,
                name: name,
                formData: formData || {},
                success(res) {
                    resolve(res)
                    interceptConfig.success.call(_this, response)
                },
                fail(res) {
                    reject(res)
                    interceptConfig.fail.call(_this, error)
                }
            })
        })
    }
    //....
    /**
     * 注入
     */
    Page = function(_option) {
        const {
            http
        } = getApp()
        if (typeof http === 'object') {
            _option.$http = getApp().$http = http
        }
        page(_option)
    }

    return new Http()
}())
// module.exports = new Http()