const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');




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

    const hashPassword=await bcrypt.hash(password,10); // to hash the password before saving it to the database 


    const newUser=await userModel.create({
        username,
        email,
        password:hashPassword, // to save the password in hashed format 
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



async function loginUser(req,res){

    const {username,email,password}=req.body;

    const user=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(!user){
        return res.status(401).json({
            message:'Invalid credentials'
        })
    }

    const isPasswordCorrect=await bcrypt.compare(password,user.password); // the user.password is coming from the databbase 

    if(!isPasswordCorrect){
        return res.status(401).json({
            message:'Incorrect pasword'

        })
}
const token=jwt.sign({

    id:user._id,
    role:user.role

},process.env.JWT_SECRET)

res.cookie('token',token);  //send the token to the client in the form of cookie

res.status(200).json({
    message:'User logged in successfully',
    user:{
        id:user._id,
        username:user.username,
        email:user.email,
        role:user.role
    }
})

}

module.exports={registerUser,loginUser}


