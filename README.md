# wxHttp

### 封装小程序网络请求

#### import http from 'wxHttp'

在import之前要确保项目根目录config目录中有config.js

config

   └config.js

config.js中的配置(必填项，可更改)

	HEADER: {'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'},

	API_PATH: '', 
  

最后在项目根目录的app.js中挂载http

	App({
           onLaunch(){},
           ...,
           http
	})
