const {model} = require('mongoose')
const keys = require('../keys')
const {Strategy, ExtractJwt} = require('passport-jwt')
require('../models/user.model')
const User = model('users')

//Autherization: Bearer ... .... .. . . .
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.JWT
}

module.exports = new Strategy(options, async (payload, done) => {
    try {
        const candidate = await User.findById(payload.userId).select('id')
        if(candidate) {
            done(null, candidate)
        } else {
            done(false)
        }
    } catch (error) {
        console.log(error)
    }
})