const musicModel = require('../models/music.model');
const jwt = require('jsonwebtoken');
const uploadFile=require('../services/storage.service')
async function createMusic(req,res){

    const token=req.cookies.token;   // to get the token from the cookies
    if(!token){
        return res.status(401).json({
            message:'Unauthorized'
        })
    }

    try{
      const decoded= jwt.verify(token,process.env.JWT_SECRET)
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

    const result = await uploadFile(file.buffer.toString('base64')) // to convert the file to base64 format

    const music=await musicModel.create({
        uri:result.url,
        title,
        artist:decoded.id
    })

    res.status(201).json({
        message:'Music created successfully',
        music:{
            id:music._id,
            uri:music.uri,
            title:music.title,
            artist:music.artist
        }
    })
    
}

module.exports={createMusic}