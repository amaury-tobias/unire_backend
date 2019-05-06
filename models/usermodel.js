const mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  Schema = mongoose.Schema

const UserSchema = new Schema({
  matricula: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  picture: {
    type: String
  }
})

UserSchema.pre('save', next => {
  const user = this
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err)
    user.password = hash
    next()
  })
})

UserSchema.methods.isValidPassword = function(password, cb) {
  return cb(this.password === password ? true : false)
  /* bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err)
    cb(null, isMatch)
  })*/
}

const UserModel = mongoose.model('accounts', UserSchema)

module.exports = UserModel
