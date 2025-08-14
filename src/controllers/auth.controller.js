const usermodel = require("../models/user.model");
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs')

//register controller
async function registerController(req, res) {
    const { username, password } = req.body;

    const doesUserExist = await usermodel.findOne({
        username
    })
    if (doesUserExist) {
        return res.status(409).json({
            message: "User already exists"
        })
    }
    const user = await usermodel.create({
        username,
        password: await bcryptjs.hash(password, 10) // Hashing the password
    });
    //generating the token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    //generating the cookie
    res.cookie('token', token);
    res.status(201).json({
        message: "User register successfully",
        user,
        
    })
}

//login controller
async function loginController(req, res){
    const {username, password} = req.body;

    const user = await usermodel.findOne({
        username
    })
    if(!user){
        return res.status(404).json({
            message:"User not found"
        })
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(401).json({
            message:"Invalid password"
        })
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
    res.cookie('token', token);

    res.status(200).json({
        message: "User logged in successfully",
        user:{
            username:user.username,
            id:user._id
        }
    })

}


module.exports = { registerController,loginController }