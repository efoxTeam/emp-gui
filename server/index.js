const http = require('http')
const chalk = require('chalk')
const express = require('express')
const {router} = require('./router')

const startServer = (options = {}, cb = null) => {
  const host = options.host || 'localhost'
  const port = options.port || '1234'
  const app = express()
  router(app)
  const httpServer = http.createServer(app)

  httpServer.listen({
    host,
    port
  }, () => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`✔️  Server is running on ${chalk.cyan(`http://localhost:${port}`)}`)
    }
    cb && cb()
  })

  return {
    httpServer,
  }
}

exports.start = startServer
