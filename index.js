const express = require("express");
const { connectToDb } = require("./config/dbConnect");

const {userRouter} = require("./routes/userRoute")
const session = require("express-session")
const cors = require('cors');
const {eventRouter} = require("./routes/eventRouter")
const {groupRouter} = require("./routes/groupRoute")





const app = express()


app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))


app.use(express.json())



app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));



app.use('/users', userRouter)
app.use('/groups' , groupRouter)
app.use( '/events', eventRouter)

app.get('/' , (req,res)=>{
    res.send("this is home page")
})



app.listen(8080,()=>{
    connectToDb()
    console.log("server is running at http://localhost:8080/")
})