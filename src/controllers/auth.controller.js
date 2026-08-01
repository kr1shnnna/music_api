const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');



async function registerUser(req,res){

    const {username,email,password,role='user'}=req.body;  // by default value of role is user

    const isUserAlreadyExist=await userModel.findOne({

        $or:[
        {username},
        {email}

        ]
    })

    if(isUserAlreadyExist){

return res.status(409).json(
    {
        message:'User already exists'
    }
)
    }

    const newUser=await userModel.create({
        username,
        email,
        password,
        role
    })

    const token=jwt.sign({
        id:newUser._id, // we have to use atleast one data i.e unique data to create a token 
        role:newUser.role


    },process.env.JWT_SECRET)

    res.cookie('token',token)

    res.status(201).json({
        message:'User registered successfully',
        newUser:{
            id:newUser._id,
            username:newUser.username,
            email:newUser.email,
            role:newUser.role
        }

    })


}

