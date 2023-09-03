const User = require('../models/User');
const express = require('express'); 
const router = express.Router();

// get all users
router.get('/', async (req, res) => {
    const users = await User.findAll();
    res.json(users)
})

module.exports = router;