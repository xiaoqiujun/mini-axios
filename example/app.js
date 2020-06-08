import axios from './libs/wxAxios/wxAxios.min';
axios.defaults.baseURL = "https://api.apiopen.top";
axios.interceptors.request.use(function (config) {
    console.log(config)
    wx.showLoading({
        title: "加载中"
    })
    config.data.key = "1"
    return config
})
axios.interceptors.response.use(function (response) {
    wx.hideLoading()
    return response
})
App({
    onLaunch: function () {
        //   console.log(this)
        let url = '/getWangYiNews'
        let data = {}
        axios({
            url: url,
            data: {
                name: "李四"
            }
        }).then(function (res) {
            console.log(res)
        })      
        this.$axios.all([this.a, this.b]).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
        console.log("======app.js===")
    },
    globalData: {
        userInfo: null
    },
    a: function() {
        let url = '/getWangYiNews'
        return this.$axios.get(url)
    },
    b: function() {
        let url = '/getWangYiNews'
        return this.$axios({
            url: url,
            data: {
                name: "张三"
            }
        })
    }
})