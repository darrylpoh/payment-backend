import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { Typography, Link } from '@mui/material';
import AddCardIcon from '@mui/icons-material/AddCard';
import PaidIcon from '@mui/icons-material/Paid';
import BlockIcon from '@mui/icons-material/Block';

const linkStyle = {
    textDecoration: 'none', // Remove underline
    color: 'inherit',     // Use the default text color
  };

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

function TransactionLine(props) {

  return (
    <Box marginX={2} paddingY={2} sx={{ borderBottom: '1px solid', borderColor: 'primary.light' }}>
        <Link style={linkStyle} href="/Transaction"> {/* TODO: ADD THE HREF LINK */}
            <Box display={'flex'}>
                <Box marginY={"auto"}>
                    {props.transaction.status === 'failed' && 
                        <BlockIcon color='primary'/>
                    }
                    {props.transaction.amount < 0 && props.transaction.status !== 'failed' && 
                        <PaidIcon color='secondary'/>
                    }
                    {props.transaction.amount > 0 && props.transaction.status !== 'failed' && 
                        <AddCardIcon color='tertiary'/>
                    }
                </Box>
                <Box marginLeft={2} flexGrow={1}>
                    <Typography variant='body1'>{props.transaction.status === 'failed' ? '[Failed] ' : ""}{props.transaction.amount < 0 ? 'Payment' : 'Top up'}</Typography>
                    <Typography variant='body2'>{props.transaction.fullName} ({props.transaction.username})</Typography>
                    <Typography variant='body2'>{props.transaction.date.split("-")[2] + " " + monthMap[props.transaction.date.split("-")[1]] + " " + props.transaction.date.split("-")[0]}</Typography>
                </Box>
                <Box marginRight={2} marginY={"auto"}>
                    <Typography 
                        variant="p" 
                        color={props.transaction.status === 'failed' ? 'primary' : props.transaction.amount < 0 ? 'secondary' : 'tertiary.main'} 
                        sx={{ fontWeight: 'bold' }} 
                        style={props.transaction.status === 'failed' ? { textDecoration: 'line-through' } : {}}
                    >
                        {props.transaction.amount.toFixed(2)}
                    </Typography>
                </Box>
            </Box>
        </Link>
    </Box>
  );
}
export default TransactionLine;
