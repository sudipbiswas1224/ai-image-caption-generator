const express = require('express');
const usermodel = require('../models/user.model');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { registerController, loginController } = require('../controllers/auth.controller');

/* POST 
/register
/login
/user
 */

router.post('/register', async(req, res)=>{
    await registerController(req, res);
})

router.post('/login', async(req, res)=>{
    await loginController(req, res);
})

module.exports = router;