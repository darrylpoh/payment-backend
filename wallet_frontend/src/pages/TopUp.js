import React, { useRef, useState } from 'react';
import { Button, TextField, Typography, Container, Box, Avatar, FormControl } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from '../assets/tiktokLogo.png';

const theme = createTheme({
  palette: {
    primary: {
      main: '#EE1D52',
    },
  },
});

export default function TopUp() {
  const amountRef = useRef(null);
  const [currency, setCurrency] = useState('SGD'); // Default currency is set to SGD

  const handleTopUp = async () => {
    const amount = amountRef.current.value;

    const cartItems = [
      { id: 'price_1NmoVaJPCXGVDWOfkKei0giE', quantity: parseInt(amount) },
    ];

    await fetch('http://localhost:3000/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity: amount, items: cartItems }),
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: '40%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main', color: 'black' }}>
          <Box component="img" src={Logo} height={40}></Box>
        </Avatar>

        <Typography component="h1" variant="h5" style={{ marginTop: '16px' }}>
          Top Up Your Card
        </Typography>
        <div
          style={{
            width: '100%',
            marginTop: '24px',
          }}
        >
          <form>
            <FormControl fullWidth variant="outlined">
              <TextField
                fullWidth
                label="Currency"
                id="currency"
                name="currency"
                value={currency}
                margin="normal"
                disabled
              />

              <TextField
                autoComplete="amount"
                name="amount"
                required
                fullWidth
                id="amount"
                label="Amount to top up"
                autoFocus
                variant="outlined"
                inputRef={amountRef}
                type="number"
                margin="normal"
              />
            </FormControl>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleTopUp}
              color='secondary'
            >
              Top Up
            </Button>
          </form>
        </div>
      </Box>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '32px',
        }}
      >
      </div>
    </Container>
  );
}
