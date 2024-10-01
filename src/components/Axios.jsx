import axios from 'axios';
import Router from '../Router';

const Axios = axios.create({
    baseURL : process.env.REACT_APP_BASE_URL,
    withCredentials : true
});

Axios.interceptors.request.use((config)=>{
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

Axios.interceptors.response.use(response=>{
    return response;
},error=>{
    if(error.response && error.response === 401){
        Router.navigate('/login');
        return error;
    }
    throw error;
})


export default Axios