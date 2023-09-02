import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TransactionLine from '../components/TransactionLine';

const transactions = [ 
    ["T005", "username3", "Wei Bin", 12.4],
    ["T004", "username2", "Darryl", -1.2],
    ["T003", "username1", "Bernice", -6.50],
    ["T002", "username1", "Bernice", 8.00],
    ["T001", "username3", "Wei Bin", -3.20]
]

export default function History() {
  return (
    <Container component="main" maxWidth="xs">
        <Box textAlign={"center"} marginY={2}>
            <Typography variant='h5' color='primary.main' display={'block'}>Transaction History</Typography>
        </Box>

        <Typography marginTop={2} variant='h6' color='primary.main' display={'block'}>All Transactions</Typography>

        {transactions.map((transaction) => (
            <TransactionLine transaction={transaction}/>
        ))}
    </Container>
  );
}