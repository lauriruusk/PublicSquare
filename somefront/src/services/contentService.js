/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const url = 'http://localhost:5432';

const getAll = () => {
    const request = axios.get(url)
    return request.then(response => response.data);
}

const getFiltered = ({fltr}) => {
    const request = axios.get(url, fltr);
    return request.then(response => response.data);
}

const addPub = async (props) => {
    const request = axios.post(url+'/addpub');
    return request.then(response => response.data);
}

export default {getAll, getFiltered};
