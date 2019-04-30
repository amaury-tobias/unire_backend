const createError = require('http-errors')
const express = require('express')
const path = require('path')
const logger = require('morgan')

const passport = require('./passport')

var indexRouter = require('./routes/index')
var noticiasRouter = require('./routes/noticias')
var usuariosRouter = require('./routes/usuarios')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', noticiasRouter)
app.use('/', passport.authenticate('jwt', { session: false }), indexRouter)
app.use('/api',passport.authenticate('jwt', { session: false }), usuariosRouter)

app.use(function(req, res, next) {
  next(createError(404))
})

app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    status: err.status,
    message: err.message,
    stack: err.stack
  })
})

module.exports = app
