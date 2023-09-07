import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography, Link, Dialog, DialogTitle, Table, TableRow, TableCell, TableBody } from '@mui/material';
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
  const [expand, setExpand] = React.useState(false);

  const handleClickOpen = () => {
    setExpand(true);
  };

  const handleClose = () => {
    setExpand(false);
  };

  function txnType() { 
    const userId = window.localStorage.getItem("userId"); 
    if (props.suspicious) { 
        return "suspicious"
    }
    else if (props.transaction.is_top_up) { 
        return "topup"
    } else if (userId === props.transaction.sender_id) { 
        return "sender"
    } else if (userId === props.transaction.receiver_id) { 
        return "receiver"
    } 
  }

  function dateTimeToTime(datetimeString) { 
    const dateTime = new Date(datetimeString);
    const timeInAMPM = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    return timeInAMPM
  }

  return (
    <Box marginX={2} paddingY={2} sx={{ borderBottom: '1px solid', borderColor: 'primary.light' }}>
        <Dialog
            open={expand}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="lg" // Set the maximum width to "lg" to make it wider
            fullWidth // Make the dialog take up full width
        >
            <DialogTitle id="alert-dialog-title" marginX={'auto'}>
                {"Transaction Details"}
            </DialogTitle>
            <Box textAlign={'center'}>
                {txnType() === 'sender' &&
                    <Typography variant='h3'>
                        {props.transaction.senderInfo.default_currency}{props.transaction.sender_amount}
                    </Typography>
                }
                {txnType() !== 'sender' && 
                    <Typography variant='h3'>
                        {props.transaction.receiverInfo.default_currency}{props.transaction.receiver_amount}
                    </Typography>
                }
            </Box>
            <Box marginTop={4} marginBottom={2} width="90%" marginX="auto">
                <Table aria-label="simple table" width={'100%'}>
                <TableBody>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { borderBottom: '1px solid', borderColor: 'primary.light' } }}>
                        <TableCell component="th" scope="row"><b>Type</b></TableCell>
                        <TableCell align="left">{props.transaction.is_top_up ? 'Top Up' : txnType() === 'sender' ? 'Payment' : 'Receive'}</TableCell>
                    </TableRow>
                    {txnType() !== 'topup' &&
                        <TableRow>
                            <TableCell component="th" scope="row"><b>Sender</b></TableCell>
                            <TableCell align="left">{props.transaction.senderInfo.full_name} ({props.transaction.senderInfo.username})</TableCell>
                        </TableRow>          
                    }
                    <TableRow>
                        <TableCell component="th" scope="row"><b>Recipient</b></TableCell>
                        <TableCell align="left">{props.transaction.receiverInfo.full_name} ({props.transaction.receiverInfo.username})</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row"><b>Date</b></TableCell>
                        <TableCell align="left">{props.transaction.transaction_date.split("T")[0]}</TableCell>
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { borderBottom: 'none' } }}>
                        <TableCell component="th" scope="row"><b>Time</b></TableCell>
                        <TableCell align="left">{dateTimeToTime(props.transaction.transaction_date)}</TableCell>
                    </TableRow>

                </TableBody>
                </Table>
            </Box>
        </Dialog>
        <Link style={linkStyle} onClick={handleClickOpen}> {/* TODO: ADD THE HREF LINK */}

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
                        {txnType() !== 'sender' &&
                            <b>+{props.transaction.receiver_amount}</b>
                        }
                        {txnType() === 'sender' &&
                            <b>-{props.transaction.sender_amount}</b>
                        }
                    </Typography>
                </Box>
            </Box>
        </Link>
    </Box>
  );
}
export default TransactionLine;
