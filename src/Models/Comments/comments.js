const mongoose = require("mongoose");
const {
    Schema
} = mongoose;


const commentsSchema = new Schema({
   
    message: {
        type: String,
        require: true
    },
    userId:{
       type: mongoose.Types.ObjectId,
       ref: "User"
    },
    postId:{
        type: mongoose.Types.ObjectId,
        ref: "Post"
    }
})
module.exports = mongoose.model("Comment", commentsSchema);
