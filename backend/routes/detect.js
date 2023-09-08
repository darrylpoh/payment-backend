const { Op } = require('sequelize');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const express = require('express');
const verifyToken = require('../auth/auth');
const router = express.Router();
const { IsolationForest } = require('isolation-forest');



router.get('/', verifyToken,async (req, res) => {
  // const userId = 'xIpAIQpOUjedRqprzfuLDNRS0pN2'; // Replace with the desired user ID later on
  const userId = req.userId;
  try {

    // only USD_amt will be considered to ensure consistency when detecting anomaly

    const history = await Transaction.findAll({
      attributes: ['usd_amt', 'transaction_id', 'is_top_up'],
      where: {
        [Op.and]: [{ sender_id: userId },

          {
            is_top_up: false
          }
          ,],
      },
      
      order: [['transaction_date', 'ASC']],
    });

    // Extract the plain data from Sequelize instances
    const jsonData = history.map(transaction => transaction.get({ plain: true }));

    // My for loop here calculates the last K=5 transactions

    for (let i = 0; i < jsonData.length; i++) {
      let sum = 0;
      let count = 0;

      for (let j = i; j >= 0 && j > i - 5; j--) {
        sum += parseFloat(jsonData[j].usd_amt);
        count++;
      }
      const average = sum / count;
      jsonData[i].average = average.toFixed(2);
    }


console.log(jsonData)


const usdAmtValues = jsonData.map(item => parseFloat(item.usd_amt));
const averageValues = jsonData.map(item => parseFloat(item.average));
const numPoints = jsonData.length;

const data = [];
for (let i = 0; i < numPoints; i++) {
  data.push([usdAmtValues[i], averageValues[i]]);
}

// Initialize Isolation Forest. No random seeed available as it is not supported.
const forest = new IsolationForest();
forest.fit(data);
console.log(forest.scores())
var score= forest.scores().at(-1)
var anomaly = false;

// I set score to be >= 0.8, a less-conservative approach. Note that 0 = not anomaly, 1 = confirm anomaly

if (score>=0.8){
  anomaly = true;
}
    res.json({"USD": usdAmtValues.at(-1),"score":score, 'anomaly':anomaly});
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Error",
    });
  }



// THIS IS FOR TESTING ONLY!!!!!!!!!

// // Your JSON data
// const jsonData = {
//   "data": [
//     {"usd_amt": "2000.00", "transaction_id": 4, "average": "1000.00"},
//     {"usd_amt": "2000.00", "transaction_id": 8, "average": "1000.50"},
//     {"usd_amt": "2000.00", "transaction_id": 12, "average": "1000.00"},
//     {"usd_amt": "2000.00", "transaction_id": 16, "average": "1000.50"},
//     {"usd_amt": "2000.00", "transaction_id": 20, "average": "1000.00"},
//     {"usd_amt": "25.00", "transaction_id": 24, "average": "56.00"},
//     {"usd_amt": "90.00", "transaction_id": 28, "average": "62.00"},
//     {"usd_amt": "25.00", "transaction_id": 4, "average": "55.00"},
//     {"usd_amt": "25.00", "transaction_id": 8, "average": "67.50"},
//     {"usd_amt": "50.00", "transaction_id": 12, "average": "60.00"},
//     {"usd_amt": "70.00", "transaction_id": 16, "average": "62.50"},
//     {"usd_amt": "80.00", "transaction_id": 20, "average": "66.00"},
//     {"usd_amt": "25.00", "transaction_id": 24, "average": "56.00"},
//     {"usd_amt": "921210.00", "transaction_id": 28, "average": "2162.00"}
//   ],
//   "error": false,
//   "message": "History fetched successfully"
// };

});




