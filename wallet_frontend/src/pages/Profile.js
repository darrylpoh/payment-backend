import {React, useEffect, useState} from 'react';
import {Box, Avatar, Table, TableRow, TableCell, TableBody, Link} from '@mui/material';
import Typography from '@mui/material/Typography';
import Logo from '../assets/tiktokLogo.png';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const linkStyle = {
  textDecoration: 'none', // Remove underline
  color: 'inherit',     // Use the default text color
};

export default function TransactionIndiv() {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")

  function handleLogout() { 
    window.localStorage.removeItem('authtoken');
    window.localStorage.removeItem('userDetails');
    window.localStorage.removeItem('userId');
    window.location.href = '/Login'
  }

  useEffect(() => { 
    if (window.localStorage.getItem("authtoken") === null) { 
      window.location.href = '/Login'
    }
    const userDetailsJSON = window.localStorage.getItem("userDetails");
    if (userDetailsJSON) {
      const userDetails = JSON.parse(userDetailsJSON);
      setName(userDetails.full_name)
      setUsername(userDetails.username)
      setEmail(userDetails.email)
    }
  }, [])

  return (
    <Box
        sx={{
        marginTop: '45%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'primary.main', color: 'black' }}>
          <Box component="img" src={Logo} height={40}></Box>
      </Avatar>
      <Box marginX={2} marginTop={2} width="80%" style={{ overflow: "scroll" }}>
        <Table aria-label="simple table">
          <TableBody>
              <TableRow sx={{ '&:last-child td, &:last-child th': { borderBottom: '1px solid', borderColor: 'primary.light' } }}>
                <TableCell component="th" scope="row"><b>Full name</b></TableCell>
                <TableCell align="left">{name}</TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { borderBottom: '1px solid', borderColor: 'primary.light' } }}>
                <TableCell component="th" scope="row"><b>Username</b></TableCell>
                <TableCell align="left">{username}</TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { borderBottom: '1px solid', borderColor: 'primary.light' } }}>
                <TableCell component="th" scope="row"><b>Password</b></TableCell>
                <TableCell align="left">******</TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { borderBottom: '1px solid', borderColor: 'primary.light' } }}>
                <TableCell component="th" scope="row"><b>Email</b></TableCell>
                <TableCell align="left">{email}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
        <Link style={linkStyle} href='/ChangePassword'> {/* TODO: update href */}
            <Box paddingY={1} display={"flex"} alignItems={'center'} justifyContent={'space-between'} sx={{ borderBottom: '1px solid', borderColor: 'primary.light' }}>
                <Typography variant="caption" color={"tertiary.main"} marginLeft={2}>Change password</Typography>
                <Box marginRight={2}>
                  <NavigateNextIcon marginY={"auto"} color={"tertiary"}/>
                </Box>
            </Box>
        </Link>
        {/* <Link style={linkStyle} href='/ChangeEmail'>
            <Box paddingY={1} display={"flex"} alignItems={'center'} justifyContent={'space-between'} sx={{ borderBottom: '1px solid', borderColor: 'primary.light' }}>
                <Typography variant="caption" color={"tertiary.main"} marginLeft={2}>Change OTP email</Typography>
                <Box marginRight={2}>
                  <NavigateNextIcon marginY={"auto"} color={"tertiary"}/>
                </Box>
            </Box>
        </Link> */}
          <Box onClick={handleLogout} paddingY={1} display={"flex"} alignItems={'center'} justifyContent={'space-between'} sx={{ borderBottom: '1px solid', borderColor: 'primary.light' }}>
              <Typography variant="caption" color={"tertiary.main"} marginLeft={2}>Logout</Typography>
          </Box>
      </Box>
    </Box>
  );
}