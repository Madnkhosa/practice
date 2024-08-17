const mongoose = require ('mongoose');
const { Schema } = mongoose;

const postSchema = new mongoose.Schema({
    title: {
     type: String,
     trim: true,
     required: true
   },
     text: {
     type: String,
     trim: true,
     required: true
   },
    date: {
     type: Date,
     default: Date.now
   },
   user:{
    type: mongoose.Types.ObjectId,
    ref: "User"
 },
//  comment:[{
// type: mongoose.Types.ObjectId,
// ref: "Comment"
// }],
});
module.exports = mongoose.model('Post', postSchema);
