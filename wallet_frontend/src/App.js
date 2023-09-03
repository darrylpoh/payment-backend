import React from "react";
import "./App.css";
import Footer from "./components/Footer";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import TopUp from "./pages/TopUp";
import Atm from "./pages/Atm"
import History from "./pages/History";
import Profile from "./pages/Profile";
import Transfer from "./pages/transfer";
import { createTheme, ThemeProvider } from "@mui/material";

function App() {
    return (
        <ThemeProvider theme={theme}>
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/Login" element={<Login />} />
                <Route exact path="/Transfer" element={<Transfer/>} />
                <Route exact path="/History" element={<History />} />
                <Route exact path="/TopUp" element={<TopUp />} />
                <Route exact path="/Atm" element={<Atm />} />
                <Route exact path="/Profile" element={<Profile />} />
            </Routes>
            <Footer />
        </Router>
        </ThemeProvider>
    );
}

const theme = createTheme({
    // typography: {
    //   fontFamily: 'Your-Selected-Font, sans-serif', // Replace 'Your-Selected-Font' with your font name
    // },

    palette: {
        primary: {
            light: "#E0E0E0",
            main: "#040404",
            contrastText: "#FDFDFD",
        },
        secondary: {
            light: "#DE8C9D",
            main: "#FE2858",
            contrastText: "#FDFDFD",
        },
        tertiary: { 
            light: "#2af0ea",
            main: "#397684",
            contrastText: "#FDFDFD",
        },
        white: { 
          light: "#FDFDFD",
          main: "#FDFDFD",
          contrastText: "#040404",
        },

        // bernice: did not edit the below colour palette from my OOP project
        success: {
            light: "#A5DEB8",
            main: "#70C18C",
            contrastText: "#FFFFFF",
        },
        danger: {
            light: "#EBB4B4",
            main: "#EB8C8C",
            contrastText: "#FFFFFF",
        },
        warning: {
            light: "#F6DEAF",
            main: "#F4CC7E",
        },
        info: {
            light: "#A7E8F1",
            main: "#57B9C6",
            contrastText: "#FFFFFF",
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
  },
);

export default App;
