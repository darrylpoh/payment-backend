import React, { useEffect, useState } from 'react';
import {Typography,Box,TextField,Select,MenuItem,Autocomplete,Checkbox, FormGroup,FormControlLabel,Grid,Avatar,autocompleteClasses,Button} from '@mui/material';
import { Form } from "react-router-dom";
import { minWidth, width } from "@mui/system";

export default function MemberCreate() {
  const [matricNum, setMatricNum] = useState('1301938'); 
  const [studentDetails, setStudentDetails] = useState({ 
    matriculatedName: '',
    smuEmail: '',
    matricNum: '', 
    telegramUser: '',
    phoneNum: '',
  })

  const centerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

//   useEffect(() => { 
//     let tokenInfo = decodeToken(window.localStorage.getItem('authtoken'))
//     console.log(tokenInfo)
//     setMatricNum(tokenInfo.matricNum)
//     getStudentByMatric(tokenInfo.matricNum) 
//       .then(response => { 
//         console.log(response);
//         setStudentDetails(response)
//       })
//       .catch(error => { 
//         console.log(error.message); 
//       })
//   }, [])

  function logout() { 
    // deleteToken(); 
    window.location.href = '/'
  }

  return (
    <Box>
        
    </Box>

  )
}