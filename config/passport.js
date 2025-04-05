const passport = require("passport")

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const {UserModel} = require('../models/userModel')
require('dotenv').config()


passport.use(new GoogleStrategy({
    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/users/google/callback"
}, async (accessToken , refreshToken , profile , done)=>{
    let user = await UserModel.findOne({googleId:profile.id})
    if (!user){
        user = await UserModel.create({
            googleId:profile.id ,
            name : profile.displayName ,
            email:profile.emails[0].value,
            profilePic:profile.photos[0].value,
            isVerified:true
        })
    }
    done(null , user)
}
))

passport.serializeUser((user, done)=>{
    done(null , user.id)
})

passport.deserializeUser(async(id , done)=>{
    const user = await UserModel.findById(id);
    done(null , user)
})

module.exports = {passport}