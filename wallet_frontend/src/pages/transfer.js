import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Logo from '../assets/tiktokLogo.png';

export default function Transfer() {
  const [amount, setAmount] = React.useState('');
  const [currency, setCurrency] = React.useState('SGD'); // Default currency is set to SGD

  const handleAmountChange = (event) => {
    const inputValue = event.target.value;
    if (/^\d*$/.test(inputValue) || inputValue === '') {
      setAmount(inputValue);
    }
  };



  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: '50px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main', color: 'black' }}>
          <Box component="img" src={Logo} height={40}></Box>
        </Avatar>

        <Typography component="h1" variant="h5">
          Make a transfer
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <FormControl fullWidth>
            <InputLabel id="recipient-label">Recipient</InputLabel>
            <Select
              labelId="recipient-label"
              id="recipient"
              name="recipient"
              label="Recipient"
              required
            >
              <MenuItem value="Yee Sen">Yee Sen</MenuItem>
              <MenuItem value="YS so handsome">YS so handsome</MenuItem>
              <MenuItem value="Jowett">Jowett</MenuItem>
              <MenuItem value="Bernice">Bernice</MenuItem>
              <MenuItem value="Darryl">Darryl</MenuItem>
              <MenuItem value="Weibin">Weibin</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth  sx={{ mt: 2 }}>
            <InputLabel id="currency-label">Currency</InputLabel>
            <Select
              labelId="currency-label"
              id="currency"
              name="currency"
              label="Currency"
              value={currency}
              onChange={handleCurrencyChange}
            >
              <MenuItem value="SGD">SGD</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="JPY">JPY</MenuItem>
              <MenuItem value="INR">INR</MenuItem>
              <MenuItem value="RUPIAH">RUPIAH</MenuItem>
            
            </Select>
          </FormControl>


          <TextField
            margin="normal"
            required
            fullWidth
            name="amount"
            label="Amount"
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            sx={{ width: '100%' }}
          />



          <Button
            type="submit"
            fullWidth
            color='secondary'
            variant="contained"
            sx={{ mt: 3, mb: 2,}}
            onClick={(e) => {
              e.preventDefault();
              // Call backend to process payment/transfer later on
            }}
          >
            Transfer now
          </Button>
        </Box>
      </Box>

      <Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 0, 
    marginBottom:0
  }}
>
  <Typography variant="caption" color="secondary">
    Additional fees may apply
  </Typography> 



</Box>


    </Container>
  );
}
