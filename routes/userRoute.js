const express = require("express");

const userRouter = express.Router();

const {passport} = require("../config/passport");

const {LoginByEmail , RegisterUser, LoginUser , EditUserDetail , ForgotPassword} = require("../controller/userController")



// authentication by google 0auth
userRouter.get("/google" , passport.authenticate("google",{scope:["profile" ,"email"]}));
userRouter.get("/google/callback" , passport.authenticate("google" , {failureRedirect:"/"}), LoginByEmail)


userRouter.post('/signin', LoginUser)

userRouter.post('/signup', RegisterUser)



module.exports = {userRouter}


