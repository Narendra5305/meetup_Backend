const {UserModel} = require("../models/userModel")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



const LoginByEmail = (req,res) =>{
    const user = req.user ;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET , {expiresIn : "1d"});

    // res.cookie("token" , token   , {httpOnly :true , secure: false })
    // res.cookie("userId", user._id  , {httpOnly :false , secure: false })

    res.json({ message: "Login successful", "userId": user._id, token });
    // res.redirect('https://meetup-clone-1.netlify.app/')
} 
// using google auth





const RegisterUser =async (req,res) =>{
    const {name , email, pass, age, city ,gender} = req.body ;
    try {
        bcrypt.hash(pass, 10, async(err, hash)=> {
            if (err){
                res.status(401).json({"there has been an error" : err})
            }else{
                await UserModel.create({
                    name,
                    email,
                    pass:hash ,
                    age,
                    gender,
                    city
                })
                res.status(201).json({"MSG" : "Sign Up Successfull"})
            }
        });
        
    } catch (error) {
        res.status(401).json({"there has been an error" : error})
    }

} // using bcrypt





const LoginUser =async (req,res) =>{
    const {email , pass} = req.body ;
    try {
        const user = await UserModel.findOne({email})

        if (user){
            bcrypt.hash(user.pass, 10, async(err, hash)=> {
                if (err){
                    res.status(401).json({"there has been an error" : err})
                }else{
                    const token =await jwt.sign({ id: user._id }, process.env.JWT_SECRET , {expiresIn : "1d"});
                    res.status(200).json({"msg":"sign in successfull",token ,"userId":user._id})
                }
            });
        }else{
            res.status(500).json({"msg":"Credential not found"})
        }
        
    } catch (error) {
        res.status(401).json({"there has been an error" : error})
    }

}


const EditUserDetail = (req,res) =>{

}


const ForgotPassword = (req,res) =>{

}

module.exports = {LoginByEmail , RegisterUser, LoginUser , EditUserDetail , ForgotPassword}