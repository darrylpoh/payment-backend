import {React, useEffect, useState} from 'react';
import {Box, Table, TableBody, TableRow, TableCell, TableHead} from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { getSuspiciousDashboard } from '../services/API';
import CheckIcon from '@mui/icons-material/Check';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export default function Susipicious() {
  const [results, setResults] = useState([]); 

  useEffect(() => {
    getSuspiciousDashboard()
        .then(response => { 
            console.log(response.results)
            setResults(response.results)
        })
        .catch(error => { 
            console.log(error.message)
        })
  }, [])

  return (
    <Container component="main" maxWidth="md">
        <Box textAlign={"center"} marginY={2}>
            <Typography variant='h5' color='primary.main' display={'block'}>Suspicious Activity</Typography>
        </Box>
            {results.map((result) => (
                <Box marginBottom={8}>
                    <Typography marginTop={2} variant='h6' color='primary.main' display={'block'}>{result.user_id}</Typography>
                    <Table aria-label="simple table">
                        <TableHead> 
                            <TableCell align="center"><b>Expected amount</b></TableCell>
                            <TableCell align="center"><b>Amount in Transaction</b></TableCell>
                            <TableCell align="center"><b>Check</b></TableCell>
                        </TableHead>
                        <TableBody>
                            {result.transactions.map((transaction) => (
                                <TableRow sx={{ '&:last-child td, &:last-child th': { borderBottom: '1px solid', borderColor: 'primary.light' }}}>
                                    <TableCell align="center">
                                        <Box color={transaction.anomaly ? 'secondary.main' : ""} fontWeight={transaction.anomaly ? 'bold' : ""}>
                                            {transaction.avg_amt}
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box color={transaction.anomaly ? 'secondary.main' : ""} fontWeight={transaction.anomaly ? 'bold' : ""}>
                                            {transaction.amt}
                                        </Box>
                                    </TableCell>
                                    {transaction.anomaly &&
                                        <TableCell align="center">
                                            <WarningAmberIcon color="secondary"/>
                                        </TableCell>
                                    }
                                    {!transaction.anomaly &&
                                        <TableCell align="center">
                                            <CheckIcon color="tertiary"/>
                                        </TableCell>
                                    }
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            ))}
    </Container>
  );
}