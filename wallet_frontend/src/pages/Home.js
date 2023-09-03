import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper, Button, Link, Typography, Box, Card } from '@mui/material';
import AddCardIcon from '@mui/icons-material/AddCard';
import PaidIcon from '@mui/icons-material/Paid';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContactlessIcon from '@mui/icons-material/Contactless';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import TransactionLine from '../components/TransactionLine';

const features = [
    [<AddCardIcon fontSize='large' color='secondary' />, 'Top Up'], 
    [<PaidIcon fontSize='large' color='secondary' />, 'Transfer'], 
    [<ContactlessIcon fontSize='large' color='secondary' />, 'Atm'],
    [<ReceiptLongIcon fontSize='large' color='secondary' />, 'History'],  
  ];

const recipients = [ 
    ["username1", "Bernice"],
    ["username2", "Darryl"],
    ["username3", "Wei Bin"]
]

const transactions = [ 
    {"transactionId": "T004", "username": "username2", "fullName": "Darryl", "amount": -1.20, "date": "2023-08-01", "status": "success"},
    {"transactionId": "T003", "username": "username1", "fullName": "Bernice","amount":  -6.50, "date": "2023-09-02", "status": "success"},
    {"transactionId": "T002", "username": "username1", "fullName": "Bernice","amount":  8.00, "date": "2023-09-01", "status": "failed"},
    {"transactionId": "T001", "username": "username3", "fullName": "Wei Bin","amount":  -3.20, "date": "2023-08-03", "status": "failed"},
    {"transactionId": "T005", "username": "username3", "fullName": "Wei Bin","amount":  12.40, "date": "2023-09-02", "status": "success"},
  ]



export default function Home() {
  return (
    <Box display={"flex"} flexDirection={"column"} paddingBottom={16}>
        <Box sx={{backgroundColor:"primary.main"}} height={200}/>
        <Box sx={{
            marginTop: '-110px', // Adjust as needed to align with the box's height
            fontSize: '24px',   // Adjust font size as needed
            fontWeight: 'bold', // Adjust font weight as needed
        }} marginLeft={2}>
            <Typography variant='body2' color={'white.main'}>Account balance:</Typography>
            <Typography variant='h3' color={'white.main'}>$23.10</Typography> {/* TODO: HARDCODE */}
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
                                href={'/' + feature[1].replace(/ /g, '').replace('Home', '')} 
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
                    {/* TODO: HARDCODE */}
                    {recipients.map((recipient) => (
                        <Box flexDirection='column' display='flex' alignItems={'center'} marginY={'auto'}>
                            <Button
                                href={'/' + recipient[0].replace(/ /g, '').replace('Home', '')} // TODO: CHANGE THE HREF LINK 
                                key={recipient[0].replace(/ /g, '')}
                            >
                                <AccountCircleIcon fontSize='large' color='tertiary'/>
                            </Button>
                            <Typography variant='caption' color='tertiary.main' display={'block'}>{recipient[1]}</Typography>
                        </Box>
                    ))}
                </Box>
            </Card>
        </Box>
        <Box marginX={2} marginTop={2}>
            <Typography variant='h6' color='primary.main' display={'block'}>Recent Transactions</Typography>
            <Card variant="outlined">
                <Box justifyContent={"space-evenly"}>
                    {/* TODO: HARDCODE */}
                    {transactions.map((transaction) => (
                        <TransactionLine transaction={transaction}/>
                    ))}
                    <Link href='/History'>
                        <Box marginY={1} display={"flex"} justifyContent={'center'}>
                            <Typography variant="p" color={"primary"}>See more</Typography>
                            <NavigateNextIcon marginY={"auto"}/>
                        </Box>
                    </Link>
                </Box>
            </Card>
        </Box>
    </Box>
  );
}