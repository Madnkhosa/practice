const mongoose = require("mongoose");
const {
    Schema
} = mongoose;
const UserSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true
    },

    password: {
        type: String,   
        unique: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
    },
    status:{
        type: String,
        default: "deactive",
    },
   otp:{
        type: String,
    },

});

module.exports = mongoose.model("User", UserSchema);

// subhankhosa33@gmail.com
// 11221122111