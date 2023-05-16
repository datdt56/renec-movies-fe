import React from "react";
import {useCollectionData} from "react-firebase-hooks/firestore"
import {videosCollRef} from "@/configs/firebase";
import {Spin} from "antd";
import VideoItem from "@/components/VideoItem";

const VideoList : React.FC = () => {
    const [list, loading, error] = useCollectionData(videosCollRef)
    if (error)
        return <h1 className={'font-extrabold'}>
            {error.toString()}
    </h1>
    return <Spin spinning={loading}>
            {
                (list || []).map((item : any, index: number) => <VideoItem key={index} youtubeId={item.youtubeId} email={item.email} />)
            }
        </Spin>
}

export default VideoList