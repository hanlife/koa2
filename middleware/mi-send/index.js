module.exports = () => {
    function render(json) {
        this.set("Content-Type", "application/json")
        this.body = JSON.stringify(json)
    }
    return async (ctx, next) => {
        ctx.send = render.bind(ctx)
        ctx.log.error('log error')
        await next()
    }
  }