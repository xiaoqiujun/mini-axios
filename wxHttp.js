/**
 * 封装小程序网络请求
 * ------------------
 * @author 肖均
 * @github https://github.com/xiaoqiujun
 * @update 2018.12.09
 * @version v1.1.0 测试版
 */
module.exports = (function(config) {
    if (typeof config === 'object' && config.hasOwnProperty) {
        if (!(config.hasOwnProperty('HEADER') && config.hasOwnProperty('API_PATH'))) {
            console.error('config没有HEADER或者API_PATH属性')
            return
        }
    }
    var http = void(0)
    var request = null
    const page = Page

    function Http(option = {}) {
        this.option = option || {}
        this.domain = option.domain || config.API_PATH
    }
    Promise.prototype.header = function (fn) {
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
     * @description 发起GET请求
     * @param url String 接收一个Url地址
     * @param data Object 接收一个对象 请求的参数
     * @param isload Boolean 是否开启Loading 
     * @param loadtext String Loading自定义显示的内容
     */
    Http.prototype.get = (...args) => {
        let timer = null
        if (args[2] === true) wx.showLoading({
            title: args[3] || '加载中'
        })
        return new Promise((resolve, reject) => {
            if (args[0] === '') return console.error('request:fail invalid url ""') || reject({
                code: -1,
                msg: '请求错误：url地址不能为空'
            })
            request = wx.request({
                url: config.API_PATH + args[0],
                method: 'GET',
                header: config.HEADER,
                data: ((typeof args[1] === 'object') && args[1]) || {},
                success(response) {
                    if (response.data) {
                        resolve(response)
                        clearTimeout(timer)
                        timer = setTimeout(function() {
                            wx.hideLoading()
                        }, 300)
                    }
                },
                fail(error) {
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
    Http.prototype.post = (...args) => {
        let timer = null
        if (args[2] === true) wx.showLoading({
            title: args[3] || '加载中'
        })
        return new Promise((resolve, reject) => {
            if (args[0] === '') return console.error('request:fail invalid url ""') || reject({
                code: -1,
                msg: '请求错误：url地址不能为空'
            })
            wx.request({
                url: config.API_PATH + args[0],
                method: 'POST',
                header: config.HEADER,
                data: ((typeof args[1] === 'object') && args[1]) || {},
                success(response) {
                    if (response.data) {
                        resolve(response)
                        clearTimeout(timer)
                        timer = setTimeout(function () {
                            wx.hideLoading()
                        }, 300)
                    }
                },
                fail(error) {
                    reject(error)
                }
            })
        })
    }
    /**
     * 注入
     */
    Page = function(_option) {
        const {
            http
        } = getApp()
        if (typeof http === 'object' && http.getInstance) {
            _option.$http = getApp().$http = http.getInstance()
        } else {
            console.error('app.js 未挂载http')
        }
        page(_option)
    }
    return {
        /**
         * 单例模式 
         * 暴露接口
         */
        getInstance() {
            if (http === undefined) {
                http = new Http()
            }
            return http
        }
    }
}(require('../config/config')))
