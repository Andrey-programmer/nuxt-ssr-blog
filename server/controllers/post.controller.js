const Post = require('../models/post.model')

module.exports.createPost = async (req, res) => {
    const post = new Post({
        title: req.body.title,
        text: req.body.text,
        imageUrl: `/${req.file.filename}`
    })

    try {
        await post.save()
        res.status(201).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({date: -1})
        res.status(201).json(posts)
    } catch (error) {
        res.status(500).json(error) 
    }
    
}

module.exports.getPostById = async (req, res) => {

    try {
        await Post.findById(req.params.id).populate('comments').exec((error, post) => {
            res.json(post)
        })
        res.status(201).json(post)
    } catch (error) {
        res.status(500).json(error) 
    }
}

module.exports.updatePost = async (req, res) => {
    const $set = {
        text: req.body.text
    }
    try {
        const post = await Post.findOneAndUpdate({
            _id: req.params.id
        },
        {$set},
        {new: true})
        res.json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.removePost = async (req, res) => {
    try {
        await Post.deleteOne({_id: req.params.id})
        res.json({message: 'Пост удалён'})
    } catch (error) {
        res.status(500).json(error) 
    }
}

module.exports.addView = async (req, res) => {
    const $set = {
        views: ++req.body.views
    }
    try {
        await Post.findOneAndUpdate({_id: req.params.id})
        res.status(204).json() // Означает что ошибки нет но ответ не посылаем)
    } catch (error) {
        res.status(500).json(error) 
    }
}