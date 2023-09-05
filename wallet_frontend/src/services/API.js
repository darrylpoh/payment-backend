import axios from 'axios';

var baseUrl = 'http://localhost:3000'

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