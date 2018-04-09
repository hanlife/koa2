const log4js = require('log4js');
const access = require("./access.js");

const methods = [
    "trace",
    "debug",
    "info",
    "warn",
    "error",
    "fatal",
    "mark"
]

const baseInfo = {
    appLogLevel: 'debug',
    dir: 'logs',
    env: 'dev'
}
const {env, appLogLevel, dir, serverIp, projectName} = baseInfo

module.exports = (options) => {
    const contextLogger = {}
    const defaultInfo = {
        env: 'dev',
        dir: 'logs',
        appLogLevel: 'info'
    }

    // 继承自 baseInfo 默认参数
    const opts = Object.assign({}, defaultInfo, options || {})

    const {env, dir, appLogLevel} = opts
    const appenders = {
        cheese: {
            type: 'dateFile',
            filename: `${dir}/task`,
            pattern: '-yyyy-MM-dd.log',
            alwaysIncludePattern: true
        }
    }

    // 环境变量为dev local development 认为是开发环境
    if (env === "dev" || env === "local" || env === "development") {
        appenders.out = {
            type: "console"
        }
    }

    const config = {
        appenders: appenders,
        categories: {
            default: {
                appenders: Object.keys(appenders),
                level: appLogLevel
            }
        }
    }

    return async(ctx, next) => {
        const start = Date.now()
        log4js.configure(config);
        const logger = log4js.getLogger('cheese');

        methods.forEach((method, i) => {
            contextLogger[method] = (message) => {
                logger[method](access(ctx, message, {}))
            }
        })
        ctx.log = contextLogger;

        // // 官方示例 logger.trace('Entering cheese testing'); logger.debug('Got cheese.');
        // logger.info('Cheese is Gouda.'); logger.warn('Cheese is quite smelly.');
        // logger.error('Cheese is too ripe!'); logger.fatal('Cheese was breeding ground
        // for listeria.');

        await next()
        const end = Date.now()
        const responseTime = end - start;
        logger.info(`响应时间为${responseTime / 1000}s`);
    }
}