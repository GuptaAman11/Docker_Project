const express = require('express') ;
const router = express();
const {upload} = require('../middleware/file');
const { verifyJWT } = require('../middleware/verify');
const FileUpload = require('../models/abc')


router.post('/abc',verifyJWT,upload.single('picture'), async(req ,res)=>{
    const user = req.user.user._id ;
    let picture ;
    console.log(req.body.name)
    if(req.file){    
        let picture = req.file.path ;
        console.log("file is pressent")
    }

   try {
     const fileUpload = await FileUpload.create({
         author : user ,
         file : req.file.path ,
         name : req.body.name ,
     })
     return res.status(200).json(fileUpload) ;
   } catch (error) {
        console.log(error)
   }
})


router.get('/get', verifyJWT , async(req ,res)=>{
    const user = req.user.user._id ;
    const Allfile = await FileUpload.find({author : user}) ;
    res.status(200).json(Allfile) ;
})



module.exports = router   
