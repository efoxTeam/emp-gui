const http = require('http')
const chalk = require('chalk')
const express = require('express')
const {router} = require('./routers/index')

const startServer = (options = {}, cb = null) => {
  const {host = 'localhost', port = '1234'} = options
  const app = express()
  router(app)
  const httpServer = http.createServer(app)

  httpServer.listen({
    host,
    port
  }, () => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`✔️  Server is running on ${chalk.cyan(`http://${host}:${port}`)}`)
    }
    cb && cb()
  })

  return {
    httpServer,
  }
}

exports.start = startServer
