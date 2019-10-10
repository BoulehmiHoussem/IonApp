var User = require('../models/user');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var Config = require('../config/config');
let opts = {};
            opts.secretOrKey = Config.jwtSecret;
            opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken("jwt");
module.exports = new JwtStrategy(opts, function(jwt_payload, done){
    User.findById(jwt_payload.id, function(err, user){
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
});