const fs = require('fs')

const writeFile = module.exports = function (path, dataBuffer) {
    return new Promise((resolve, reject) => {
        fs.writeFile('public/' + path, dataBuffer, function (err) { //用fs写入文件
            if (err) {
                console.log('fail')
                reject(err);
            } else {
                console.log('success')
                resolve();
            }
        })
    })
}