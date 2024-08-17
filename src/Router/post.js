const express = require('express');
const router = express.Router();
const {createPost, allPost, searchPost, updatePost, deletePost} = require('../Controllers/post');
const {checkAuth} = require('../Middlewares/auth');



router.post('/post' , checkAuth,createPost);
router.get('/post',checkAuth, allPost);
router.put('/post/:id' ,checkAuth, updatePost);
router.delete('/post/:id', checkAuth,deletePost);
router.post('/post/:_id', checkAuth,searchPost);

module.exports = router;