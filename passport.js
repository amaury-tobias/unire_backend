const passport = require('passport'),
  JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt,
  JWT = require('./JWT')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT.secretOrKey,
  issuer: JWT.issuer,
  audience: JWT.audience
}

passport.use(
  new JwtStrategy(options, function(jwt_payload, done) {
    // console.log(jwt_payload)
    /*
    Find user and password
    if (err) {
      return done(err, false)
    }
    if (user) {
      return done(null, user)
    } else {
      return done(null, false)
      // or you could create a new account
    }
    */
    return done(null, { username: jwt_payload.username })
  })
)

module.exports = passport
