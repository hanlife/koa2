const fs = require('fs')
const {API} = require('../service/wxAPI')

const Wechat = require('../weichat/wechat')
const config = require('../weichat/config')

// 处理AI接口返回值
function formatData(data) {
    let res = {}
    if (data.ret === 0) {
        res = {
            status: 'success',
            data: data.data
        }
    } else {
        res = {
            status: 'fail',
            data: {},
            errMsg: data.msg
        }
    }
    return res
}

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
    }
}