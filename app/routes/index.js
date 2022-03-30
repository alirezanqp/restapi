const userRouter = require('./users')

module.exports = (app) => {
  app.use('/api/users', userRouter)
}

