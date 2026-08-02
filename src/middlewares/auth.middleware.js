const jwt=require('jsonwebtoken');


async function authArtist(req,res,next){


    const token=req.cookies.token;   // to get the token from the cookies

    if(!token){
        return res.status(401).json({
            message:'Unauthorized'
        })
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        if(decoded.role!=='artist'){
            return res.status(403).json({
                message:'You dont have permission to create album'
            })
        }
        req.user=decoded; // we are creating a new property in the req object to store the decoded data from the token so that we can use it in the next middleware or controller function

        next();

    }
    catch(err){
        console.log(err);
        return res.status(401).json({
            message:'Unauthorized'
        })


    }
}


async function authUser(req,res,next){

    const token=req.cookies.token;   // to get the token from the cookies
    if(!token){
        res.status(401).json({
            message:'unauthorized'
        })
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        if(decoded.role!=='user' && decoded.role!=='artist'){
            return res.status(403).json({
                message:'You dont have permission to access this resource'
            })
        }
        req.user=decoded; // we are creating a new property in the req object to store the decoded data from the token so that we can use it in the next middleware or controller function

        next();

    }catch(err){
        console.log(err);
        return res.status(401).json({
            message:'Unauthorized'
        })
    }
}

module.exports={authArtist,authUser}