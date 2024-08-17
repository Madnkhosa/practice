const express = require("express");
const {
    createUser,
    updateUser,
    destroyUser,
    allUser,
    searchUser,
    loginUser,
    otpValidation
} = require("../Controllers/user");
const router = express.Router();
const {
    checkAuth,
    checkAdmin
} = require('../Middlewares/auth');


router.get("/user", checkAuth,allUser)
router.post("/signup" ,createUser)
router.put("/user/", checkAuth, updateUser)
router.delete("/use/", checkAuth, destroyUser)
router.post("/user/", searchUser)
router.post("/login", loginUser)
router.post("/otp", otpValidation);

module.exports = router;