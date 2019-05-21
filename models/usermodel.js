const mongoose = require('mongoose'),
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
  picture: String,
  points: Number,
  achievements: Array
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
