import * as React from 'react';
import { Avatar, Button, TextField, Link, Box, Typography, Container, FormControl, InputLabel, Select, MenuItem, Snackbar } from '@mui/material';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import Logo from '../assets/tiktokLogo.png';
import { createUser } from '../services/API';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from '../services/firebase';

export default function Register() {

  const [dob, setDob] = React.useState(dayjs('2000-01-01'));
  const [currency, setCurrency] = React.useState('SGD');
  const [toastText, setToastText] = React.useState("");
  const [toastOpen, setToastOpen] = React.useState(false);

  const handleToastClose = () => {
    setToastOpen(false);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const data = new FormData(event.currentTarget);
    if (data.get('password') === "" || data.get('cfmpassword') === "" || data.get('name') === "" || data.get('username') === "" || data.get('email') === "" || data.get('dob') === "") { 
        setToastText("Please fill in required fields")
        setToastOpen(true);
    } else { 
        if (data.get('password') === data.get('cfmpassword')) { 
            let regData = {
                username: data.get('username'),
                email: data.get('email'),
                password: data.get('password'),
                full_name: data.get('name'),
                date_of_birth: data.get('dob'),
                phone_number: data.get('phonenumber'),
                default_currency: data.get('currency'),
              };
            console.log(regData);
              
            createUser(regData) 
                .then(response => { 
                    console.log(response)
                    window.location.href = '/Login'
                })
                .catch(error => { 
                    console.log(error.message)
                })
        } else { 
            setToastText("Passwords do not match")
            setToastOpen(true);
        }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
    <Box
        sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        }}
        paddingBottom={12}
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
            <TextField
                margin="normal"
                fullWidth
                id="tiktok"
                label="TikTok Username"
                name="tiktok"
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

            <Box marginTop={3} marginBottom={1}>
                <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-label">Wallet Currency</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={currency}
                        label="Wallet Currency"
                        name="currency"
                        onChange={handleCurrencyChange}
                        required
                    >
                        <MenuItem value={'SGD'}>SGD</MenuItem>
                        <MenuItem value={'USD'}>USD</MenuItem>
                        <MenuItem value={'EUR'}>EUR</MenuItem>
                        <MenuItem value={'GBP'}>GBP</MenuItem>
                        <MenuItem value={'JPY'}>JPY</MenuItem>
                    </Select>
                </FormControl>
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
                type="password"
                id="cfmpassword"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="secondary"
            >
                Sign up
            </Button>
        </Box>
        <Link href="/Login">
            <Typography variant="p">Login to existing account</Typography>
        </Link>
        <Snackbar
            open={toastOpen}
            autoHideDuration={2000}
            onClose={handleToastClose}
            message={toastText}
            style={{ marginBottom: '120px' }}
        />
    </Box>
    </Container>
  );
}