import {useEffect, useState} from "react";
import {getYoutubeDetail} from "@/common/getYoutubeDetail"
import {msgError} from "@/common/msg";

const useYoutubeVideoData = (videoId: string) => {
    const [data, setData] = useState<any>({})

    useEffect(() => {
        let fetchCheck = true
        const fetchData = async () => {
            const data = getYoutubeDetail(videoId)
            if (data && fetchCheck)
                setData(data)
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