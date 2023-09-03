import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Logo from '../assets/tiktokLogo.png';
import { MuiOtpInput } from 'mui-one-time-password-input'

export default function LoginOTP() {
  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.href = '/';
    // const data = new FormData(event.currentTarget);
    // let loginData = {
    //   email: data.get('email'),
    //   password: data.get('password'),
    // };
    // generateToken(loginData) 
    //   .then(response => { 
    //     let token = response.data.token;
    //     setToken(token)
    //     window.location.href = '/';
    //   })
    //   .catch(error => { 
    //     console.log(error.message);
    //   })
  };
  const [otp, setOtp] = React.useState('')

  const handleChange = (newValue) => {
    setOtp(newValue)
  }

  return (
    <Container component="main" maxWidth="xs">
    <Box
        sx={{
        marginTop: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        }}
    >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main', color: 'black' }}>
            <Box component="img" src={Logo} height={40}></Box>
        </Avatar>
        <Typography component="h1" variant="h5">
            OTP Verification
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        {/* TODO: not sure how to make this required */}
        <MuiOtpInput length={5} value={otp} onChange={handleChange} marginY={6} marginX={'auto'} /> 
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 4, mb: 2 }}
        >
            Continue
        </Button>
        </Box>
    </Box>
    </Container>
  );
}