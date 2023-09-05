const Wallet = require('../models/Wallet');
const express = require('express');
const router = express.Router();
const admin = require('../config/firebaseConfig');
const dayjs = require('dayjs');

// middleware
const verifyToken = require('../auth/auth')

// get user wallet
router.get('/', verifyToken, async (req, res) => {
    const userInfo = req.userInfo;
    const userWallet = await Wallet.findOne({
        user_id: userInfo.user_id
    });
    res.json({
        data: userWallet,
        "error": false,
        "message": "User wallet fetched successfully"
    })
});

module.exports = router;