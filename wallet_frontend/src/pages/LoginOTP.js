import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import Logo from '../assets/tiktokLogo.png';
import { MuiOtpInput } from 'mui-one-time-password-input'
import { getUser, verifyOTP } from '../services/API';

export default function LoginOTP() {
  const [toastOpen, setToastOpen] = React.useState(false);

  const handleToastClose = () => {
    setToastOpen(false);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (window.localStorage.getItem('testAccount')) { 
      getUser(window.localStorage.getItem('authtoken')) 
      .then(response => { 
          // console.log(response)
          const userDetailsJSON = JSON.stringify(response.data);
          window.localStorage.setItem("userDetails", userDetailsJSON)
          // console.log(userDetailsJSON)
          window.localStorage.removeItem('testAccount')
          window.location.href = '/';
      })
      .catch(error => {
          console.log(error.message)
      })
    } else {
      const data = new FormData(event.currentTarget)
      // console.log(data, otp)
      let verificationDetails = { 
        verification_key: window.localStorage.getItem("verification_key"), 
        otp: parseInt(otp), 
        check: window.localStorage.getItem("email")
      }
      // console.log(verificationDetails)
      verifyOTP(verificationDetails)
        .then(response => { 
          // console.log(response)
          if (response.status) { 
            let authtoken = window.localStorage.getItem("authtokentemp")
            window.localStorage.setItem("authtoken", authtoken)
            window.localStorage.setItem("userId", window.localStorage.getItem("userIdtemp"))
            window.localStorage.removeItem("verification_key")
            window.localStorage.removeItem("email")
            window.localStorage.removeItem("authtokentemp")
            window.localStorage.removeItem("userIdtemp")
            getUser(authtoken) 
              .then(response => { 
                  // console.log(response)
                  const userDetailsJSON = JSON.stringify(response.data);
                  window.localStorage.setItem("userDetails", userDetailsJSON)
                  // console.log(userDetailsJSON)
                  window.location.href = '/';
              })
              .catch(error => {
                  console.log(error.message)
              })
          } else { 
            setToastOpen(true)
          }
        })
        .catch(error => { 
          console.log(error.message )
        })
    }

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
        marginTop: '55%',
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
        <MuiOtpInput length={6} value={otp} name={'otp'} onChange={handleChange} marginY={6} marginX={'auto'} /> 
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 4, mb: 2 }}
            color='secondary'
        >
            Continue
        </Button>
        </Box>
        <Snackbar
            open={toastOpen}
            autoHideDuration={2000}
            onClose={handleToastClose}
            message="OTP failed, please try again"
            style={{ marginBottom: '120px' }}
        />
    </Box>
    </Container>
  );
}