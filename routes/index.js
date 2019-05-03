const express = require('express'),
  createError = require('http-errors'),
  router = express.Router(),
  jwt = require('jsonwebtoken'),
  JWT = require('../JWT'),
  UserModel = require('../models/usermodel')

router.get('/', function(req, res, next) {
  res.json({ message: 'ok' })
})

router.post('/login', function(req, res, next) {
  console.log(req.body)
  UserModel.findOne({ matricula: req.body.matricula }, (err, user) => {
    if (err) return next(createError(500, 'Error en la base de datos'))
    else if (user) {
      user.isValidPassword(req.body.password, isMatch => {
        if (!isMatch) return next(createError(400, 'Bad Credentials'))
        let options = { issuer: JWT.issuer, audience: JWT.audience }
        let payload = {
          matricula: user.matricula,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 10
        }
        let token = jwt.sign(payload, JWT.secretOrKey, options)
        return res.json({ message: 'ok', token })
      })
    } else return next(createError(400, 'Bad Credentials'))
  })
})

module.exports = router
