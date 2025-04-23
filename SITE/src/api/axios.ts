import axios from "axios";

const api = axios.create({
    baseURL:'/api',
    headers:{
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
});
export default api;