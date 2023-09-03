import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Logo from '../assets/tiktokLogo.png';

export default function ChangePassword() {
  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.href = "/Profile"
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

  return (
    <Container component="main" maxWidth="xs">
    <Box
        sx={{
        marginTop: '45%',
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
            Change password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Old password"
                type="password"
                id="password"
                autoComplete="current-password"
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="newpassword"
                label="New password"
                type="password"
                id="newpassword"
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="cfmpassword"
                label="Confirm new password"
                type="cfmpassword"
                id="cfmpassword"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Change password
            </Button>
        </Box>
    </Box>
    </Container>
  );
}