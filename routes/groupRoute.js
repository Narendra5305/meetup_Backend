const express = require("express");

const {auth} = require("../middleware/auth");

const {GetGroupDetails , GetGroupData ,AddGroup , JoinGroup, UpdateGroup ,DeleteGroup} = require("../controller/groupController");

const groupRouter = express.Router();



groupRouter.get('/', GetGroupData)

groupRouter.get('/:id', auth , GetGroupDetails)

groupRouter.post('/', auth , AddGroup)

groupRouter.patch("/join/:id" , auth , JoinGroup)

groupRouter.patch('/:id', auth , UpdateGroup)

groupRouter.delete('/:id', auth , DeleteGroup)


module.exports = {groupRouter}


