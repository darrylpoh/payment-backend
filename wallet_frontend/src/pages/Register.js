import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Logo from '../assets/tiktokLogo.png';

export default function Register() {
  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.href = "/Login"
//     const data = new FormData(event.currentTarget);
//     let loginData = {
//       email: data.get('email'),
//       password: data.get('password'),
//     };
//     generateToken(loginData) 
//       .then(response => { 
//         let token = response.data.token;
//         setToken(token)
//         window.location.href = '/';
//       })
//       .catch(error => { 
//         console.log(error.message);
//       })
  };

  const [dob, setDob] = React.useState(dayjs('2000-01-01'));

  return (
    <Container component="main" maxWidth="xs">
    <Box
        sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        }}
        paddingBottom={16}
        marginTop={10}
    >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main', color: 'black' }}>
            <Box component="img" src={Logo} height={40}></Box>
        </Avatar>
        <Typography component="h1" variant="h5">
            Sign up for a TikTok Wallet
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                autoFocus
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
            />
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
                fullWidth
                id="phonenum"
                label="Phone Number"
                name="phonenumber"
                autoComplete="phonenumber"
                autoFocus
            />
            <Box marginY={1}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateField']}>
                        <DateField
                            label="Date of Birth"
                            id="dob"
                            name="dob"
                            value={dob}
                            onChange={(newDob) => setDob(newDob)}
                            format="DD-MMM-YYYY"
                            required
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </Box>
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
            <TextField
                margin="normal"
                required
                fullWidth
                name="cfmpassword"
                label="Confirm Password"
                type="cfmpassword"
                id="cfmpassword"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Sign up
            </Button>
        </Box>
        <Link href="/Login">
            <Typography variant="p">Login to existing account</Typography>
        </Link>
    </Box>
    </Container>
  );
}