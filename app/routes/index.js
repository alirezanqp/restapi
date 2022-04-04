const auth = require('../middlewares/auth')
const userRouter = require('./users')
const sessionRouter = require('./sessions')

module.exports = (app) => {
  app.use('/api/users', auth, userRouter)
  app.use('/api/session', sessionRouter)
}
