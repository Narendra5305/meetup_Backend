const {EventModel} = require("../models/eventModel");
const {GroupModel} = require("../models/groupModel");



const GetEventDetails =async (req,res) =>{
    const {id} = req.params ;
    try {
        const event = await EventModel.findOne({_id:id}).populate("group").populate("createdBy", "-pass -resetPasswordToken -email").populate("attendees","-pass -resetPasswordToken -email");
        res.status(200).json({event})
    }catch (error){
        res.status(500).json({"Error on fetching event details data":error})
    }
}


const GetEventsData =async (req,res) =>{
    try {
        const eventData = await EventModel.find().populate("group").populate("createdBy", "-pass -resetPasswordToken -email").populate("attendees","-pass -resetPasswordToken -email");
        res.status(200).json({eventData})
    }catch (error){
        res.status(500).json({"Error on fetching event data":error})
    }
}


const AddEvent =async (req,res) =>{
    const { title , description, date,  location } = req.body ;
    const {id} = req.params ;
    try {
        const NewEvent =await EventModel.create({
            title , 
            description, 
            date,  
            location,
            group:id ,
            createdBy:req.userId
        })
        await GroupModel.findByIdAndUpdate({_id : id} , {$push:{events:NewEvent._id}})
        res.status(200).json({"msg":"Event Added Successfull"})
    } catch (error) {
        res.status(500).json({"Error on adding event data":error})
    }
    
}


const JoinAttendees = async(req,res) =>{
    const {id} = req.params ;
     try {
        await EventModel.findByIdAndUpdate({_id:id} , {$push:{attendees:req.userId}})
        res.status(200).json({"msg":"event Join Successfull"})
    } catch (error) {
        res.status(500).json({"Error on adding event data":error})
    }

}



const UpdateEvent = async(req,res) =>{
    const {id} = req.params ;
    try {
        const event = await EventModel.findById({_id:id}) ;
        if (event.createdBy.toString()===req.userId){
            await EventModel.findByIdAndUpdate({_id:id} ,req.body)
            return res.status(200).json({"msg":"Event update Successfull"})
        }
        res.status(400).json({"msg":"you are not a event orgainizer"})
    } catch (error) {
        res.status(500).json({"Error on update event":error})
    }

}



const DeleteEvent =async (req,res) =>{
    const {id} = req.params ;
    try {
        const event = await EventModel.findById({_id:id}) ;
        if (event.createdBy.toString()===req.userId){
            await GroupModel.findByIdAndDelete({_id : event.group} , {$push:{events:event._id}})
            await Event.findByIdAndDelete({_id:id})
            return res.status(200).json({"msg":"Event delete Successfull"})
        }
        res.status(400).json({"msg":"you are not a event orgainizer"})
    } catch (error) {
        res.status(500).json({"Error on update event":error})
    }

}




module.exports ={GetEventDetails , GetEventsData , AddEvent ,JoinAttendees , UpdateEvent, DeleteEvent}