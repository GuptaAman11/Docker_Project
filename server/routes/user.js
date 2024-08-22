const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const express = require('express') ;
const router = express();
const User = require('../models/User');
const { verifyJWT } = require('../middleware/verify');
const { findById } = require('../models/abc');

router.post('/register', async (req, res) => {
    const { email, name, password } = req.body;
    try {
        if (!email || !name || !password) {
            return res.json({ msg: "all fields are required" })
        }

        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
           return res.json({ msg: "user already exists" })
        }

        const salt = await bcrypt.genSalt(Number(12));
		const hashPassword = await bcrypt.hash(req.body.password, salt); 
           const newUser = new User(
            {
                name: name,
                email: email,
                password: hashPassword
            }

        )  
        await newUser.save();
        return res.json(newUser)
    } catch (error) {
        console.log(error)
       return res.json({ msg: error })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.json({ msg: "All fields are required" });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ msg: "User not found" });
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if (comparePassword) {
            const token = jwt.sign({ user: user }, 'secret_key', { expiresIn: '1h' });
            return res.json({ msg: "User logged in successfully", user: user, token: token });
        } else {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Server error", error: error.message });
    }
});

router.get('/alluser',  verifyJWT , async(req ,res)=> {
    const user = req.user.user._id ;
    try {
        const allUser = await User.find({_id : {$ne : user}}) ;
        res.json(allUser)
    } catch (error) {
        console.log(error) ;
    }    


})

router.get('/loggeduser' , verifyJWT , async(req  ,res) => {
    try {
        const user = req.user.user._id ;
        const loggedUser = await User.findById({_id : user}) ;
        res.json(loggedUser) ;
    } catch (error) {
        
    }
})


module.exports = router   
