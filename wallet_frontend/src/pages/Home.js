import { React, useEffect, useState } from 'react';
import { Button, Link, Typography, Box, Card } from '@mui/material';
import AddCardIcon from '@mui/icons-material/AddCard';
import PaidIcon from '@mui/icons-material/Paid';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContactlessIcon from '@mui/icons-material/Contactless';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import TransactionLine from '../components/TransactionLine';
import { getAllTransactions, getWalletByUser } from '../services/API';

const features = [
    [<AddCardIcon fontSize='large' color='secondary' />, 'Top Up'], 
    [<PaidIcon fontSize='large' color='secondary' />, 'Transfer'], 
    [<ContactlessIcon fontSize='large' color='secondary' />, 'Atm'],
    [<ReceiptLongIcon fontSize='large' color='secondary' />, 'History'],  
  ];

export default function Home() {
    const [transactions, setTxn] = useState([]); 
    const [balance, setBalance] = useState(""); 
    const [suggRecipients, setSuggRecipients] = useState([]); 

    useEffect(() => {
        if (window.localStorage.getItem("authtoken") === null) { 
            window.location.href = '/Login'
        }
        getAllTransactions(window.localStorage.getItem('authtoken'))
          .then(response => { 
            const transactions = response.data 
            // response.data.sort((a, b) => {
            //     // Convert the date strings to Date objects for comparison
            //     const dateA = new Date(a.date);
            //     const dateB = new Date(b.date);
            
            //     // Compare the dates in descending order (latest to earliest)
            //     return dateB - dateA;
            // });
            setTxn(transactions.slice(0, 5)); // Slice the array to the first 5 elements

            const userId = window.localStorage.getItem("userId")
            var recipientsCount = {} 
            var recipientIdToFullname = {}
            for (const transaction of transactions) { 
                if (transaction.sender_id === userId) { 
                    var recipient = transaction.receiverInfo
                    if (recipient.user_id in recipientsCount) { 
                        recipientsCount[recipient.user_id] += 1 
                    } else { 
                        recipientsCount[recipient.user_id] = 1 
                        recipientIdToFullname[recipient.user_id] = recipient.full_name
                    }
                }
            }

            const entries = Object.entries(recipientsCount);
            entries.sort((a, b) => b[1] - a[1]);

            var top3recipients = []
            for (const entry of entries.slice(0,3)) { 
                top3recipients.push(recipientIdToFullname[entry[0]])
            }
            setSuggRecipients(top3recipients)
          })
          .catch(error => { 
            console.log(error.message)
            window.location.href = '/Login'
          })
        getWalletByUser(window.localStorage.getItem('authtoken'))
          .then(response => { 
            setBalance(response.data.balance)
          })
          .catch(error => {
            console.log(error.message)
          })
      }, [])

  function getCurrency() { 
    if (window.localStorage.getItem("authtoken") === undefined) { 
        window.location.href = '/Login'
    }
    const userDetailsJSON = window.localStorage.getItem("userDetails");
    if (userDetailsJSON) {
        const userDetails = JSON.parse(userDetailsJSON);
        return userDetails.default_currency
    }
    return ""
  }

  return (
    <Box display={"flex"} flexDirection={"column"} paddingBottom={16}>
        <Box sx={{backgroundColor:"primary.main"}} height={200}/>
        <Box sx={{
            marginTop: '-110px', // Adjust as needed to align with the box's height
            fontSize: '24px',   // Adjust font size as needed
            fontWeight: 'bold', // Adjust font weight as needed
        }} marginLeft={2}>
            <Typography variant='body2' color={'white.main'}>Account balance:</Typography>
            <Typography variant='h3' color={'white.main'}>{getCurrency()} {balance}</Typography> 
        </Box>
        <Box marginX={2} marginTop={2}>
            <Card variant="outlined">
                <Box
                    display={"flex"}
                    justifyContent={"space-around"}
                    height={120}
                >
                    {features.map((feature) => (
                        <Box flexDirection='column' display='flex' alignItems={'center'} marginY={'auto'}>
                            <Button
                                href={window.localStorage.getItem('authtoken') ? '/' + feature[1].replace(/ /g, '').replace('Home', '') : '/Login'}
                                key={feature[1].replace(/ /g, '')}
                            >
                                {feature[0]}
                            </Button>
                            <Typography variant='caption' color='secondary.main' display={'block'}>{feature[1]}</Typography>
                        </Box>
                    ))}
                </Box>
            </Card>
        </Box>
        <Box marginX={2} marginTop={2}>
            <Typography variant='h6' color='primary.main' display={'block'}>Suggested Recipients</Typography>
            <Card variant="outlined">
                <Box
                    display={"flex"}
                    justifyContent={"space-around"}
                    height={120}
                >
                    {suggRecipients.length === 0 && 
                        <Box marginY={'auto'}>
                            <Typography variant='p'>No suggested recipients</Typography>
                        </Box>
                    }
                    {suggRecipients.map((recipient) => (
                        <Box flexDirection='column' display='flex' alignItems={'center'} marginY={'auto'}>
                            <Button
                                href={'/' + recipient[0].replace(/ /g, '').replace('Home', '')} // TODO: CHANGE THE HREF LINK 
                                key={recipient[0].replace(/ /g, '')}
                            >
                                <AccountCircleIcon fontSize='large' color='tertiary'/>
                            </Button>
                            <Typography variant='caption' color='tertiary.main' display={'block'}>{recipient}</Typography>
                        </Box>
                    ))}
                </Box>
            </Card>
        </Box>
        <Box marginX={2} marginTop={2}>
            <Typography variant='h6' color='primary.main' display={'block'}>Recent Transactions</Typography>
            <Card variant="outlined">
                <Box justifyContent={"space-evenly"}>
                    {transactions.length === 0 && 
                        <Box height={120} display={'flex'}>
                            <Box margin={'auto'} textAlign={'center'}>
                                <Typography variant='p' marginY={'auto'}>No transactions</Typography>
                            </Box>
                        </Box>
                    }
                    {transactions.map((transaction) => (
                        <TransactionLine transaction={transaction} date={transaction.transaction_date.split("T")[0]}/>
                    ))}
                    {transactions.length !== 0 && 
                        <Link href='/History'>
                            <Box marginY={1} display={"flex"} justifyContent={'center'}>
                                <Typography variant="p" color={"primary"}>See more</Typography>
                                <NavigateNextIcon marginY={"auto"}/>
                            </Box>
                        </Link>
                    }
                </Box>
            </Card>
        </Box>
    </Box>
  );
}