router.get('/dashboard',async (req, res) => {
  try {

    // only USD_amt will be considered to ensure consistency when detecting anomaly

    const history = await Transaction.findAll({
      attributes: ['usd_amt', 'transaction_id', 'is_top_up', 'sender_id'],
      where: {
        [Op.and]: [,

          {
            is_top_up: false
          }
          ,],
      },
      
      order: [['transaction_date', 'ASC']],
    });

    // Extract the plain data from Sequelize instances
    const jsonData = history.map(transaction => transaction.get({ plain: true }));


    // Create an object to store user data
    const userTransactions = {};

    // Loop through all data and group by sender
    jsonData.forEach((transaction) => {
      var { sender_id, usd_amt, transaction_id, is_top_up } = transaction;
      
      if (!userTransactions[sender_id]) {
        userTransactions[sender_id] = [];
      }

      userTransactions[sender_id].push({
        usd_amt,
        transaction_id,
        is_top_up,
      });
    });


    // Here, i make the grouped data into a list of JSON Object
const userList = Object.entries(userTransactions).map(([sender_id, transactions]) => ({
    sender_id,
    transactions,
  }));


  records = []
 
  // Loop through each user in userList
userList.forEach((user) => {
  var result = {};
  var { sender_id, transactions, transaction_id } = user;

  for (let i = 0; i < transactions.length; i++) {
    let sum = 0;
    let count = 0;

    for (let j = i; j >= 0 && j > i - 5; j--) {
      sum += parseFloat(transactions[j].usd_amt);
      count++;
    }
    
    var average = sum / count;
    transactions[i].average = average.toFixed(2);
    transactions[i].userId = sender_id

  }
  const usd_amt = transactions.map((transaction) => parseFloat(transaction.usd_amt));
  const avg_amt = transactions.map((transaction) => parseFloat(transaction.average));


  const data = [];

  for (let i = 0; i < usd_amt.length; i++) {
    data.push([usd_amt[i], avg_amt[i]]);
  }

  const forest = new IsolationForest();
  forest.fit(data);

  for (let i = 0; i < usd_amt.length; i++) {
    var anomaly = false;

    // if >=0.8 is an anomaly.

    if (forest.scores()[i]>=0.8) {
      anomaly= true;
    }

    result[i] = {
      user: sender_id,
      amt: usd_amt[i],
      avg_amt: avg_amt[i],
      scores: forest.scores()[i],
      anomaly: anomaly
    };
  }
  records.push(result)

});


// Make and reorganize the output nicer for frontend
const usersData = [];

// records.forEach((userTransactions) => {
//   const userId = userTransactions['0'].user;
//   const transactions = [];

//   for (const key in userTransactions) {
//     if (Object.hasOwnProperty.call(userTransactions, key)) {
//       const transaction = userTransactions[key];
//       const { user, ...transactionData } = transaction;
//       transactions.push(transactionData);
//     }
//   }

//   user_info = await getUser(userId)
//   var username = user_info.username
//   var full_name = user_info.full_name

//   console.log(user_info)
 

//   const userObject = {
//     user_id: userId,
//     user_name: username,
//     full_name: full_name,
//     transactions: transactions,
//   };

//   usersData.push(userObject);
// });

// res.json({'results':usersData});



for (const userTransactions of records) {
  const userId = userTransactions['0'].user;
  const transactions = [];

  for (const key in userTransactions) {
    if (Object.hasOwnProperty.call(userTransactions, key)) {
      const transaction = userTransactions[key];
      const { user, ...transactionData } = transaction;
      transactions.push(transactionData);
    }
  }

  try {
    const user_info = await getUser(userId);
    var username = user_info.username;
    var full_name = user_info.full_name;


    const userObject = {
      user_id: userId,
      user_name: username,
      full_name: full_name,
      transactions: transactions,
    };

    usersData.push(userObject);
  } catch (error) {


  }
}

res.json({ 'results': usersData });



  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Error",
    });
  }

});




async function getUser(userId) {

  try {
    const userInfo = await User.findOne({
        attributes: ['username',  'full_name'],
        where: {
            user_Id: userId
        }
    });
    if (!userInfo) {
      return 'Error'
    }

    else{
      username = userInfo
    }
  } catch (error) {

    return 'Error'
  }

  return username;


}




module.exports = router;
