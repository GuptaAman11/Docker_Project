const express = require('express') ;
const router = express();
const {upload , client} = require('../middleware/cloudUpload');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { PutObjectCommand , GetObjectCommand} = require("@aws-sdk/client-s3");
const crypto = require('crypto') ;
const path = require('path')

const { verifyJWT } = require('../middleware/verify');
const FileUpload = require('../models/abc')
const dotenv = require('dotenv');
const User = require('../models/User');
dotenv.config()

router.post('/cloud', verifyJWT, upload.single('picture'), async (req, res) => {
    try {
        const user = req.user.user._id;

        // Generate a 10-bit binary code as the image name
        function generate10BitCode() {
            const randomValue = crypto.randomInt(0, 1024);
            const binaryCode = randomValue.toString(2).padStart(10, '0');
            return binaryCode;
        }
        const fileExtension = path.extname(req.file.originalname);
        const imageName = `${generate10BitCode()}${fileExtension}`; 
        // S3 upload parameters
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: imageName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype 
        };

        // Upload image to S3
        const command = new PutObjectCommand(params);
        await client.send(command);
        const fileUpload = await FileUpload.create({
            author: user,
            file: imageName,
            name: req.body.name,
            ContentType: req.file.mimetype 

        });

        return res.status(200).json(fileUpload);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred during the file upload.' });
    }
});

router.get('/getcloud/:id', verifyJWT, async (req, res) => {
    try {
        const user = req.user.user._id;
        const {id} = req.params ;
        const allFiles = await FileUpload.find({ author: id });

        for (const file of allFiles) {
            if (file.file) { 
                console.log('Processing file:', file.file);

                const getObjectParams = {
                    Bucket: process.env.BUCKET_NAME,
                    Key: file.file,
                };

                const command = new GetObjectCommand(getObjectParams);
                const url = await getSignedUrl(client, command, { expiresIn: 3600 });
                file.imgUrl = url;
            } else {
                console.warn('File key is missing or undefined:', file);
            }
        }

        res.status(200).json(allFiles);
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json({ error: 'An error occurred while fetching files.' });
    }


});

router.get('/getcloudbyuser/:id', verifyJWT, async (req, res) => {
    try {
        const {id} = req.params ;
        const user = req.user.user._id;
        const allFiles = await FileUpload.find({ author: id });

        for (const file of allFiles) {
            if (file.file) { 
                console.log('Processing file:', file.file);

                const getObjectParams = {
                    Bucket: process.env.BUCKET_NAME,
                    Key: file.file,
                };

                const command = new GetObjectCommand(getObjectParams);
                const url = await getSignedUrl(client, command, { expiresIn: 3600 });
                file.imgUrl = url;
            } else {
                console.warn('File key is missing or undefined:', file);
            }
        }

        res.status(200).json(allFiles);
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json({ error: 'An error occurred while fetching files.' });
    }

}) ;





module.exports = router ;