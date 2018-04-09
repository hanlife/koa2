// 引入 path nunjucks 模块
const Path = require('path')
const nunjucks = require('nunjucks')

module.exports = (opts = {}) => {
    // 增加环境变量，用来传入到视图中，方便调试
    const env = opts.env || process.env.NODE_ENV || 'development'

    // 400.html 404.html other.html 的存放位置
    const folder = opts.errorPageFolder
    // 指定默认模板文件
    const templatePath = Path.resolve(__dirname, './error.html')

    let fileName = 'other'

    return async(ctx, next) => {
        try {
            await next();
            /**
          * 如果没有更改过 response 的 status，则 koa 默认的 status 是 404
          */
            if (ctx.response.status === 404 && !ctx.response.body)
                ctx.throw(404);
            }
        catch (e) {
            /*此处进行错误处理，下面会讲解具体实现*/
            let status = parseInt(e.status)
            // 默认错误信息为 error 对象上携带的 message
            const message = e.message
            // 对 status 进行处理，指定错误页面文件名
            if (status >= 400) {
                switch (status) {
                    case 400:
                    case 404:
                    case 500:
                        fileName = status;
                        break;
                        // 其它错误 指定渲染 other 文件
                    default:
                        fileName = 'other'
                }
            } else {
                status = 500
                fileName = status
            }
            // 确定最终的 filePath 路径
            const filePath = folder
                ? Path.join(folder, `${fileName}.html`)
                : templatePath
            try {
                // 指定视图目录
                nunjucks.configure(folder
                    ? folder
                    : __dirname)
                const data = await nunjucks.render(filePath, {
                    env: env, // 指定当前环境参数
                    status: e.status || e.message, // 如果错误信息中没有 status，就显示为 message
                    error: e.message, // 错误信息
                    stack: e.stack // 错误的堆栈信息
                })
                // 赋值给响应体
                ctx.status = status
                ctx.body = data
            } catch (e) {
                // 如果中间件存在错误异常，直接抛出信息，由其他中间件处理
                ctx.throw(500, `错误页渲染失败:${e.message}`)
            }
        }
    }
}