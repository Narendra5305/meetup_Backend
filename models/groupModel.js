const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String},
    image: { type: String},
    location: { type: String},
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
},{toJSON:{virtuals:true}})

GroupSchema.virtual("Orgainizer",{
    ref:"User",
    localField:"organizer",
    foreignField:"_id"
})

GroupSchema.virtual("Members",{
    ref:"User",
    localField:"members",
    foreignField:"_id"
})


GroupSchema.virtual("Members",{
    ref:"User",
    localField:"members",
    foreignField:"_id"
})


  

const GroupModel  = mongoose.model('Group', GroupSchema);


module.exports ={GroupModel}