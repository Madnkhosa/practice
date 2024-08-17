const mongoose = require ('mongoose');
const Post = require('../Models/PostS/post');
const {postSchema} = require('../Middlewares/postValidation');




// Create Post
let createPost = async (req, res)=>{
    let result = postSchema.validate(req.body);
    let {title, text, user} = req.body;
    const id = req.id;

    let newPost = new Post({
      title: title,
      text: text,
      user: id
    });
   await newPost.save();
    console.log(newPost);
    res.send(newPost);
  };

  // All Post
  let allPost = async (req, res) =>{
    const allposts = await Post.find({});
    console.log(allposts);
    res.send(allposts);
  }
  //Update Post
let updatePost = async (req, res)=>{
    const {id} = req.params;
    
    const postdata = req.body;
    console.log(postdata);
    const updatedata = await Post.findByIdAndUpdate({_id: id},{postdata},{ runValidators: true,  new: true} );
    res.send(updatedata);

}
//Destroy Post
let deletePost = async (req, res)=>{
    const {id} = req.params;
    const deletedata = await Post.findByIdAndDelete({_id: id})
    res.send(deletedata);
}
//Find Post
let searchPost = async (req, res) => {
    const {_id} = req.params;
    const post = await Post.findById({_id: _id});
    console.log(post);
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).json({message: "Invalid ID"});
    }
    if(post==null){
        return res.status(404).json({message: "Post not Found"});
    }
    console.log(post);
    res.send(post);

}


  module.exports = {
    createPost,
    allPost,
    updatePost,
    deletePost,
    searchPost
}