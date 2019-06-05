const passport = require('passport')
const {Router} = require('express')
const upload = require('../middleware/upload')
const controller = require('../controllers/post.controller')
const router = Router()
// Admin
// /api/post/admin
router.post(
    '/admin/',
    // passport.authenticate('jwt', {session: false}),
    upload.single('image'),
    controller.createPost
)

router.get(
    '/admin/',
    passport.authenticate('jwt', {session: false}),
    controller.getPosts
)

router.get(
    '/admin/:id',
    passport.authenticate('jwt', {session: false}),
    controller.getPostById
)

router.put(
    '/admin/:id',
    passport.authenticate('jwt', {session: false}),
    controller.updatePost
)

router.delete(
    '/admin/:id',
    passport.authenticate('jwt', {session: false}),
    controller.removePost
)
// Аналитика 
router.get(
    '/admin/get/analytics',
    passport.authenticate('jwt', {session: false}),
    controller.getAnalytics
)

//Base
// /api/post

router.get('/', controller.getPosts)
router.get('/:id', controller.getPostById)
router.put('/add/view/:id', controller.addView)

module.exports = router