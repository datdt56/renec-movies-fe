import {API_KEY} from "./constant";
import {trim} from "lodash";

export const getYoutubeDetail = async (videoId) => {
    try {
        const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`)
        const data = await res.json()
        if (data?.items[0]?.snippet)
            return data?.items[0]?.snippet
        return null
    }catch (e) {
        return Promise.reject(e)
    }
}