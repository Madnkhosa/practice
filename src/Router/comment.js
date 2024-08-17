const express = require('express');
const{
    createComment,
    allComment,
    updateComment,
    deleteComment,
    searchComment
} = require('../Controllers/comment');
const router = express.Router();
const {checkAuth, checkAdmin} = require('../Middlewares/auth');

router.post("/comment/", checkAuth, createComment);
router.get("/comment", checkAuth, allComment);
router.put ("/comment/:id", checkAuth, updateComment);
router.delete("/comment/:id", checkAuth, deleteComment);
router.get("/comment/:id", checkAuth, searchComment);

module.exports = router;  
