//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function() {
        let url = '/getWangYiNews'
        console.log("======page index===")
        this.$axios({url:url,data:{
            name:"张三"
        }}).then(function(res){
            console.log(res)
        })
        this.$axios.get(url,{
            name: "王五"
        }).then(res => {
            console.log(res)
        })
    }
})