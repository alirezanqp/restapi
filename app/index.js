const express = require('express')
const app = express()

require('./middlewares')(app)
require('./routes')(app)

module.exports = (port) => {
  app.listen(port, () => {
    console.log('> Server is up and running on port : ' + port)
  })
}
