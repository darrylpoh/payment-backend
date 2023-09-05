import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Logo from '../assets/tiktokLogo.png';
import { firebaseAuth } from '../services/firebase';
import {  signInWithEmailAndPassword   } from 'firebase/auth';

export default function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // window.location.href = "/LoginOTP"
    const data = new FormData(event.currentTarget);
    let loginData = {
      email: data.get('email'),
      password: data.get('password'),
    };
    // const response = loginUser(loginData)
    // console.log(response)
    signInWithEmailAndPassword(firebaseAuth, loginData.email, loginData.password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user.accessToken;
            // navigate("/home")
            console.log(user);
            window.localStorage.setItem('authtoken', user)
            window.location.href = "/LoginOTP"
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
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
            Login to TikTok Wallet
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Get email OTP
            </Button>
        </Box>
        <Link href="/Register">
            <Typography variant="p">Register for a new account</Typography>
        </Link>
        or
        <Link href="/ChangePassword">
            <Typography variant="p">Forget password</Typography>
        </Link>
    </Box>
    </Container>
  );
}