const express = require('express')
const createError = require('http-errors')
const router = express.Router()
const jwt = require('jsonwebtoken')
const JWT = require('../JWT')

router.get('/', function(req, res, next) {
  res.json({ message: 'ok' })
})

router.post('/login', function(req, res, next) {
  console.log(req.body)
  let options = {
    issuer: JWT.issuer,
    audience: JWT.audience
  }
  let payload = {
    id: 1,
    username: req.body.username,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 10
  }
  let token = jwt.sign(payload, JWT.secretOrKey, options)
  res.json({
    message: 'ok',
    token
  })
})

module.exports = router
