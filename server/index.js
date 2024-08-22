const express = require('express')
const app = express() ;
const cors = require('cors') ;


const fileRoutes = require('./routes/abc');
const cloudRoutes = require('./routes/cloudUpload');
const userRoutes = require('./routes/user');

const { Connection } = require('./db');

app.use(express.json())
app.use(cors()) ;
app.use(express.static('uploads/'));

app.listen(8080 , ()=>{
    console.log("server is running ") 
})
Connection() ;
app.use('/api/v1/file', fileRoutes);
app.use('/api/v1/upload', cloudRoutes);
app.use('/api/v1/users', userRoutes);

