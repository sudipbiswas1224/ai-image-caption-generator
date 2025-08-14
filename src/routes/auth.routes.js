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


router.post('/register',registerController);

router.post('/login',loginController);


module.exports = router;