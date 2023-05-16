import {useEffect, useState} from "react";
import {API_KEY} from "@/common/constant";
import {msgError} from "@/common/msg";

const useYoutubeVideoData = (videoId: string) => {
    const [data, setData] = useState<any>({})

    useEffect(() => {
        let fetchCheck = true
        const fetchData = async () => {
            const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`)
            const data = await res.json()
            if (data?.items[0]?.snippet && fetchCheck)
                setData(data.items[0].snippet)
        }
        fetchData().then().catch(err => {
            msgError(err.message)
        })
        return () => {
            fetchCheck = false
        }
    },[videoId])
    return {data}
}

export default useYoutubeVideoData