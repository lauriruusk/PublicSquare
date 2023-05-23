import axios from 'axios';
const url = 'http://localhost:5433';

const logUser = async (credentials) => {
    const request = await axios.post((url+'/login'), credentials);
    return request.data.token;
}

const logAdmin = async (credentials) => {
    console.log('admin attempt received!');
    console.log(credentials)
    const request = await axios.post((url+'/admin'), credentials).catch(e => {
        console.log(e.message)
    });
    console.log('axios ohi')
    try {
        return request.data.token;

    }catch (e){
        console.log(e.message)
    }
}

const regUser = async (credentials) => {
    console.log('received!');
    const request = await axios.post((url+'/register'), credentials).catch(e => {
        console.log(e.message)
    });
    try {
        return request.data.token;
    } catch (e) {
        throw e;
    }
    
}

export {logUser, logAdmin, regUser};