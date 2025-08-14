const jwt = require('jsonwebtoken');
const usermodel = require('../models/user.model');

async function authMiddleware (req, res, next){
    const token = req.cookies.token;

    if(!token){
        //if there is no token, return unauthorized
        return res.status(401).json({
            message: 'Unauthorized access, please login first.'
        })
    }
    try{
        //trying to get the user from the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = usermodel.findOne({
            _id:decoded.id
        })
        req.user = user;
        next();
    }
    catch(err){
        //if there is an error in verifying the token, return unauthorized
        return res.status(401).json({
            message:"Invalid token, please login again"
        })
    }

}
module.exports = authMiddleware;