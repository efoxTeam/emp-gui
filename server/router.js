const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const fallback = require('express-history-api-fallback')
// controllers
const demo = require('./controller/demo')
const project = require('./controller/project')

const distPath = path.resolve(__dirname, '../dist')
const publicPath = path.resolve(__dirname, '../public')

const CACHE_CONTROL = 'no-store, no-cache, must-revalidate, private'

function setHeaders(res, path, stat) {
  res.set('Cache-Control', CACHE_CONTROL)
}

exports.router = app => {
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
	app.use(express.static(distPath, {setHeaders}))
  app.use('/public', express.static(publicPath, {setHeaders}))
  app.use(fallback(path.join(distPath, 'index.html'), {headers: {'Cache-Control': CACHE_CONTROL}}))
  //设置跨域访问
  app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });
  app.use('/demo/search/:id', demo.search)
  app.use('/demo/alert', demo.alert)

  // 项目管理
  app.use('/projects', project.list)
  app.use('/projects/search', project.search)
  app.use('/project/add', project.add)
  app.use('/project/del', project.del)
  app.use('/project/alter', project.alter)
  
}
