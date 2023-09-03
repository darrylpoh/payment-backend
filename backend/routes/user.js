const User = require('../models/User');
const express = require('express');
const router = express.Router();
const admin = require('../config/firebaseConfig');
const dayjs = require('dayjs');

// middleware
const verifyToken = require('../auth/auth')

// get user detail
router.get('/', verifyToken, async (req, res) => {
    const userInfo = req.userInfo;
    res.json({
        data: userInfo,
        "error": false,
        "message": "User detail fetched successfully"
    })
})

router.post('/register', async (req, res) => {
    const {
        username,
        email,
        password,
        full_name,
        date_of_birth,
        phone_number
    } = req.body;
    try {
        const user = await admin.auth().createUser({
            email,
            password,
        });
        const userInfo = await User.create({
            user_id: user.uid,
            username: username,
            email: email,
            full_name: full_name,
            date_of_birth: dayjs(date_of_birth).format('YYYY-MM-DD'),
            phone_number: phone_number,
        });
        res.json({
            data: userInfo,
            "error": false,
            "message": "User registered successfully"
        })
    } catch (error) {
        console.log(error);
        res.json({
            "error": true,
            "message": error.message
        })
    }
});

module.exports = router;