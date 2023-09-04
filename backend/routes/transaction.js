const { Op } = require('sequelize');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const express = require('express');
const verifyToken = require('../auth/auth');
const router = express.Router();

// get past transactions
router.get('/history', verifyToken, async (req, res) => {
  const userInfo = req.userInfo;
  const user_id = userInfo.user_id;
  try {
    const history = await Transaction.findAll({
      where: {
        [Op.or]: [{
            sender_id: user_id
          },
          {
            receiver_id: user_id
          },
        ],
      },
      order: [
        ['transaction_date', 'DESC'], // Sort by transaction_date in descending order
      ],
    });
    res.json({
      data: history,
      "error": false,
      "message": "History fetched successfully"
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