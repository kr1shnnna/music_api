const musicModel = require('../models/music.model');
const jwt = require('jsonwebtoken');
const {uploadFile}=require('../services/storage.service')
const albumModel = require('../models/album.model');



async function createMusic(req,res){

    const token=req.cookies.token;   // to get the token from the cookies
    if(!token){
        return res.status(401).json({
            message:'Unauthorized'
        })
    }

//     try{
//       const decoded= jwt.verify(token,process.env.JWT_SECRET)
// if(decoded.role!=='artist'){
//     return res.status(403).json({
//         message:'You dont have permission to create music'
//     })
// }
    

    const {title}= req.body;
    const file=req.file; // to get the file from the request


    if (!title) {
    return res.status(400).json({
        message: "Title is required"
    });
    }

    if (!file) {
    return res.status(400).json({
        message: "Music file is required"
    });
    }

    const result = await uploadFile(file.buffer.toString('base64')) // to convert the file to base64 format

    const music=await musicModel.create({
        uri:result.url,
        title,
        artist:req.user.id
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

//     }
//    catch (err) {
//     console.error(err);

//     return res.status(500).json({
//         message: err.message
//     });
// }
    
}


async function createAlbum(req,res){
    // const token=req.cookies.token;   // to get the token from the cookies

    // if(!token){
    //     return res.status(401).json({
    //         message:'Unauthorized'
    //     })
    // }

    // try{

    //     const decoded=jwt.verify(token,process.env.JWT_SECRET)

    //     if(decoded.role!=='artist'){
    //         return res.status(403).json({
    //             message:'You dont have permission to create album'
    //         })
    //     }

        const {title,musics}= req.body;

        const album= await albumModel.create({
            title,
            musics:musics,
            artist:req.user.id
        })

        res.status(201).json({
            message:'Album created successfully',
            album:{
                id:album._id,
                title:album.title,
                artist:album.artist,
                musics:album.musics

        }})

    // }
    // catch (err) {
    //         console.log(err);
    //         return res.status(401).json({
    //             message: 'Unauthorized'
    //         })
    // }
}


async function getAllMusics(req,res){
    const musics=await musicModel.find()
    .skip(0)   // helps in pagination by skipping the first 0 records and returning the next 2 records // reduces the load on the server by not fetching all the records at once and also helps in reducing the load on the client by not sending all the records at once 
    .limit(2)
    .populate('artist','username email role')
    res.status(200).json({
        message:'All musics fetched successfully',
        musics:musics
    })
}

async function getAllAlbums(req,res){

    const albums=await albumModel.find().select('title artist').populate('artist','username email ')

    res.status(200).json({
        message:'All albums fetched successfully',
        albums:albums
    })

}

async function getAlbumById(req,res){
    const albumId=req.params.albumId;

    const album=await albumModel.findById(albumId).populate('artist','username email').populate('musics')

    return res.status(200).json({
        message:'Album fetched successfully',
        album:album
    })
}



module.exports={createMusic,createAlbum,getAllMusics,getAllAlbums,getAlbumById}