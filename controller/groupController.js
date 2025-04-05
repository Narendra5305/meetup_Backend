

const {GroupModel} = require("../models/groupModel");
const {UserModel} = require("../models/userModel")


const GetGroupDetails = async(req,res) =>{
    const {id} = req.params ;
    try {
        const group = await GroupModel.findOne({_id:id}).populate("organizer", "-pass -resetPasswordToken -email").populate("members", "-pass -resetPasswordToken -email").populate("events");;
        res.status(200).json({group})
    }catch (error){
        res.status(500).json({"Error on fetching group details data":error})
    }
}



const GetGroupData =async (req,res) =>{
    try {
        const GroupData = await GroupModel.find().populate("organizer", "-pass -resetPasswordToken -email").populate("members", "-pass -resetPasswordToken -email").populate("events");
        res.status(200).json({"Groups":GroupData})
    }catch (error){
        res.status(500).json({"Error on fetching group data":error})
    }
}


const AddGroup =async (req,res) =>{
    const { name , description, image,  location} = req.body ;
    
    try {
        const NewGroup =await GroupModel.create({
                name,
                description ,
                image ,
                location ,
                organizer: req.userId
        })
        await UserModel.findByIdAndUpdate({_id : req.userId} , {$push:{createdGroups:NewGroup._id}})
        res.status(200).json({"Group Added Successfull":NewGroup})
    } catch (error) {
        res.status(500).json({"Error on adding group data":error})
    }
}


const JoinGroup = async(req,res) =>{
    const {id} = req.params ;
    
    try {
        const newJoinee  =await GroupModel.findByIdAndUpdate({_id:id} , {$push:{members:req.userId}})
        await UserModel.findByIdAndUpdate({_id:req.userId} , {$push:{joinedGroups:newJoinee._id}})
        res.status(200).json({"msg":"Group Join Successfull"})
    } catch (error) {
        res.status(500).json({"Error on adding group data":error})
    }

}


// const ExitGroup = async(req,res) =>{
  

// }



const UpdateGroup = async(req,res) =>{
    const {id} = req.params ;
    try {
        const group = await GroupModel.findById({_id:id}) ;
        console.log(group.organizer.toString())
        if (group.organizer.toString()===req.userId){
            await GroupModel.findByIdAndUpdate({_id:id} ,req.body)
            return res.status(200).json({"msg":"Group update Successfull"})
        }
        res.status(400).json({"msg":"you are not a group admin"})
    } catch (error) {
        res.status(500).json({"Error on update group":error})
    }

}


const DeleteGroup = async(req,res) =>{
    const {id} = req.params ;
    try {
        const group = await GroupModel.findById({_id:id}) ;
        if (group.organizer.toString()===req.userId){
            await UserModel.findByIdAndDelete({_id : req.userId} , {$pull:{createdGroups:group._id}})
            await GroupModel.findByIdAndDelete({_id:id})
            return res.status(200).json({"msg":"Group delete Successfull"})
        }
        res.status(400).json({"msg":"you are not a group admin"})
    } catch (error) {
        res.status(500).json({"Error on update group":error})
    }
}

module.exports ={GetGroupDetails , GetGroupData ,AddGroup , JoinGroup ,UpdateGroup ,DeleteGroup}