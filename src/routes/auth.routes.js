const express = require('express');
const usermodel = require('../models/user.model');
const router = express.Router();
const jwt = require('jsonwebtoken')

/* POST 
/register
/login
/user
 */

router.post('/register', async(req, res)=>{
    const {username, password} = req.body;

    const isUserExist = await usermodel.findOne({
        username
    })
    if(isUserExist){
        return res.status(409).json({
            message:"User already exists"
        })
    }
    const user = await usermodel.create({
        username, 
        password
    });
    //generating the cookie
    const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET);
    res.cookie('token', token);
    res.status(201).json({
        message:"User register successfully",
        user,
        token
    })
})

module.exports = router;