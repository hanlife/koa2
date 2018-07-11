const fs = require('fs')
const {API} = require('../service/wxAPI')

const Wechat = require('../weichat/wechat')
const config = require('../weichat/config')
// 初始化wx session
new Wechat(config.wechat)

// 微信小程序接口
module.exports = {
    // 概况趋势
    getweanalysisappiddailysummarytrend: async function (ctx, next) {
        const wx = new Wechat(config.wechat)
        let AccessToken = await wx
            .getAccessToken()
            .then(data => {
                return JSON.parse(data)
            })
        let data = await API.getweanalysisappiddailysummarytrend(ctx.request.body, AccessToken.access_token, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })
        ctx.send(data)
    },
    // 日趋势
    getweanalysisappiddailyvisittrend: async function (ctx, next) {
        const wx = new Wechat(config.wechat)
        let AccessToken = await wx
            .getAccessToken()
            .then(data => {
                return JSON.parse(data)
            })
        let data = await API.getweanalysisappiddailyvisittrend(ctx.request.body, AccessToken.access_token, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })
        ctx.send(data)
    },

    getweanalysisappidweeklyvisittrend: async function (ctx, next) {
        const wx = new Wechat(config.wechat)
        let AccessToken = await wx
            .getAccessToken()
            .then(data => {
                return JSON.parse(data)
            })
        let data = await API.getweanalysisappidweeklyvisittrend(ctx.request.body, AccessToken.access_token, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })
        ctx.send(data)
    },

    getweanalysisappidmonthlyvisittrend: async function (ctx, next) {
        const wx = new Wechat(config.wechat)
        let AccessToken = await wx
            .getAccessToken()
            .then(data => {
                return JSON.parse(data)
            })
        let data = await API.getweanalysisappidmonthlyvisittrend(ctx.request.body, AccessToken.access_token, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })
        ctx.send(data)
    },
    // 留言板
    writemessage: async function (ctx, next) {
        let data = await API.writemessage(ctx.request.body)
        if (data) {
            ctx.send({code: 0, data: '操作成功'})
        } else {
            ctx.send({code: -1, data: '操作失败'})
        }
    },
    getmessage: async function (ctx, next) {
        let data = await API.getmessage(ctx.request.body)
        ctx.send({code: 0, data: data})
    },
    userInfo: async function (ctx, next) {
        let data = await API.userInfo(ctx.request.body)
        if (data) {
            ctx.send({code: 0, data: '操作成功'})
        } else {
            ctx.send({code: -1, data: '操作失败'})
        }
    },
    getOpenid: async function (ctx, next) {
        let data = await API.getOpenid(ctx.request.body, config.wechat)
        ctx.send(data)
    }
}