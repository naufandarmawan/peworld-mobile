import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.RN_API_URL
})

api.interceptors.request.use(function (config) {
    // Do something before request is sent
    const getToken = async () => {
        const token = await AsyncStorage.getItem('token');
        return token
    };

    const token = getToken()

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


export default api