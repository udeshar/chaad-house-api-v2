var JwtStrategy = require('passport-jwt').Strategy; 
var ExtractJwt = require('passport-jwt').ExtractJwt;
var user = require('../model/user/schema');

module.exports = function(passport){
    var options = {
        jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey : process.env.JWT_SECRET
    }
    passport.use(new JwtStrategy(
        options,
        function(jwt_payload, done){
            user.findOne({username : jwt_payload.username}, function(error, user){
                if(error){
                    console.log(error)
                    return done(null, false);
                } else{
                    console.log(user)
                    return done(null, user);
                }
            })
        }
    ))
}