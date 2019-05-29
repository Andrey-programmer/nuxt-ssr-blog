const {Router} = require('express')
const passport = require('passport')
const {login, createUser} = require('../controllers/auth.controller')
const router = Router()

router.post('/admin/login', login) // получается путь /api/auth/admin/login
router.post('/admin/create',
    passport.authenticate('jwt', {session: false}),
    createUser
) // получается путь /api/auth/admin/login

module.exports = router