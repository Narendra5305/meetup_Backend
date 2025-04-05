const jwt = require('jsonwebtoken');
require('dotenv').config();


const auth = (req,res,next) =>{
    const token = req.headers.authorization.split(" ")[1];
    try {
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if (decoded){
                
                const {id} = decoded;
                req.userId = id ;
                
                next()
            }else{
                res.status(500).json({'msg':'token error' , err})
            }
        });
        
    } catch (error) {
        res.status(401).json({'msg':'authentication failed' , error})
    }
}

module.exports ={auth}