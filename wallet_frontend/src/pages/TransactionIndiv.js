import {React} from 'react';
import {Box,Table, TableRow, TableCell, TableBody} from '@mui/material';
import Typography from '@mui/material/Typography';

export default function TransactionIndiv() {

  return (
    <Box
        sx={{
        marginTop: '45%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        }}
    >
      {/* TODO: THIS ENTIRE PAGE IS HARDCODE */}
      <Box textAlign={'center'}>
        <Typography variant='h3'>$23.10</Typography>
      </Box>
      <Box marginX={2} marginTop={4} width="80%">
        <Table aria-label="simple table">
          <TableBody>
              <TableRow sx={{ '&:last-child td, &:last-child th': { borderBottom: '1px solid', borderColor: 'primary.light' } }}>
                <TableCell component="th" scope="row"><b>Sender</b></TableCell>
                <TableCell align="left">Bernice (username1)</TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { borderBottom: '1px solid', borderColor: 'primary.light' } }}>
                <TableCell component="th" scope="row"><b>Recipient</b></TableCell>
                <TableCell align="left">Darryl (username2)</TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { borderBottom: '1px solid', borderColor: 'primary.light' } }}>
                <TableCell component="th" scope="row"><b>Date</b></TableCell>
                <TableCell align="left">8 September 2023</TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { borderBottom: '1px solid', borderColor: 'primary.light' } }}>
                <TableCell component="th" scope="row"><b>Status</b></TableCell>
                <TableCell align="left">Successful</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}