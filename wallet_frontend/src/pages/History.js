import {React, useEffect, useState} from 'react';
import {Stack, Chip, Box} from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TransactionLine from '../components/TransactionLine';
import { getAllTransactions } from '../services/API';


export default function History() {
  const transactionHardcode = [ 
    {"transactionId": "T004", "username": "username2", "fullName": "Darryl", "amount": -1.20, "date": "2023-08-01", "status": "success"},
    {"transactionId": "T003", "username": "username1", "fullName": "Bernice","amount":  -6.50, "date": "2023-09-02", "status": "success"},
    {"transactionId": "T002", "username": "username1", "fullName": "Bernice","amount":  8.00, "date": "2023-09-01", "status": "failed"},
    {"transactionId": "T001", "username": "username3", "fullName": "Wei Bin","amount":  -3.20, "date": "2023-08-03", "status": "failed"},
    {"transactionId": "T005", "username": "username3", "fullName": "Wei Bin","amount":  12.40, "date": "2023-09-02", "status": "success"},
  ]

  const [transactions, setTxn] = useState([]); 
  const [transactionsCleaned, setTxnCleaned] = useState({}); 
  const [txnMonths, setTxnMonths] = useState([]); 
  const [cashFlowFilter, setCashFlowFilter] = useState('all'); 
  
  const monthMap = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December',
  };

  const handleCashFlowFilter = (statusUpdate) => { 
    setCashFlowFilter(statusUpdate);
  }

  function txnType(transaction) { 
    console.log(transaction)
    const userId = window.localStorage.getItem("userId"); 
    if (transaction.is_top_up) { 
        return "topup"
    } else if (userId === transaction.sender_id) { 
        return "sender"
    } else if (userId === transaction.receiver_id) { 
        return "receiver"
    } 
  }

  useEffect(() => {

    console.log(window.localStorage.getItem('authtoken'))
    getAllTransactions(window.localStorage.getItem('authtoken'))
      .then(response => { 
        console.log(response)
        setTxn(response.data)
      })
      .catch(error => { 
        console.log(error.message)
      })
    
  }, [])

  useEffect(() => { 
    transactions.sort((a, b) => {
      // Convert the date strings to Date objects for comparison
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
    
      // Compare the dates in descending order (latest to earliest)
      return dateB - dateA;
    });
    var transactionsCleanedTemp = {}
    var transactionsMonthTemp = []
    // TODO: need to filter away transactions where user is not sender and not recipient 
    for (const txn of transactions) { 
      console.log(txn)
      if (cashFlowFilter !== "all") { 
        if ((cashFlowFilter === "in" && txnType(txn) === "sender") || (cashFlowFilter === "out" && txnType(txn) !== "sender")) { 
          continue
        }
      }
      var monthYear = txn.transaction_date.split("T")[0].slice(0, -3);
      if (!transactionsMonthTemp.includes(monthYear)) {
        transactionsMonthTemp.push(monthYear)
      }
      if (monthYear in transactionsCleanedTemp) { 
        transactionsCleanedTemp[monthYear].push(txn); 
      } else { 
        transactionsCleanedTemp[monthYear] = [txn]; 
      }
    }
    setTxnCleaned(transactionsCleanedTemp)
    transactionsMonthTemp.sort((a, b) => {
      // Compare the strings as dates
      const dateA = new Date(a + '-01');
      const dateB = new Date(b + '-01');
    
      return dateB - dateA; // Sort in descending order
    });
    setTxnMonths(transactionsMonthTemp)
  }, [cashFlowFilter, transactions])

  return (
    <Container component="main" maxWidth="xs">
      <Box paddingBottom={12}>
        <Box textAlign={"center"} marginY={2}>
            <Typography variant='h5' color='primary.main' display={'block'}>Transaction History</Typography>
        </Box>

        {/* <Typography marginTop={2} variant='h6' color='primary.main' display={'block'}>all Transactions</Typography> */}
        <Box sx={{ borderBottom: '1px solid', borderTop: '1px solid', borderColor: 'primary.light' }}>
          <Stack direction="row" spacing={1} marginY={2} alignItems="center">
            <Typography variant="body2">Cash flow: </Typography>
            <Chip label="All" variant={cashFlowFilter === "all" ? 'filled' : 'outlined'} onClick={() => handleCashFlowFilter('all')} />
            <Chip label="Money In" variant={cashFlowFilter === "in" ? 'filled' : 'outlined'} onClick={() => handleCashFlowFilter('in')} />
            <Chip label="Money Out" variant={cashFlowFilter === "out" ? 'filled' : 'outlined'} onClick={() => handleCashFlowFilter('out')} />
          </Stack>
        </Box>

        {txnMonths.map((monthYear) => (
            <Box marginBottom={4}>
              <Typography marginTop={2} variant='h6' color='primary.main' display={'block'}>{monthMap[monthYear.split("-")[1]] + " " + monthYear.split("-")[0]}</Typography>
              {transactionsCleaned[monthYear].map((transaction) => (
                <TransactionLine 
                  transaction={transaction} 
                  date={transaction.transaction_date.split("T")[0]}
                />
              ))}
            </Box>
        ))}
      </Box>
    </Container>
  );
}