import axios from 'axios';
const url = 'http://localhost:3001';

const logUser = async (credentials) => {
    const request = await axios.post((url+'/login'), credentials);
    return request.data.token;
}

const logAdmin = async (credentials) => {
    console.log('received!');
    const request = await axios.post((url+'/admin'), credentials);
    return request.data.token;
}

const regUser = async (credentials) => {
    console.log('received!');
    const request = await axios.post((url+'/register'), credentials);
    return request.data.token;
}

export {logUser, logAdmin, regUser};