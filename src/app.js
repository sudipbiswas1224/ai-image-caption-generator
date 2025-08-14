const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
exports.app = app;
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes')
app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
module.exports = app;