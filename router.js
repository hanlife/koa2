const router = require('koa-router')()
const multer = require('koa-multer');
const HomeController = require('./controller/home')
const tencentController = require('./controller/tencent')
const doubanController = require('./controller/douban')

//上传图片配置
var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
var upload = multer({storage: storage});

module.exports = (app) => {

    router.get('/', HomeController.index)
    // 神经猫
    router.get('/neuroCat', HomeController.neuroCat)

    // 测试上传接口
    router.post('/test', HomeController.test)

    // 测试上传视频文件
    router.post('/video', upload.single('video'), HomeController.video)

    router.get('/home', HomeController.home)

    router.get('/home/:id/:name', HomeController.homeParams)

    // 增加返回表单页面的路由
    router.get('/login', HomeController.login)

    // 增加响应表单请求的路由
    router.post('/user/register', HomeController.register)

    // 腾讯云AI接口 情感分析识别
    router.post('/textPolar', tencentController.textPolar)

    // 意图成分识别
    router.post('/wordcom', tencentController.wordcom)

    // 智能闲聊
    router.post('/textchat', tencentController.textchat)

    // 文本翻译
    router.post('/texttrans', tencentController.texttrans)

    // 身份证OCR
    router.post('/cardOcr', upload.single('file'), tencentController.cardOcr)

    // 花草/车辆识别
    router.post('/imgidentify', upload.single('image'), tencentController.imgidentify)

    // 语音识别
    router.post('/asr', upload.single('speech'), tencentController.asr)

    // 人脸融合
    router.post('/facemerge', upload.single('image'), tencentController.facemerge)

    // 豆瓣API 正在热映
    router.post('/douban/in_theaters', doubanController.in_theaters)

    // 电影Top250
    router.post('/douban/top250', doubanController.top250)

    // 搜索电影
    router.post('/douban/search', doubanController.search)

    // 电影的详细信息
    router.post('/douban/subject', doubanController.subject)

    router.get('/404', async(ctx, next) => {
        ctx.response.body = '<h1>404 Not Found</h1>'
    })

    app
        .use(router.routes())
        .use(router.allowedMethods())
}