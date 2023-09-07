import { React, useEffect, useState } from 'react';
import { Avatar, Button, TextField, Box, Typography, Container, Snackbar } from '@mui/material';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
import Logo from '../assets/tiktokLogo.png';
import { validateUsername } from '../services/API';

export default function Transfer() {
  const exchangeRatesFromSGD = {
    'SGD': 1, 
    'USD': 0.74,
    'EUR': 0.69, 
    'GBP': 0.58,
    'JPY': 108.51, 
    'MYR': 3.43
  }

  const [amount, setAmount] = useState('');
  const [senderAmount, setSenderAmount] = useState(0);
  const [currency, setCurrency] = useState('SGD'); 
  const [currencyStatement, setCurrencyStatement] = useState(''); 
  const [recipient, setRecipient] = useState(''); 
  const [recipientCheck, setRecipientCheck] = useState(false); 
  const [toastOpen, setToastOpen] = useState(false);
  var senderCurrency
  const userDetailsJSON = window.localStorage.getItem("userDetails");
  if (userDetailsJSON) {
    const userDetails = JSON.parse(userDetailsJSON);
    senderCurrency = userDetails.default_currency
  }

  const handleToastClose = () => {
    setToastOpen(false);
  };

  function handleAmountChange(event) {
    const inputValue = event.target.value;
    if (/^\d+(\.\d{0,2})?$/.test(inputValue) || inputValue === '') {
      // Update the component state with the rounded value
      setAmount(inputValue);
      var tempSenderAmount = (parseFloat(inputValue) / exchangeRate()).toFixed(2)
      if (isNaN(tempSenderAmount)) { 
        tempSenderAmount = 0
      }
      setSenderAmount(tempSenderAmount)
    }
  };

  useEffect(() => { 
    console.log(senderAmount)
  }, [senderAmount])

  function handleSearchChange(event) { 
    setRecipient(event.target.value); 
  }

  function exchangeRate() { 
    const SGDtoFrom = exchangeRatesFromSGD[senderCurrency]
    const SGDtoTo = exchangeRatesFromSGD[currency]
    const fromToTo = (SGDtoTo / SGDtoFrom).toFixed(2);
    return fromToTo
  }

  useEffect(() => { 
    const exchRate = exchangeRate()
    const statement = "1 " + senderCurrency + " = " + exchRate + " " + currency
    setCurrencyStatement(statement)
  }, [currency])

  function checkRecipient() { 
    // TODO: call the API that returns a list of all usernames 
    var validUsername; 
    validateUsername(window.localStorage.getItem("authtoken"), recipient)
      .then(response => { 
        console.log(response.data)
        if (response.data.default_currency) { 
          validUsername = true;
          console.log(response.data.default_currency)
          setCurrency(response.data.default_currency)
        } else { 
          validUsername = false; 
          setToastOpen(true);
        }

        if (validUsername) { 
          setRecipientCheck(true); 
        } 
      })
      .catch(error => { 
        console.log(error.message)
        setToastOpen(true);
      })

    
  }

  useEffect(() => { 
    if (window.localStorage.getItem("authtoken") === null) { 
      window.location.href = '/Login'
    }
  }, [])

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
        <Box 
          component="form" 
          noValidate 
          sx={{ mt: 1 }} 
          onSubmit={(e) => {
              e.preventDefault();
              // Call backend to process payment/transfer later on
            }}
          >
          {/* <FormControl fullWidth margin='normal'>
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
          </FormControl> */}

          <TextField
            fullWidth
            label="Recipient"
            id="recipient"
            name="recipient"
            value={recipient}
            onChange={(event) => handleSearchChange(event)}
            margin="normal"
          />

          {!recipientCheck &&
            <Button fullWidth color='secondary' variant='contained' onClick={checkRecipient} sx={{ mt: 3, mb: 2,}}>
              Confirm Recipient
            </Button>
          }

          {recipientCheck && 
            <Box>
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
                onChange={(event) => handleAmountChange(event)}
                sx={{ width: '100%' }}
                step={0.01}
              />

              <Box textAlign={'center'}>
                <Typography variant='body1' color={'secondary.light'}>{currencyStatement}</Typography>
                <Typography variant='body1' color={'secondary.light'}>You are sending {senderCurrency} {senderAmount}</Typography>
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
          }
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
    <Snackbar
      open={toastOpen}
      autoHideDuration={2000}
      onClose={handleToastClose}
      message="Username does not exist"
      style={{ marginBottom: '120px' }}
    />
  </Container>
  );
}
