const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const musicRoutes = require('./routes/music.routes');


const app = express();
app.use(express.json());   // to parse the req to the bodies 
app.use(cookieParser());   // to parse the cookies in the req 

app.use('/api/auth',authRoutes);

app.use('/api/music',musicRoutes);







module.exports = app;
