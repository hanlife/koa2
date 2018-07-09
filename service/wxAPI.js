const Axios = require('./axios');

/*

概况趋势
https://api.weixin.qq.com/datacube/getweanalysisappiddailysummarytrend?access_token=ACCESS_TOKEN

https请求方式: GET
https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET

日趋势
https://api.weixin.qq.com/datacube/getweanalysisappiddailyvisittrend?access_token=ACCESS_TOKEN
{
    "begin_date" : "20170313",
    "end_date" : "20170313"
  }

周趋势
https://api.weixin.qq.com/datacube/getweanalysisappidweeklyvisittrend?access_token=ACCESS_TOKEN
{
"begin_date":"20170306",
"end_date":"20170312"
}

*/

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
    }
}

module.exports = {
    API
}
