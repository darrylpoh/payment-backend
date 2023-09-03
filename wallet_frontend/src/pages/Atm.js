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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Logo from '../assets/tiktokLogo.png';

export default function Atm() {
  const [amount, setAmount] = React.useState('');
  const [currency, setCurrency] = React.useState('SGD');
  const [recipient, setRecipient] = React.useState('');
  const [pendingRequests, setPendingRequests] = React.useState([
    {
      recipient: 'Jowett',
      amount: '5',
      currency: 'SGD',
      isCurrentUserRequest: false,
    },
    {
      recipient: 'Wei Bin',
      amount: '9',
      currency: 'USD',
      isCurrentUserRequest: false,
    },
    {
      recipient: 'Bernice',
      amount: '2',
      currency: 'JPY',
      isCurrentUserRequest: false,
    },
    {
      recipient: 'Yee Sen',
      amount: '250',
      currency: 'SGD',
      isCurrentUserRequest: false,
    },
    {
      recipient: 'Darryl',
      amount: '210',
      currency: 'SGD',
      isCurrentUserRequest: false,
    },
  ]);
  const [selectedRequest, setSelectedRequest] = React.useState(null);
  const [openChat, setOpenChat] = React.useState(false);
  const [chatMessage, setChatMessage] = React.useState('');

  const handleAmountChange = (event) => {
    const inputValue = event.target.value;
    if (/^\d*$/.test(inputValue) || inputValue === '') {
      setAmount(inputValue);
    }
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleRecipientChange = (event) => {
    setRecipient(event.target.value);
  };

  const handleRequestTransfer = () => {
    const newRequest = {
      recipient,
      amount,
      currency,
      isCurrentUserRequest: true,
    };
    setPendingRequests([...pendingRequests, newRequest]);
    setRecipient('');
    setAmount('');
    setCurrency('SGD');
  };

  const openChatDialog = (request) => {
    setSelectedRequest(request);
    setOpenChat(true);
  };

  const closeChatDialog = () => {
    setOpenChat(false);
    setSelectedRequest(null);
  };

  const handleSendMessage = () => {
    // TODO handle chat
    closeChatDialog();
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
          ATM Transfer
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>

          <FormControl fullWidth sx={{ mt: 2 }}>
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
            type="button"
            fullWidth
            color="secondary"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleRequestTransfer}
          >
            Request Transfer
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
          marginBottom: 0,
        }}
      >
        {/* ... (Additional fees message) ... */}

        <Typography variant="h6">Your Transfer Requests:</Typography>
        <ul>
          {pendingRequests
            .filter((request) => request.isCurrentUserRequest)
            .map((request, index) => (
              <li key={index}>
                You requested for: {request.amount} {request.currency}
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ml: 1 }}
                >
                  Status
                </Button>
              </li>
            ))}
        </ul>

        <Typography variant="h6">Transfer Requests Near You:</Typography>
        <ul>
          {pendingRequests
            .filter((request) => !request.isCurrentUserRequest)
            .map((request, index) => (
              <li key={index}>
                {request.recipient}: {request.amount} {request.currency}
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => openChatDialog(request)}
                  sx={{ml: 1 }}
                >
                  Chat
                </Button>
              </li>
            ))}
        </ul>
      </Box>

      {/* Chat Dialog */}
      <Dialog open={openChat} onClose={closeChatDialog}>
        <DialogTitle>Chat with {selectedRequest?.recipient}</DialogTitle>
        <DialogContent>
          {/* Display chat messages here */}
          <TextField
            margin="normal"
            required
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            label="Message"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeChatDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSendMessage} color="secondary" variant="contained">
            Send Message
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
