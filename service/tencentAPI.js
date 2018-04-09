const APPKEY = 'aMagF5bR66ZY5B3E';
const APP_ID = '1106463963';
// 随机字符串
const randomString = require('randomstring');
const fs = require('fs');
let path = require('path');
const PS = require('./tencentAI');

// AI接口列表
const _URL = {
    textpolar: '/fcgi-bin/nlp/nlp_textpolar',
    wordcom: '/fcgi-bin/nlp/nlp_wordcom',
    idcardocr: '/fcgi-bin/ocr/ocr_idcardocr',
    textchat: '/fcgi-bin/nlp/nlp_textchat',
    texttrans: '/fcgi-bin/nlp/nlp_texttrans',
    imgidentify: '/fcgi-bin/vision/vision_imgidentify',
    aai_asr: '/fcgi-bin/aai/aai_asr',
    facemerge: '/fcgi-bin/ptu/ptu_facemerge'
}

// 设置默认参数 基础请求数据
const commonParams = () => {
    return {
        'app_id': APP_ID,
        'nonce_str': randomString.generate({length: 16, charset: 'alphanumeric', capitalization: 'uppercase'}),
        'time_stamp': Math.floor(Date.now() / 1000)
    }
}

var API = {
    // 情感分析识别
    nlp_textpolar(params) {
        let _parms = {
            'text': params.text
        } || {}
        let asrparams = Object.assign(commonParams(), _parms);
        return PS(_URL.textpolar, APPKEY, asrparams).then((res) => {
            return res
        }, (e) => {
            // 发生网络错误
            console.log(JSON.stringify(e))
        });
    },
    // 意图成分识别
    nlp_wordcom(params) {
        let _parms = {
            'text': params.text
        } || {}
        let asrparams = Object.assign(commonParams(), _parms);
        return PS(_URL.wordcom, APPKEY, asrparams).then((res) => {
            return res
        }, (e) => {
            // 发生网络错误
            console.log(JSON.stringify(e))
        });
    },
    // 身份证OCR
    ocr_idcardocr(failname, type) {
        // 文件请求数据
        let FSRead = function (dir) {
            let FileBase64 = fs.readFileSync(path.join(__dirname, dir), {encoding: 'base64'});
            return {image: FileBase64, card_type: type};
        }
        // 组装请求数据
        let asrparams = Object.assign(commonParams(), FSRead(`../uploads/${failname}`));
        return PS(_URL.idcardocr, APPKEY, asrparams).then((res) => {
            return JSON.stringify(res)
        }, (e) => {
            // 发生网络错误
            console.log(JSON.stringify(e))
        });
    },
    // 智能闲聊
    nlp_textchat(params) {
        let _parms = {
            'question': params.question,
            'session': params.id
        } || {}
        let asrparams = Object.assign(commonParams(), _parms);
        return PS(_URL.textchat, APPKEY, asrparams).then((res) => {
            return res
        }, (e) => {
            // 发生网络错误
            console.log(JSON.stringify(e))
        });
    },
    // 文本翻译
    nlp_texttrans(params) {
        let _parms = {
            'text': params.text,
            'type': params.type || 0
        } || {}
        let asrparams = Object.assign(commonParams(), _parms);
        return PS(_URL.texttrans, APPKEY, asrparams).then((res) => {
            return res
        }, (e) => {
            // 发生网络错误
            console.log(JSON.stringify(e))
        });
    },
    // 花草车辆识别
    vision_imgidentify(failname, scene) {
        // 文件请求数据
        let FSRead = function (dir) {
            let FileBase64 = fs.readFileSync(path.join(__dirname, dir), {encoding: 'base64'});
            return {image: FileBase64, scene: scene};
        }
        // 组装请求数据
        let asrparams = Object.assign(commonParams(), FSRead(`../uploads/${failname}`));
        return PS(_URL.imgidentify, APPKEY, asrparams).then((res) => {
            return JSON.stringify(res)
        }, (e) => {
            // 发生网络错误
            console.log(JSON.stringify(e))
        });
    },
    // 语音识别
    aai_asr(failname, format) {
        // 获取文件格式 文件请求数据
        let FSRead = function (dir) {
            let FileBase64 = fs.readFileSync(path.join(__dirname, dir), {encoding: 'base64'});
            return {speech: FileBase64, format: format};
        }
        // 组装请求数据
        let asrparams = Object.assign(commonParams(), FSRead(`../uploads/${failname}`));
        return PS(_URL.aai_asr, APPKEY, asrparams).then((res) => {
            return JSON.stringify(res)
        }, (e) => {
            // 发生网络错误
            console.log(JSON.stringify(e))
        });
    },
    // 人脸融合
    ptu_facemerge(failname, model) {
        // 文件请求数据
        let FSRead = function (dir) {
            let FileBase64 = fs.readFileSync(path.join(__dirname, dir), {encoding: 'base64'});
            return {image: FileBase64, model: model};
        }
        // 组装请求数据
        let asrparams = Object.assign(commonParams(), FSRead(`../uploads/${failname}`));
        return PS(_URL.facemerge, APPKEY, asrparams).then((res) => {
            return res
        }, (e) => {
            // 发生网络错误
            console.log(JSON.stringify(e))
        });
    }
}

module.exports = {
    API
}
