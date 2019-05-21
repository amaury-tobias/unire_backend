const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const NoticiaSchema = new Schema({
  title: String,
  author: String,
  shortBody: String,
  body: String
})

const NoticiaModel = mongoose.model('noticias', NoticiaSchema)

module.exports = NoticiaModel
