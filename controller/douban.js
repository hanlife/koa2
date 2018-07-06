const fs = require('fs')
const {API} = require('../service/doubanAPI')

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


// 腾讯云接口
module.exports = {

    // 热映电影
    in_theaters: async function (ctx, next) {
        let data = await API.in_theaters(ctx.request.body)
        ctx.send(data)
    },

    top250: async function (ctx, next) {
        let data = await API.top250(ctx.request.body)
        ctx.send(data)
    },

    search: async function (ctx, next) {
        let data = await API.search(ctx.request.body)
        ctx.send(data)
    },

    subject: async function (ctx, next) {
        let data = await API.subject(ctx.request.body)
        ctx.send(data)
    },

    celebrity: async function (ctx, next) {
        let data = await API.celebrity(ctx.request.body)
        ctx.send(data)
    },
   
}