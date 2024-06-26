import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { navigate } from './navigation';

const api = axios.create({
    baseURL: process.env.API_URL
})

api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

const refreshTokenRequest = async (refreshToken) => {
    try {
        const response = await axios.post(`${process.env.API_URL}/auth/refreshtoken`, { refreshToken });
        // console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        console.error('Refresh token error:', error);
        return null;
    }
};

// api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;
//         if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             const refreshToken = await AsyncStorage.getItem('refreshToken');
//             const newTokens = await refreshTokenRequest(refreshToken);
//             if (newTokens) {
//                 await AsyncStorage.setItem('token', newTokens.token);
//                 await AsyncStorage.setItem('refreshToken', newTokens.refreshToken);
//                 axios.defaults.headers.common['Authorization'] = `Bearer ${newTokens.token}`;
//                 return api(originalRequest);
//             }
//         }
//         return Promise.reject(error);
//     }
// );

api.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    async function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const originalRequest = error.config;

        const message = error.response?.data?.message;
        if (message === "Expired Token" && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = await AsyncStorage.getItem('refreshToken')
                const newTokens = await refreshTokenRequest(refreshToken);

                if (newTokens) {
                    await AsyncStorage.setItem('token', newTokens.token);
                    await AsyncStorage.setItem('refreshToken', newTokens.refreshToken);
                    originalRequest.headers.Authorization = `Bearer ${newTokens.token}`;
                    return api(originalRequest);
                }

                return api(originalRequest)
            } catch (error) {
                navigate('option-login');
                console.log(error);
            }
        }

        return Promise.reject(error);
    }
);


export default api