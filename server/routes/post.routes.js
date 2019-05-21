const passport = require('passport')
const {Router} = require('express')
const controller = require('../controllers/post.controller')
const router = Router()
// Admin
// /api/post/admin
router.post(
    '/admin/',
    passport.authenticate('jwt', {session: false}),
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

router.put(
    '/admin/:id',
    passport.authenticate('jwt', {session: false}),
    controller.removePost
)

//Base
// /api/post

router.get('/', controller.getPosts)
router.get('/:id', controller.getPostById)
router.put('/:id', controller.addView)

module.exports = router