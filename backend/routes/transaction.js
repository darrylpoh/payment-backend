const {
  Op
} = require('sequelize');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const Wallet = require('../models/Wallet');
const express = require('express');
const verifyToken = require('../auth/auth');
const { transaction } = require('../config/db');
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
    // get sender and receiver info
    const historyWithUserInfo = await Promise.all(history.map(async (transaction) => {
      const senderInfo = await User.findOne({
        where: {
          user_id: transaction.sender_id
        }
      });
      const receiverInfo = await User.findOne({
        where: {
          user_id: transaction.receiver_id
        }
      });
      return {
        ...transaction.toJSON(),
        senderInfo: senderInfo ? senderInfo.toJSON() : null, // Include sender info
        receiverInfo: receiverInfo ? receiverInfo.toJSON() : null, // Include receiver info
      }
    }));


    res.json({
      data: historyWithUserInfo,
      "error": false,
      "message": "History fetched successfully"
    })
  } catch (error) {
    // console.log(error);
    res.json({
      "error": true,
      "message": error.message
    })
  }
});

router.post('/transfer', verifyToken, async (req, res) => {
  const userInfo = req.userInfo;
  const user_id = userInfo.user_id;
  const receiver_username = req.body.receiver;
  const sender_amount = req.body.sender_amount;
  const receiver_amount = req.body.receiver_amount;
  try {
    // Checking for Existance of User Wallet
    let sender_wallet = await Wallet.findOne({where: 
      {user_id: user_id
    }});
    if (!sender_wallet) {
      res.status(404).json({
        "error": true,
        "message": "User Wallet Not Found!"
      }).send();
    }
    // Checking if User has Sufficient Balance
    if (parseFloat(sender_wallet.balance) < parseFloat(sender_amount)) {
      res.status(400).json({
        "error": true,
        "message": "Insufficient Balance in Your Wallet!"
      }).send();
    }
    // Checking for Existance of Receiver
    const receiver = await User.findOne({where: {
      username: receiver_username
    }});
    if (!receiver) {
      res.status(404).json({
        "error": true,
        "message": "Receiver Not Found!"
      }).send();
    }
    // Checking for Existance of Receiver Wallet
    let receiver_wallet = await Wallet.findOne({where: {
      user_id: receiver.user_id
    }});
    if (!receiver_wallet) {
      res.status(404).json({
        "error": true,
        "message": "Receiver Wallet Not Found!"
      }).send();
    }
    const transaction = new Transaction({
      sender_id: user_id,
      receiver_id: receiver.user_id,
      amount: sender_amount,
      currency: userInfo.default_currency,
      isCurrentUserRequest: false,
      usd_amt: 0.0,
      receiver_amount: receiver_amount,
      sender_amount: sender_amount
    });
    const transactionExecuted = await transaction.save();
    if (transactionExecuted) {
      // sender_wallet.balance -= sender_amount;
      // receiver_wallet.balance += receiver_amount;
      let senderCurrBalance = sender_wallet.balance
      await Wallet.update(
        {balance: String(Number(senderCurrBalance)-Number(sender_amount))},  
        {where: {user_id: user_id}}
      )
      let receiverCurrBalance = receiver_wallet.balance
      await Wallet.update(
        {balance: String(Number(receiverCurrBalance)+Number(receiver_amount))},  
        {where: {user_id: receiver.user_id}}
      )
    //   await sender_wallet.save(function(err,result){
    //     if (err){
    //         console.status(400).log(err);
    //         res.json({
    //           "error": true,
    //           "message": "Error with Sending"
    //         }).send();
    //     }
    // })
    //   await receiver_wallet.save(function(err,result){
    //     if (err){
    //         console.status(400).log(err);
    //         res.json({
    //           "error": true,
    //           "message": "Error with Receiving"
    //         }).send();
    //     }
    // })
      res.status(200).json({
        "Message": transaction.toJSON()
      })
    } else {
      res.json({
        "error": true,
        "message": "Error with Transfer!"
      })
    }
  } catch(error) {
    console.log(error);
    res.json({
      "error": true,
      "message": error.message
    })
  }
});

router.post('/topup', verifyToken, async (req, res) => {
  const userInfo = req.userInfo;
  const user_id = userInfo.user_id;
  const topup_amount = req.body.topup_amount;
  try {
    // Checking for Existance of User Wallet
    const user_wallet = await User.findOne({where: {
      user_id: user_id}});
    if (!user_wallet) {
      res.status(404).json({
        "error": true,
        "message": "User Wallet Not Found!"
      }).send();
    }
    

    const transaction = new Transaction({
      receiver_id: user_id,
      amount: topup_amount,
      currency: userInfo.default_currency,
      isCurrentUserRequest: false,
      usd_amt: 0.0,
      receiver_amount: topup_amount,
      sender_amount: topup_amount,
      is_top_up: true
    });
    const transactionExecuted = await transaction.save();
    if (transactionExecuted) {

      // test code
      // if (user_wallet.balance == undefined) {
      //   user_wallet.balance = Number(topup_amount);
      // } else {
      //   user_wallet.balance += Number(topup_amount);
      // }
      // console.log(user_wallet.balance)
    //   await user_wallet.save(function(err,result){
    //     if (err){
    //         console.status(400).log(err);
    //         res.json({
    //           "error": true,
    //           "message": "Error with Receiving"
    //         }).send();
    //     }
    // })

      /*
        get user wallet based on user_id
        update user wallet based on curr balance + topup amount
      */
      const userWallet =  await Wallet.findOne({
        where: {
          user_id: user_id
        }
      })
      let currBalance = userWallet.dataValues.balance
      await Wallet.update(
        {balance: String(Number(currBalance)+Number(topup_amount))},  
        {where: {user_id: user_id}}
        )
      

      res.status(200).json({
        "Message": transaction.toJSON()
      })
    } else {
      res.json({
        "error": true,
        "message": "Error with Top Up!"
      })
    }
  } catch(error) {
    console.log(error);
    res.json({
      "error": true,
      "message": error.message
    })
  }
});

module.exports = router;