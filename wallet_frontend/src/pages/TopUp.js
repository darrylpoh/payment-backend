import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const theme = createTheme({
  palette: {
    primary: {
      main: '#EE1D52'
    },
  },
});

export default function TopUp() {
  const handleTopUp = () => {
    // TODO handle topup
  };

  // TODO take from db
  const bankAccounts = [
    {
      type: 'Linked Bank Account',
      last4Digits: '5678',
    },
    {
      type: 'Savings Account',
      last4Digits: '9876',
    },
  ];

  const cards = [
    {
      type: 'Debit Card',
      last4Digits: '4321',
    },
    {
      type: 'Credit Card',
      last4Digits: '1234',
    },
  ];

  const [selectedCard, setSelectedCard] = React.useState(cards[0].type);
  const [selectedBankAccount, setSelectedBankAccount] = React.useState(bankAccounts[0].type);

  const handleCardChange = (event) => {
    setSelectedCard(event.target.value);
  };

  const handleBankAccountChange = (event) => {
    setSelectedBankAccount(event.target.value);
  };
    // TODO handle add new card and add new bank account
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
              <Typography variant="subtitle1" color="textSecondary" style={{ marginTop: '8px' }}>
                Current top-up method: {selectedCard === 'Linked Bank Account' ? 'Bank Account' : 'Debit Card'}: ****{selectedCard === 'Linked Bank Account' ? '5678' : '4321'}
              </Typography>
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
              <div style={{ marginTop: '16px' }}>
                <Typography variant="subtitle2">Change Top-Up Method</Typography>
                <FormControl fullWidth variant="outlined" style={{ marginTop: '8px' }}>
                  <InputLabel>Select Card</InputLabel>
                  <Select
                    value={selectedCard}
                    onChange={handleCardChange}
                    label="Select Card"
                  >
                    {cards.map((card, index) => (
                      <MenuItem key={index} value={card.type}>
                        {card.type}: ****{card.last4Digits}
                      </MenuItem>
                    ))}
                    <MenuItem value="AddNewCard">Add New Card</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth variant="outlined" style={{ marginTop: '8px' }}>
                  <InputLabel>Select Bank Account</InputLabel>
                  <Select
                    value={selectedBankAccount}
                    onChange={handleBankAccountChange}
                    label="Select Bank Account"
                  >
                    {bankAccounts.map((account, index) => (
                      <MenuItem key={index} value={account.type}>
                        {account.type}: ****{account.last4Digits}
                      </MenuItem>
                    ))}
                    <MenuItem value="AddNewBank">Add New Bank Account</MenuItem>
                  </Select>
                </FormControl>
              </div>
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
