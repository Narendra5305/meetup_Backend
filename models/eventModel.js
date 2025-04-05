
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description:{ type: String},
    date: { type: Date, required: true },
    location: { type: String},
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
},{toJSON:{virtuals:true}});


EventSchema.virtual("Group",{
  localField:"_id",
  ref:"Group",
  foreignField:"events"
})


EventSchema.virtual("User",{
  localField:"createdBy",
  ref:"User",
  foreignField:"_id"
})

EventSchema.virtual("User",{
  localField:"attendees",
  ref:"User",
  foreignField:"_id"
})





  

const EventModel = mongoose.model('Event', EventSchema);


module.exports = {EventModel}
