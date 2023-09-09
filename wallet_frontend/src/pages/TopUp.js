

import React, { useRef, useState, useEffect } from 'react';
import { Button, TextField, Typography, Container, Box, Avatar, FormControl, Snackbar } from '@mui/material';
import Logo from '../assets/tiktokLogo.png';

export default function TopUp() {
  const amountRef = useRef(null);

  const [currency, setCurrency] = useState(''); // Default currency is set to SGD
  const [toastOpen, setToastOpen] = useState(false);

  const handleToastClose = () => {
    setToastOpen(false);
  };

  const handleTopUp = async () => {
    const amount = amountRef.current.value;
    const token = window.localStorage.getItem('authtoken')

    // console.log(token)

    // fetch('http://localhost:3000/transaction/topup', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': 'Bearer ' + token
    //     },
    //     body: JSON.stringify({
    //       "topup_amount": amount
    //     })
    //   })

    fetch('http://localhost:3000/checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: [{id: Number(amount), quantity: 1}] }),
    }).then(res => { 
      if (res.ok) return res.json()
    }).then(({ url }) => {
      // console.log(url)
      window.location = url
    }).then(
      fetch('http://localhost:3000/transaction/topup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          "topup_amount": amount
        })
      }
      )
    )
  };

  useEffect(() => { 
    if (window.localStorage.getItem("authtoken") === null) { 
      window.location.href = '/Login'
    }
    const queryParams = new URLSearchParams(window.location.search);
    const statusParam = queryParams.get('status');
    // console.log(statusParam)
    if (statusParam === 'success') { 
      setToastOpen(true)
    }

    const userDetailsJSON = window.localStorage.getItem("userDetails");
    if (userDetailsJSON) {
        const userDetails = JSON.parse(userDetailsJSON);
        setCurrency(userDetails.default_currency)
    }
  }, [])

  return (
      <Container component="main" maxWidth="xs">
        <Box
          style={{
            marginTop: '40%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main', color: 'black' }}>
            <Box component="img" src={Logo} height={40}></Box>
          </Avatar>
          <Typography component="h1" variant="h5">
            Wallet Top Up
          </Typography>
          <div
            style={{
              width: '100%',
              marginTop: '8px'
            }}
          >
            <form>
              <FormControl fullWidth variant="outlined">
                <TextField
                  name="currency"
                  required
                  fullWidth
                  id="currency"
                  label="Currency"
                  autoFocus
                  variant="outlined"
                  value={currency}
                  inputRef={amountRef}
                  disabled
                  margin='normal'
                />
                <TextField
                  autoComplete="amount"
                  name="amount"
                  required
                  fullWidth
                  id="amount"
                  label="Top Up Amount"
                  autoFocus
                  variant="outlined"
                  inputRef={amountRef}
                  type="number"
                  margin='normal'
                />
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
            </FormControl>
          </form>
        </div>
        <Snackbar
            open={toastOpen}
            autoHideDuration={2000}
            onClose={handleToastClose}
            message="Top up successful"
            style={{ marginBottom: '120px' }}
        />
        </Box>
      </Container>
  );
}