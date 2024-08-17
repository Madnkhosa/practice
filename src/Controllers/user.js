const mongoose = require('mongoose');
const User = require("../Models/User/user");
const {
    userSchema
} = require('../Middlewares/userValidation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const dotenv = require("dotenv");
dotenv.config();

// const transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // Use `true` for port 465, `false` for all other ports
//     auth: {
//       user: "anais76@ethereal.email",
//       pass: "8udFvv7P92DyyNHvb6",
//     },
//   });


//Create User
let createUser = async (req, res) => {

    const result = userSchema.validate(req.body);
    //    const user = req.body;
    //    console.log(user);
    //    const email = user.email;
    //    const password = user.password;
    const {
        fullname,
        email,
        password
    } = req.body;
    const checkEmail = await User.findOne({
        email: email
    });
    if (checkEmail) {
        return res.status(400).json({
            message: "Email already exists"
        });
    }
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let newUser = new User({
                fullname: fullname,
                email: email,
                password: hash,
            });

        
           let otp= Math.floor(100000 + Math.random() * 900000) ;
           newUser.otp=otp;

            await newUser.save();
            // let {fullname, email} = newUser;
            sendEmail.sendEmailNotification(email, fullname, "OTP Verification",otp);
            res.send(newUser.fullname);
        });



    })
}


//Update Route
let updateUser = async (req, res) => {

    //   const {
    //         id
    //     } = req.params;
    const id = req.id;
    console.log("id:...", id);
    const userdata = req.body;
    console.log(userdata);
    const updatedUser = await User.findByIdAndUpdate({
        _id: id
    }, userdata, {
        new: true
    });

    res.send(updatedUser);
}

//Destroy Route
let destroyUser = async (req, res) => {
    let id = req.id;

    const deletedUser = await User.findByIdAndDelete({
        _id: id
    });
    console.log(deletedUser);
    res.send(deletedUser);
};

//Get All Users
let allUser = async (req, res) => {
    let allUsers = await User.find({});
    console.log(allUsers);
    res.send(allUsers);
};

//Find User
let searchUser = async (req, res) => {
    let idd = req.id;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({
            message: "Invalid ID"
        });
    }

    let specificUser = await User.findById(_id);

    if (User == null) {
        return res.status(404).json({
            message: "User not Found"
        });
    }
    console.log(specificUser);
    res.send(specificUser);

};
//

//Login User
let loginUser = async (req, res) => {
    let user = await User.findOne({
        email: req.body.email
    });
    if (!user) return res.send("Something is wrong");
    bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result) {
            if(user.status == "deactive"){
                return res.status(401).json({message: "User is inactive"});
            }
            let payload = {
                email: user.email,
                id: user._id,
                role: user.role
            }
            let options = {
                expiresIn: "5h",
            }
            let token = jwt.sign(payload, process.env.JWT_SECRET, options);

            // sendEmail.sendEmailNotification(user.email, user.fullname, "Welcome to Social Media",)
            // async function main() {
            //     // send mail with defined transport object
                // const info = await transporter.sendMail({
                //     from: '"Maddison Foo Koch 👻" <anais76@ethereal.email>', // sender address
                //     to: user.email, // list of receivers
                //     subject: "Hello ✔", // Subject line
                //     text: "Hello world?", // plain text body
                //     html: "<b>Welcome message !  </b>", // html body
                // });
                // console.log("Message sent: %s", info.messageId);
             
            // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
            res.cookie("token", token);
            res.send(token);

        } else
            res.send("no you can login");
    });

};

// Otp Validation
let otpValidation = async (req, res) =>{
    let user = await User.findOne({
        email: req.body.email
    })
    if(!user){
        return res.send("User not found");
    }
    if (user.otp == req.body.otp){
        user.status="active";
        user.save();
        res.send("User is activated");
    }else{
        res.send("Invalid OTP");
    }
}

module.exports = {
    createUser,
    updateUser,
    destroyUser,
    allUser,
    searchUser,
    loginUser
    ,otpValidation
};


// fareedSamina@gmail.com
// 39483489743
// subhankhosa@gmail.com
// 11221122


