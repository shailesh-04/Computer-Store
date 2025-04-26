import axios from "axios";
const accessToken = localStorage.getItem("accessToken");
const api = axios.create({
    baseURL: '/api',
    headers: {
        authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
});
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === "ECONNABORTED") {
            alert("Request Timeout: Server took too long to respond.");
        } else if (!error.response) {
            alert("Network Error: Server is unreachable.");
        }
        console.error(error.response.data.message || error.response.data);
        console.error(error.response.data || error.response);
        return Promise.reject(error.response);
    }
);
export default api;