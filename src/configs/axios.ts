import axios from "axios";
import {snapshot} from "valtio";
import {userProxy} from "@/store/user.proxy";
import refreshToken from "@/common/refreshToken";

const axiosConfigs = () => {
    //REQUEST
    axios.interceptors.request.use(
        (config: any) => {
            const {accessToken} = snapshot(userProxy)
            if (accessToken) {
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }
            return config;
        },
        error => {
            if (error && error.request) {
            }
            return Promise.reject(error);
        });

    //RESPONSE
    axios.interceptors.response.use(
        function (response) {
            return response;
        },
        async function (error) {
            const originalRequest = error.config;
            if (!error.response || !error.response.data) {
                return Promise.reject(error)
            }
            const {status, data} = error.response
            if (status === 401 && data.code === 'auth/id-token-expired')
            {
                const result = await refreshToken()
                if (result) {
                    console.log('result', result)
                    originalRequest.headers['Authorization'] = `Bearer ${result.accessToken}`;
                    return axios(originalRequest)
                } else {
                    return Promise.reject(error)
                }

            }
            return Promise.reject(error);
        }
    );
}

export default axiosConfigs;