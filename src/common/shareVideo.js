import axios from "axios";
import {API_URL} from "./constant";
import {trim} from "lodash";

export const shareVideo = async (videoURL) => {
    try{
        if (!videoURL || !trim(videoURL)) {
            throw new Error("Please provide a video URL")
        }
        await axios.post(`${API_URL}/share-youtube-video`,{
            videoURL
        })
    }catch (e) {
        return Promise.reject(e)
    }
}