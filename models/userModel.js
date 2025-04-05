const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    googleId: {type:String },
    name: {type:String },
    email : {type:String , unique:true , required:true } ,
    pass : {type:String },
    role:{type: String, enum: ["admin", "user"] , default:"user"},
    profilePic : {type:String } ,
    age:{type: Number},
    city:{type:String},
    gender: { type: String, enum: ["male", "female", "Other"] },
    isVerified :{type:Boolean , default:false},
    resetPasswordToken : {type:String },
    createdGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
    joinedGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }]
},{toJSON:{virtuals:true}})


UserSchema.virtual("Created Group",{
    ref:"Group",
    localField:"_id",
    foreignField:"organizer"
})


// UserSchema.virtual("Members of Group",{
//     ref:"Group",
//     localField:"name",
//     foreignField:"members"
// })



const UserModel = mongoose.model("User" , UserSchema);

module.exports = {UserModel}