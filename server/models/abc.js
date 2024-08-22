const mongoose = require('mongoose') ;
const abcSchema = new mongoose.Schema({
    file : {
        type : String 
    } ,    
    name : {
        type : String ,
    } ,
    author : {
        type : mongoose.Types.ObjectId ,
        ref : "User"
    } ,
    imgUrl : {
        type : String 
    }
})

const FileUpload = mongoose.model("abc", abcSchema);
 

module.exports = FileUpload;
