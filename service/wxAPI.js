const Axios = require('./axios');
const Mysql = require('node-mysql-promise');
const moment = require('moment')

const mysql = Mysql.createConnection({host: 'localhost', database: 'mywx', user: 'hanlife', password: '714613002', dateStrings: true});

// AI接口列表
const BASE_URL = 'https://api.weixin.qq.com/'

var API = {
    getweanalysisappiddailysummarytrend(params, ACCESS_TOKEN) {
        let _parms = {
            'begin_date': params.begin_date,
            'end_date': params.end_date
        }
        _parms = JSON.stringify(_parms)
        return Axios(BASE_URL + 'datacube/getweanalysisappiddailysummarytrend?access_token=' + ACCESS_TOKEN, _parms).then((res) => {
            return res
        })
            .catch(function (error) {
                console.log(error);
            });
    },
    getweanalysisappiddailyvisittrend(params, ACCESS_TOKEN) {
        let _parms = {
            'begin_date': params.begin_date,
            'end_date': params.end_date
        }
        _parms = JSON.stringify(_parms)
        return Axios(BASE_URL + 'datacube/getweanalysisappiddailyvisittrend?access_token=' + ACCESS_TOKEN, _parms).then((res) => {
            return res
        })
            .catch(function (error) {
                console.log(error);
            });
    },

    getweanalysisappidweeklyvisittrend(params, ACCESS_TOKEN) {
        let _parms = {
            'begin_date': params.begin_date,
            'end_date': params.end_date
        }
        _parms = JSON.stringify(_parms)
        return Axios(BASE_URL + 'datacube/getweanalysisappidweeklyvisittrend?access_token=' + ACCESS_TOKEN, _parms).then((res) => {
            return res
        })
            .catch(function (error) {
                console.log(error);
            });
    },
    getweanalysisappidmonthlyvisittrend(params, ACCESS_TOKEN) {
        let _parms = {
            'begin_date': params.begin_date,
            'end_date': params.end_date
        }
        _parms = JSON.stringify(_parms)
        return Axios(BASE_URL + 'datacube/getweanalysisappidmonthlyvisittrend?access_token=' + ACCESS_TOKEN, _parms).then((res) => {
            return res
        })
            .catch(function (error) {
                console.log(error);
            });
    },
    // 留言板
    writemessage(params) {
        let data = {
            content: params.value,
            name: params.nickName,
            openid:params.openid,
            avatarUrl:params.avatarUrl
        }
        data.creat_time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        data.toid = '1'
        return mysql
            .table('message')
            .add(data)
            .then(function (insertId) {
                return true
            })
            .catch(function (err) {
                console.log(err)
                return false
            })
    },
    getmessage(params) {
        return mysql
            .table('message')
            .page(params.currentPage, params.pageSize)
            .order('creat_time DESC,id DESC')
            .countSelect({}, true)
            .then(function (data) {
                return data
            });
    },
    userInfo(params) {
        let data = {
            avatarUrl: params.avatarUrl,
            city: params.city,
            country: params.country,
            gender: params.gender,
            nickName: params.nickName,
            province: params.province,
            openid: params.openid
        }
        return mysql
            .table('user')
            .add(data)
            .then(function (insertId) {
                return true
            })
            .catch(function (err) {
                console.log(err)
                return false
            })
    },
    getOpenid(params, config) {
        let code = params.code
        return Axios(BASE_URL + "sns/jscode2session?appid=" + config.appId + "&secret=" + config.appSecret + "&js_code=" + code + "&grant_type=authorization_code").then((res) => {
            return res
        })
            .catch(function (error) {
                console.log(error);
            });
    }
}

module.exports = {
    API
}
