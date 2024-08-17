const mongoose = require('mongoose');
const Comment = require("../Models/Comments/comments");
const {commentSchema} = require('../Middlewares/commentValidation');

//Create Comment
let createComment = async (req, res)=>{
    let result = commentSchema.validate(req.body);
    let {message, userId, postId} = req.body;
    const id = req.userId;
    // console.log("this issue ",id2);
    let newComment = new Comment({
      message: message,
      userId: id,
      postId: postId,
    });
    await newComment.save();
    console.log(newComment);    
    res.send(newComment);
}
//All Comments
let allComment = async (req, res)=>{
    const allcomments = await Comment.find({});
    console.log(allcomments);
    res.send(allcomments);
}
//Update Comment
let updateComment = async (req, res)=>{
    const {id} = req.params;
    const commentdata = req.body;
    console.log(commentdata);
    const updatedata = await Comment.findByIdAndUpdate({_id: id},{commentdata},{ runValidators: true, new: true});
    res.send(updatedata);
}
//Destroy Comment
let deleteComment = async  (req, res)=>{
    const {id} = req.params;
    const deletedata = await Comment.findByIdAndDelete({_id: id})
    res.send(deletedata);
}
//Find Comment  
let searchComment = async (req, res) => {
    const {_id} = req.params;
    const comment = await Comment.findById({_id: _id});
    console.log(comment);
}

module.exports  = {
    createComment,
    allComment,
    updateComment,
    deleteComment, 
    searchComment, 

}
