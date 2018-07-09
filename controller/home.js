const HomeService = require('../service/home')

module.exports = {
    // 修改 index 方法
    index: async function (ctx, next) {
        await ctx.render("home/index", {title: "iKcamp欢迎您"})
    },
    neuroCat: async function (ctx, next) {
        await ctx.render("neuroCat/index", {title: "神经猫"})
    },
    test: async function (ctx, next) {
        let params = ctx.request.body
        let name = params.name
        ctx.send({
            status: 'success',
            data: 'name:' + name
        })
    },
    video: async function (ctx, next) {
        ctx.send({status: 'success', data: 'video'})
    },
    home: async(ctx, next) => {
        ctx.send({status: 'success', data: 'hello，world'})
        // ctx.response.body = '<h1>HOME page</h1>'
    },
    homeParams: async(ctx, next) => {
        ctx.response.body = '<h1>HOME page /:id/:name</h1>'
    },
    login: async(ctx, next) => {
        await ctx.render('home/login', {
            btnName: '登录',
            title: '登录页'
        })
    },
    // 修改 register 方法
    register: async function (ctx, next) {
        let params = ctx.request.body
        let name = params.name
        let password = params.password
        let res = await HomeService.register(name, password)
        if (res.status == "-1") {
            await ctx.render("home/login", res.data)
        } else {
            ctx.state.title = "个人中心"
            await ctx.render("home/success", res.data)
        }
    }
}