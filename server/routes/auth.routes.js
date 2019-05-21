const {Router} = require('express')
const {login, createUser} = require('../controllers/auth.controller')
const router = Router()

router.post('/admin/login', login) // получается путь /api/auth/admin/login
router.post('/admin/create', createUser) // получается путь /api/auth/admin/login

module.exports = router