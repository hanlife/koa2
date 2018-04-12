const Koa = require('koa')
const cors = require('koa-cors') 
const https = require('https')
const path = require('path')
const fs = require('fs')

const opt = {
  key: fs.readFileSync('./214272191130403.key'),
  cert: fs.readFileSync('./214272191130403.pem')
}

const app = new Koa()
const router = require('./router')

const koaBody = require('koa-body')({
  "formLimit":"5mb",
  "jsonLimit":"5mb",
  "textLimit":"5mb"
});

app.use(koaBody)
app.use(cors())
const middleware = require('./middleware') //中间件

middleware(app)
router(app)

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})


https.createServer(opt, app.callback()).listen(443, () => {
  console.log('server is running at https://localhost:443')
})