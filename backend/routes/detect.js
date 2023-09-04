const { Op } = require('sequelize');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const express = require('express');
const router = express.Router();
const { IsolationForest } = require('isolation-forest');

// Auth is not done yet

router.get('/detect', async (req, res) => {
  const userId = 'xIpAIQpOUjedRqprzfuLDNRS0pN2'; // Replace with the desired user ID later on

  try {

    // only USD_amt will be considered to ensure consistency when detecting anomaly

    const history = await Transaction.findAll({
      attributes: ['usd_amt', 'transaction_id'],
      where: {
        [Op.or]: [{ sender_id: userId }],
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

// Initialize Isolation Forest
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



module.exports = router;
