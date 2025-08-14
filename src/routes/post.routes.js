const express = require('express');
const { app } = require('../app');
const router = express.Router()
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/auth.middleware');
const multer = require('multer');
const createPostController = require('../controllers/post.controller');
const upload = multer({
    storage:multer.memoryStorage()
})



//this is a protected route -> untill we have the token in the cookie, this means until we are not logged in , we can't access this route
router.post('/', authMiddleware, upload.single('image'),createPostController)




module.exports = router;
