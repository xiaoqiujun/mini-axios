# wxHttp

### 小程序Request网络请求

#### import http from 'wxHttp'

在项目根目录的app.js中可以挂载http或者单独使用

#### 使用指南
    app.js
    
	http.interceptor({
	    baseUrl: '',
	    header: {
	        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
	    },
	    //对所有的request请求中统一加上时间戳属性
	    request(config) {
		// console.log(config)
		//这些属性会统一请求到后端进行处理
		let sessionId = cache.get('weshine:sessionId')
		console.log('每次请求接口返回的Session: ' + sessionId)
		config.timestamp =+ new Date()
		//统一带上SessionID
		config.sys_sid = sessionId
		return config
	    },
	    success(response) {
		//这里返回所有request请求成功的数据
		console.log(response)
		return response
	    },
	    fail(error) {
		console.log(error)
		return error
	    }
	})
	App({
            onLaunch(){
	        let url = 'api.demo.com/demo'
	        let data = {}
	        let isLoading = true // true时显示loading加载
		let loadingText = '加载中'	//loading加载时显示的文字提示
		this.$http.get(url, data, isLoading, loadingText).then(response => {

		}).catch(e => { })
		this.$http.post(url, data, isLoading, loadingText).then(response => {

		}).catch(e => { })
	   },
           ...,
           http
	})



    index.js
    
	Page({
	    onLoad() {
	        let url = 'api.demo.com/demo'
		let data = {}
		let isLoading = true // true时显示loading加载
		let loadingText = '加载中'	//loading加载时显示的文字提示
		//get请求
		this.$http.get(url, data, isLoading, loadingText).then(response => {
			
		}).catch(e => { })
		//post请求
		this.$http.post(url, data, isLoading, loadingText).then(response => {
				
		}).catch(e => { })
	    },
	    onShow() {},
	    onReady()
	})
	
	
	
	
