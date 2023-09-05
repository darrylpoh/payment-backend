import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
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

  const exchangeRatesFromSGD = {
    'SGD': 1, 
    'USD': 0.74,
    'EUR': 0.69, 
    'GBP': 0.58,
    'JPY': 108.51
  }

  const handleAmountChange = (event) => {
    const inputValue = event.target.value;
    if (/^\d*$/.test(inputValue) || inputValue === '') {
      setAmount(inputValue);
    }
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

        <Typography component="h1" variant="h5">
          Make a transfer
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <FormControl fullWidth margin='normal'>
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

          <Box textAlign={'center'}>
            <Typography variant='body1' color={'secondary.light'}>SGD 1 = SGD 1</Typography>
          </Box>
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
            Transfer
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



</Box>


    </Container>
  );
}
