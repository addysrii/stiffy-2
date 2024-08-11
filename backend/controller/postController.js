const Post = require("../models/Post")
const jwt = require("jsonwebtoken")


const createPost = async (req, res) => {
    try {
        const { text, image } = req.body
        
        const post = new Post({
            user: req.user.id,
            text,
            image,

        })
        await post.save()
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
}
    const getPosts = async (req, res) => {
        try {
            const posts = await Post.find().populate('user', ['name', 'profilePicture']);
            res.json(posts);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error")
        }
    }
    
module.exports = { createPost, getPosts };