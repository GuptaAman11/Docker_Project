const multer = require('multer') 
const { S3Client } = require("@aws-sdk/client-s3");
const dotenv = require('dotenv')
dotenv.config()

const client = new S3Client({
    credentials : {
        accessKeyId : process.env.ACCESS_KEY ,
        secretAccessKey : process.env.SECRET_KEY ,
    },
    region : process.env.REGION
})



const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

module.exports = {
    upload , client 
}