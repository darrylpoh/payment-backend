import * as React from 'react';
import { Avatar, Button, TextField, Link, Box, Typography, Container, Snackbar } from '@mui/material';
import Logo from '../assets/tiktokLogo.png';
import { firebaseAuth } from '../services/firebase';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { requestOTP } from '../services/API';

export default function Login() {
    const [toastOpen, setToastOpen] = React.useState(false);

    const handleToastClose = () => {
      setToastOpen(false);
    };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginEmail = data.get('email')
    let loginData = {
      email: loginEmail,
      password: data.get('password'),
    };
    // const response = loginUser(loginData)
    // console.log(response)
    signInWithEmailAndPassword(firebaseAuth, loginData.email, loginData.password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // console.log(user);
            if (loginEmail.includes("@test.com")) { 
                window.localStorage.setItem('testAccount', true)
                window.localStorage.setItem('authtoken', user.accessToken)
                window.localStorage.setItem('userId', user.uid)
                window.location.href = "/LoginOTP"
            } else { 
                requestOTP(loginEmail)
                .then(response => { 
                    // console.log(response)
                    window.localStorage.setItem("verification_key", response.Details)
                    window.localStorage.setItem("email", loginEmail)
                    window.localStorage.setItem('authtokentemp', user.accessToken)
                    window.localStorage.setItem('userIdtemp', user.uid)
                    window.location.href = "/LoginOTP"
                })
                .catch(error => { 
                    console.log(error.message)
                })
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // console.log(errorCode, errorMessage)
            setToastOpen(true);
        });
  };

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
                color='secondary'
            >
                Get email OTP
            </Button>
        </Box>
        <Link href="/Register">
            <Typography variant="p">Register for a new account</Typography>
        </Link>
        <Link href="/ChangePassword">
            <Typography variant="p">Forget password</Typography>
        </Link>
        <Snackbar
            open={toastOpen}
            autoHideDuration={2000}
            onClose={handleToastClose}
            message="Email or password is invalid"
            style={{ marginBottom: '120px' }}
        />
    </Box>
    </Container>
  );
}