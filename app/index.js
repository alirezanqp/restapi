const express = require('express')
const app = express()

require('./middlewares')(app)

module.exports = (port) => {
  app.listen(port, () => {
    console.log('> Server is up and running on port : ' + port)
  })
}
