const musicModel = require('../models/music.model');
const jwt = require('jsonwebtoken');

async function createMusic(req,res){

    const token=req.cookies.token;   // to get the token from the cookies
    if(!token){
        return res.status(401).json({
            message:'Unauthorized'
        })
    }

    try{
j  const decoded= jwt.verify(token,process.env.JWT_SECRET)
if(decoded.role!=='artist'){
    return res.status(403).json({
        message:'You dont have permission to create music'
    })
}
    }
    catch(err){
        return res.status(401).json({
            message:'Unauthorized'
        })
    }

    const {title}= req.body;
    const file=req.file; // to get the file from the request
    
}