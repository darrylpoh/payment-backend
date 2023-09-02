import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { Typography, Link } from '@mui/material';
import AddCardIcon from '@mui/icons-material/AddCard';
import PaidIcon from '@mui/icons-material/Paid';

const linkStyle = {
    textDecoration: 'none', // Remove underline
    color: 'inherit',     // Use the default text color
  };

function TransactionLine(props) {

  return (
    <Box marginX={2} paddingY={2} sx={{ borderBottom: '1px solid', borderColor: 'primary.light' }}>
        {props.transaction[3] < 0 && 
            <Link style={linkStyle}> {/* TODO: ADD THE HREF LINK */}
                <Box display={'flex'}>
                    <Box marginY={"auto"}>
                        <PaidIcon color='secondary'/>
                    </Box>
                    <Box marginLeft={2} flexGrow={1}>
                        <Typography variant='body1'>Payment</Typography>
                        <Typography variant='body2'>{props.transaction[2]} ({props.transaction[1]})</Typography>
                    </Box>
                    <Box marginRight={2} marginY={"auto"}>
                        <Typography variant="p" color={"secondary"} sx={{ fontWeight: 'bold' }}>{props.transaction[3].toFixed(2)}</Typography>
                    </Box>
                </Box>
            </Link>
        }
        {props.transaction[3] > 0 && 
            <Link style={linkStyle}> {/* TODO: ADD THE HREF LINK */}
                <Box display={'flex'}>
                    <Box marginY={"auto"}>
                        <AddCardIcon color='tertiary'/>
                    </Box>
                    <Box marginLeft={2} flexGrow={1}>
                        <Typography variant='body1'>Top up</Typography>
                        <Typography variant='body2'>{props.transaction[2]} ({props.transaction[1]})</Typography>
                    </Box>
                    <Box marginRight={2} marginY={"auto"}>
                        <Typography variant="p" color={"tertiary.main"} sx={{ fontWeight: 'bold' }}>{props.transaction[3].toFixed(2)}</Typography>
                    </Box>
                </Box>
            </Link>
        }
    </Box>
  );
}
export default TransactionLine;
