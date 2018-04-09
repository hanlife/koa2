const fs = require('fs')
const {API} = require('../service/tencentAPI')
const writeFile = require('../service/writeFile')

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
// 处理语音文件格式
function assFormat(filename) {
    let format = filename
        .split(".")
        .pop()
        .toUpperCase()
    switch (format) {
        case 'PCM':
            format = 1
            break;
        case 'WAV':
            format = 2
            break;
        case 'AMR':
            format = 3
            break;
        case 'SILK':
            format = 4
            break;
        default:
            format = 0
    }
    return format
}

// 腾讯云接口
module.exports = {

    // 情感分析识别
    textPolar: async function (ctx, next) {
        let data = await API.nlp_textpolar(ctx.request.body)
        ctx.send(formatData(data))
    },
    // 意图成分识别
    wordcom: async function (ctx, next) {
        let data = await API.nlp_wordcom(ctx.request.body)
        ctx.send(formatData(data))
    },
    // 身份证OCR
    cardOcr: async function (ctx, next) {
        let data = await API.ocr_idcardocr(ctx.req.file.filename, ctx.req.body.scene)
        data = JSON.parse(data)
        // 去掉头像截图
        delete data.data.frontimage;
        delete data.data.backimage;
        ctx.send(formatData(data))
    },
    // 智能闲聊
    textchat: async function (ctx, next) {
        let data = await API.nlp_textchat(ctx.request.body)
        ctx.send(formatData(data))
    },
    // 文本翻译
    texttrans: async function (ctx, next) {
        let data = await API.nlp_texttrans(ctx.request.body)
        ctx.send(formatData(data))
    },
    // 花草/车辆识别
    imgidentify: async function (ctx, next) {
        let filename = ctx.req.file.filename
        let scene = ctx.req.body.scene
        let data = await API.vision_imgidentify(filename, scene)
        data = JSON.parse(data)
        // 删除文件
        fs.unlinkSync('uploads/' + filename)
        ctx.send(formatData(data))

    },
    // 语音识别
    asr: async function (ctx, next) {
        let filename = ctx.req.file.filename
        let format = assFormat(filename);
        if (!format) {
            ctx.send({status: 'fail', data: {}, errMsg: '文件格式错误'})
            return
        }
        let data = await API.aai_asr(filename, format)
        data = JSON.parse(data)
        // 删除文件
        fs.unlinkSync('uploads/' + filename)
        ctx.send(formatData(data))
    },
    // 人脸合成
    facemerge: async function (ctx, next) {
        let filename = ctx.req.file.filename
        let model = ctx.req.body.model
        let data = await API.ptu_facemerge(filename, model)

        // 写入融合后的
        var path = 'saveimage/' + Date.now() + '.png'; //从app.js级开始找--在我的项目工程里是这样的
        var dataBuffer = new Buffer(data.data.image, 'base64'); //把base64码转成buffer对象，
        await writeFile(path, dataBuffer).then(() => {
            data.data.image = '/' + path
        }).catch((err) => {
            data = {
                ret: '-200',
                data: {},
                errMsg: err
            }
        })
        // 删除文件
        fs.unlinkSync('uploads/' + filename)
        ctx.send(formatData(data))
    }
}