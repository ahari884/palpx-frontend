import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'http://localhost:3001/api'
});

axiosConfig.interceptors.request.use( function(config) {
    const token = localStorage.getItem('access_token')
    config.headers.Authorization = token
    return config
})

axiosConfig.interceptors.response.use(response => {
    console.log('response', JSON.stringify(response))
    return response;
}, error => {
    console.log('Error', error)
    if(error?.response?.status === 401) {
        localStorage.clear()
        window.location.reload()
    }
    return Promise.reject(error)
})

export default axiosConfig
