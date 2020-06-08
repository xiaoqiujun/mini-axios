# wxAxios

> 基于 axios 封装的微信小程序请求工具，完全使用Promise，并提供了请求和响应的拦截器。

## 引入到项目中

- 第一步， npm i mini-axios
- 第二步 import axios from 'mini-axios' 
- 第三步， 复制 dist 目录下的 wxAxios.min.js 到项目中	//如果小程序安装了npm环境可跳过 三、四步
- 第四步， ` import axios from './libs/wxAxios.min.js' `


## 快速使用

```js
// http.js
import axios from './libs/wxAxios.min.js'
axios.get(url).then(res => {
    console.log(res )
})
// 或者
axios.defaults.baseURL = 'https://xxx.com/'   // 配置默认地址
axios.get(url).then(res => {
    console.log(res)
})
```
### 一次导入到处使用

>  ==默认已经绑定App，Page，Component 与导入的axios是同一个实例==

```js
//只需要在app.js中导入就好
--app.js

    import axios from './libs/wxAxios.min.js'
    App({
        onLaunch: function () {
             this.$axios.get(url).then(res => {
                console.log(res)
             })
        }
    })


--pages/index/index.js
//不需要再导入了 直接使用
     Page({
        onLoad:function(){
             this.$axios.post(url).then(res => {
                console.log(res)
             })
        }
     })

```
### 追加参数
```js
let data = {
    userId: 1,
    username:"张三"
};
axios.get(url, data).then(res=> {
    console.log(res)
})
```

### 多个请求
```js
function getUserInfo(){
    return axios.get(url)
}
function getList(){
    return axios.get(url)
}
axios.all([getUserInfo, getList]).then(res=> {
    console.log(res)
}).catch(error => {
    console.log(error)
})
axios.race([getUserInfo, getList]).then(res=> {
    console.log(res)
}).catch(error => {
    console.log(error)
})
```

## wxAxios API

axios(config)
```js
axios({
  method: 'POST',
  url: url,
  data: {
    userId:1
  }
}).then(res=> {
  console.log(res)
}).catch(err => {
  console.log(err)
})

// 或
axios.defaults.baseURL = 'https://xxx.com'
axios({
  method: 'POST',
  url: url,
  data: {
      userId:1
  }
}).then(res=> {
  console.log(res)
})
```
axios.(url[,config])
```js
axios(url, {
  method: 'POST',
  data: {
      userId:1
  }
}).then(res=> {
  console.log(res)
})

```

小程序中定义了8种请求类型：[微信小程序请求方式](https://developers.weixin.qq.com/miniprogram/dev/api/wx.request.html)

- 
- [x] ==OPTIONS== HTTP 请求 OPTIONS	
- [x] ==GET==	HTTP 请求 GET	
- [x] ==HEAD==	HTTP 请求 HEAD	
- [x] ==POST==	HTTP 请求 POST	
- [x] ==PUT==	HTTP 请求 PUT	
- [x] ==DELETE==	HTTP 请求 DELETE	
- [x] ==TRACE==	HTTP 请求 TRACE	
- [x] ==CONNECT==	HTTP 请求 CONNEC

##### axios.get(url[, config])
##### axios.post(url[, config])
##### axios.put(url[, config])
##### axios.delete(url[, config])
##### axios.options(url[, config])
##### axios.head(url[, config])
##### axios.trace(url[, config])
##### axios.connect(url[, config])

## 创建实例
```js
let server1 = axios.create({
    baseURL: 'https://xxx.com'
})
let server2 = axios.create({
    baseURL: 'https://xxx.com'
})

server1.get(url).then(res => {
    console.log(res)
})
```

## 请求配置 axios.defaults
>部分配置参数和微信小程序的配置一样
[微信小程序 request 请求参数列表](https://developers.weixin.qq.com/miniprogram/dev/api/wx.request.html)

参数 | 说明 | 类型 | 默认值
-|--|--|--
baseURL | 默认地址  `baseURL` 将自动加在 `url` 前面 | `string`| `''`
url| `url` 是用于请求的服务器 URL | `string` | `''`
data| `data` 是作为请求主体被发送的数据 | `object` | `{}`
header| `headers` 是即将被发送的自定义请求头 | `object` | `'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'`
method| `method` 是创建请求时使用的方法 | `string` | `'GET'`
dataType| `dataType` 是返回的数据类型 | `string` | `'json'`
responseType| `responseType` 是响应的数据类型 | `string` | `'text'`

```js
axios.defaults.baseURL = 'https://xxx.com'
```
## 拦截器 Interceptors

> wxAxios 也提供了和 axios 一样的请求拦截和响应拦截，并且可以配置多个

#### request
```js
// 1.第一个 request 的拦截器
axios.interceptors.request.use(config => {
    config.data.companyId = 1
    // ...do something
    return config
})
// 2.第二个 request 的拦截器，
axios.interceptors.request.use(config => {
    config.data.token = wx.getStorageSync('token')
    // ...do something
    return config
})
```


#### response
```js
// 1.第一个 response 的拦截器
axios.interceptors.response.use(response => {
   if (response.statusCode === 200) {
      // ...do something
   }
   console.log(response.header);
    return response
})
// 2.第二个 response 的拦截器，
axios.interceptors.response.use(function (response) {
    if (response.status === 400) {
      // ...do something
   }
    return response
})
```


## License

MIT
