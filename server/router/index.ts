module.exports = app => {
  const express = require('express')
  const router = express.Router()

  // 获取资源
  router.get('/getData', async (req, res) => {
    res.send("hello world")
  })

  app.use('', router)
}