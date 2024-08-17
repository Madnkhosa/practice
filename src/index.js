const express = require('express');
const mongoose = require('mongoose');
const app = express();
const User = require('./Models/User/user');
const Comment = require('./Models/Comments/comments');
const Post = require('./Models/PostS/post');
const methodOverride = require("method-override");
const bcrypt = require('bcrypt');
const userRoutes = require('./Router/user');
const postRoutes = require('./Router/post');
const commentRoutes = require('./Router/comment');
const {postSchema} = require('./Middlewares/postValidation');
const path = require('path')  
const dotenv = require("dotenv");
dotenv.config();

app.set("views", path.join(__dirname, "/views")); 
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());


main().then((res) => {

    console.log("Connection Successful");
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/UsersS');
};

app.use("/",userRoutes);

app.use("/",postRoutes);
app.use("/",commentRoutes);
// app.get("/", (req, res)=>{
//   res.send("Hello world")
// });



    
// app.post("/create",  (req,res)=>{
//   let {fullname,user_id,email,password_hash}= req.body;
//   bcrypt.genSalt(10, (err, salt)=>{
//     bcrypt.hash(password_hash, salt, async(err, hash)=>{
//       let newUser =  new User({
//         fullname:fullname,
//         user_id: user_id,
//         email:email,
//         password_hash: hash,
//       });

//      newUser.save();
//       res.send(newUser);
//     })
//   })
 
 

// });
// //Update Route
// app.put("/user/:name", async (req, res) => {
//   const {name} = req.params;
//   const userdata = req.body;
//   console.log(userdata);
//     const updatedUser = await User.findByIdAndUpdate({_id: name}, userdata, {new:true});

//     res.send(updatedUser); 
// });


// //Destroy Route
// app.delete("/user/:id", async (req,res) => {
//   const {_id} = req.params;
//   const deletedUser = await User.findByIdAndDelete(_id)
// console.log(deletedUser);
// res.send(deletedUser);
// });

// app.get("/home", async(req, res)=>{
//   let allUsers = await User.find({});
//   console.log(allUsers);
//   res.send(allUsers);
// });

// app.post("/search/:_id", async(req, res)=>{
//   let {_id} = req.params;
//   let specificUser = await User.findById(_id);
//   console.log(specificUser);

// })
 


let port = 8080;

app.listen(port, () => {
  console.log(`Server is listening ${port}`);
});