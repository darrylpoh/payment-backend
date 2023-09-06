
import React, { useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';

const theme = createTheme({
  palette: {
    primary: {
      main: '#EE1D52',
    },
  },
});

export default function TopUp() {
  const amountRef = useRef(null);

  const handleTopUp = async () => {
    const amount = amountRef.current.value;

    fetch('http://localhost:3000/checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: [{id: Number(amount), quantity: 1}] }),
    }).then(res => { 
      // console.log('test')
      if (res.ok) return res.json()
    }).then(({ url }) => {
      console.log(url)
      window.location = url
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '64px',
          }}
        >
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
              <FormControl fullWidth variant="outlined" style={{ marginTop: '16px' }}>
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
                />
              </FormControl>
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleTopUp}
              >
                Top Up
              </Button>
            </form>
          </div>
        </div>
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
    </ThemeProvider>
  );
}