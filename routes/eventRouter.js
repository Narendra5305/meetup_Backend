const express = require("express");

const eventRouter = express.Router();

const {auth} = require("../middleware/auth")

const {GetEventDetails , GetEventsData , AddEvent ,JoinAttendees ,UpdateEvent, DeleteEvent} = require("../controller/eventController")



eventRouter.get('/'  , GetEventsData)

eventRouter.get('/:id' , auth , GetEventDetails)

eventRouter.post('/:id' , auth , AddEvent)

eventRouter.post('/joinAttendees/:id' , auth , JoinAttendees)

eventRouter.patch('/:id' , auth , UpdateEvent)

eventRouter.patch('/:id' , auth , DeleteEvent)


module.exports = {eventRouter} 


