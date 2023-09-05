import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography, Link } from '@mui/material';
import AddCardIcon from '@mui/icons-material/AddCard';
import PaidIcon from '@mui/icons-material/Paid';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';

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

  function txnType() { 
    const userId = window.localStorage.getItem("userId"); 
    if (props.transaction.is_top_up) { 
        return "topup"
    } else if (userId === props.transaction.sender_id) { 
        return "sender"
    } else if (userId === props.transaction.receiver_id) { 
        return "receiver"
    } 
  }

  return (
    <Box marginX={2} paddingY={2} sx={{ borderBottom: '1px solid', borderColor: 'primary.light' }}>
        <Link style={linkStyle} href="/Transaction"> {/* TODO: ADD THE HREF LINK */}
            <Box display={'flex'}>
                <Box marginY={"auto"}>
                    {txnType() === "topup" && props.transaction.status !== 'failed' && 
                        <AddCardIcon color='tertiary'/>
                    }
                    {txnType() === "sender" && props.transaction.status !== 'failed' && 
                        <PaidIcon color='secondary'/>
                    }
                    {txnType() === "receiver" && props.transaction.status !== 'failed' && 
                        <PriceCheckIcon color='tertiary'/>
                    }
                </Box>
                <Box marginLeft={2} flexGrow={1}>
                    <Typography variant='body1'>{props.transaction.is_top_up ? 'Top Up' : txnType() === 'sender' ? 'Payment' : 'Receive'}</Typography>
                    {txnType() === 'sender' &&
                        <Typography variant='body2'>
                            {props.transaction.receiverInfo.full_name} ({props.transaction.receiverInfo.username})
                        </Typography>
                    }
                    {txnType() === 'receiver' &&
                        <Typography variant='body2'>
                            {props.transaction.senderInfo.full_name} ({props.transaction.senderInfo.username})
                        </Typography>
                    }
                    <Typography variant='body2'>{props.date.split("-")[2] + " " + monthMap[props.date.split("-")[1]] + " " + props.date.split("-")[0]}</Typography>
                </Box>
                <Box marginRight={2} marginY={"auto"}>
                    <Typography 
                        variant="p" 
                        color={txnType() === 'sender' ? 'secondary' : 'tertiary.main'} 
                    >
                        {(txnType() === 'receiver' || txnType() === 'topup') &&
                            <b>+{props.transaction.receiver_amount}</b>
                        }
                        {txnType() === 'sender' &&
                            <b>-{props.transaction.amount}</b>
                        }
                    </Typography>
                </Box>
            </Box>
        </Link>
    </Box>
  );
}
export default TransactionLine;
