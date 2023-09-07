import {React, useEffect, useState} from 'react';
import {Stack, Chip, Box} from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TransactionLine from '../components/TransactionLine';
import { getAllTransactions, getSuspiciousDashboard } from '../services/API';


export default function Susipicious() {
  const [transactions, setTxn] = useState([]); 

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
    getSuspiciousDashboard()
        .then(response => { 
            console.log(response.data)
        })
        .catch(error => { 
            console.log(error.message)
        })
        
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

  return (
    <Container component="main" maxWidth="xs">
      <Box paddingBottom={16}>
        <Box textAlign={"center"} marginY={2}>
            <Typography variant='h5' color='primary.main' display={'block'}>Suspicious Activity</Typography>
        </Box>
            {transactions.map((transaction) => (
                <TransactionLine 
                    transaction={transaction} 
                    date={transaction.transaction_date.split("T")[0]}
                    // suspicious={true}
                />
            ))}
      </Box>
    </Container>
  );
}