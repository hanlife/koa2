'use strict'


var path = require('path')
var util = require('./wx_util')
var wechat_file = path.join(__dirname, './wechat.txt')

var config = {
    wechat: {
        appId: 'wx40e50e29dd52b171',
        appSecret: 'c82d29c3b1ce27d3e4b214bde0e37756',
        token: 'hanlaifu',
        getAccessToken: function() {
            return util.readFileAsync(wechat_file)
        },
        saveAccessToken: function(data){
            data = JSON.stringify(data)
            return util.writeFileAsync(wechat_file, data)
        }
    }
}

module.exports = config
