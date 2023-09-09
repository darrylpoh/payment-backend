import axios from 'axios';

var baseUrl = 'https://tiktok-otp-service.onrender.com'
var baseUrlOTP = 'http://ec2-13-250-13-188.ap-southeast-1.compute.amazonaws.com:4500/api/v1'

export async function createUser(userDetails) { 
    let api_url = baseUrl + "/user/register";
    try { 
        const response = await axios.post(api_url, userDetails); 
        console.log('response ', response); 
        return response.data;
    } catch(error) {
        return error; 
    }
}

export async function getUser(auth) { 
    let api_url = baseUrl + "/user";
    try { 
        const response = await axios.get(api_url, { 
            headers: {
                'Authorization': 'Bearer ' + auth
              }
        }); 
        console.log('response ', response); 
        return response.data; 
    } catch(error) { 
        return error; 
    }
}

export async function validateUsername(auth, username) { 
    let api_url = baseUrl + "/user/" + username; 
    try { 
        const response = await axios.get(api_url, { 
            headers: {
                'Authorization': 'Bearer ' + auth
              }
        }); 
        console.log('response ', response); 
        return response.data; 
    } catch(error) { 
        return error; 
    }
}

export async function getAllTransactions(auth) { 
    let api_url = baseUrl + "/transaction/history";
    try { 
        const response = await axios.get(api_url, { 
            headers: {
                'Authorization': 'Bearer ' + auth
              }
        }); 
        console.log('response ', response); 
        return response.data; 
    } catch(error) { 
        return error; 
    }
}

export async function getWalletByUser(auth) { 
    let api_url = baseUrl + '/wallet'; 
    try { 
        const response = await axios.get(api_url, { 
            headers: {
                'Authorization': 'Bearer ' + auth
              }
        }); 
        console.log('response ', response); 
        return response.data; 
    } catch(error) { 
        return error; 
    }
}

export async function getSuspiciousDashboard() { 
    let api_url = baseUrl + '/detect/dashboard'; 
    try { 
        const response = await axios.get(api_url); 
        console.log('response ', response); 
        return response.data; 
    } catch(error) { 
        return error; 
    }
}

export async function requestOTP(email) { 
    let api_url = baseUrlOTP + '/email/otp'; 
    try { 
        const response = await axios.post(api_url, {email: email}); 
        console.log('response ', response); 
        return response.data; 
    } catch(error) { 
        return error; 
    }
}

export async function verifyOTP(verificationDetails) { 
    let api_url = baseUrlOTP + '/verify/otp'; 
    try { 
        const response = await axios.post(api_url, verificationDetails); 
        console.log('response ', response); 
        return response; 
    } catch(error) { 
        return error; 
    }
}

export async function transferMoney(auth, transferDetails) { 
    let api_url = baseUrl + '/transaction/transfer'; 
    try { 
        const response = await axios.post(api_url, transferDetails, { 
            headers: {
                'Authorization': 'Bearer ' + auth
              }
        }); 
        console.log('response ', response); 
        return response; 
    } catch(error) { 
        return error; 
    }
}
