const Axios = require('./axios');

/*
如：获取 广州热映电影 第一页 10条数据：
https://api.douban.com/v2/movie/in_theaters?city=广州&start=0&count=10

如：获取电影Top250 第一页 10条数据：
https://api.douban.com/v2/movie/top250?start=0&count=10

如：
搜索电影《神秘巨星》：
https://api.douban.com/v2/movie/search?q=神秘巨星&start=0&count=10
搜索喜剧类型的电影：
https://api.douban.com/v2/movie/search?tag=喜剧&start=0&count=10

如：电影《神秘巨星》的电影id为：26942674，搜索此电影的详细信息：
https://api.douban.com/v2/movie/subject/26942674

*/

// AI接口列表
const BASE_URL = 'https://api.douban.com/v2/movie/'

var API = {

    in_theaters(params) {
        let _parms = {
            'city': params.city,
            'start': params.start,
            'count': params.count
        }
        return Axios(BASE_URL + 'in_theaters', _parms).then((res) => {
            return res
        })
            .catch(function (error) {
                console.log(error);
            });
    },
    top250(params) {
        let _parms = {
            'start': params.start,
            'count': params.count
        }
        return Axios(BASE_URL + 'top250', _parms).then((res) => {
            return res
        })
            .catch(function (error) {
                console.log(error);
            });
    },
    search(params) {
        let Type = params.Type
        let _parms = {
            [Type]: params.keyword,
            'start': params.start,
            'count': params.count
        }
        console.log(_parms)
        return Axios(BASE_URL + 'search', _parms).then((res) => {
            return res
        })
            .catch(function (error) {
                console.log(error);
            });
    },
    subject(params) {
        let id = params.id
        return Axios(BASE_URL + 'subject/' + id).then((res) => {
            return res
        })
            .catch(function (error) {
                console.log(error);
            });
    },
    celebrity(params) {
        let id = params.id
        return Axios(BASE_URL + 'celebrity/' + id).then((res) => {
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
