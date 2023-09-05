import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import AddCardIcon from '@mui/icons-material/AddCard';
import PaidIcon from '@mui/icons-material/Paid';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const pages = [
                [<HomeIcon fontSize='large' color='primary' />, 'Home'], 
                [<AddCardIcon fontSize='large' color='primary' />, 'Top Up'], 
                [<PaidIcon fontSize='large' color='primary' />, 'Transfer'], 
                [<ReceiptLongIcon fontSize='large' color='primary' />, 'History'],
                [<AccountCircleIcon fontSize='large' color='primary' />, 'Profile']
              ];


function Footer() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    alignItems: 'flex-start',
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(6),
    paddingRight: 0,
    paddingLeft: 0,
    // Override media queries injected by theme.mixins.toolbar
    '@media all': {
      height: 60,
    },
  }));


  return (
    <AppBar position="fixed" color="white" sx={{ top: 'auto', bottom: 0 }} height={90}>
      <Container maxWidth="xl">
        <StyledToolbar>
          <Box sx={{ flexGrow: 1, display: 'flex' }} marginTop={1}>
            {pages.map((page) => (
              
              <Button
                href={window.localStorage.getItem('authtoken') ? '/' + page[1].replace(/ /g, '').replace('Home', '') : '/Login'}
                key={page[1].replace(/ /g, '')}
                onClick={handleCloseNavMenu}
                sx={{ my: 0, mx: 0.45, color: 'white', display: 'block'}}
              >
                {page[0]}
              </Button>
            ))}
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
export default Footer;
