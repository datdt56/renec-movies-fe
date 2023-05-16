import {API_KEY} from "./constant";
import {snapshot} from "valtio";
import {userProxy} from "@/store/user.proxy";
import axios from "axios";

export default async function() {
    const refreshToken = snapshot(userProxy).user.refreshToken
    if (!refreshToken) {
        userProxy.logout()
        return null;
    }
    try {
        const response = await axios.post(`https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,{
            grant_type : "refresh_token",
            refresh_token: refreshToken
        })
        userProxy.login = {accessToken: response.data.accessToken}
        return {
            accessToken: response.data.accessToken
        }
    } catch (e) {
        console.log(e)
        userProxy.logout()
        return null;
    }
}