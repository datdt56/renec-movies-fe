import React from "react";
import useYoutubeVideoData from "@/hooks/useYoutubeVideoData";
import {useWindowSize} from "react-use";

type Props = {
    youtubeId: string,
    email: string
}
const VideoItem : React.FC<Props> = ({youtubeId, email}: Props) => {
    const size = useWindowSize()
    const {data} = useYoutubeVideoData(youtubeId)
    const width = size.width > 1024 ? 640 : size.width * 0.8
    const height = width * 9 / 16

    return <div className={'w-full border-b-black flex justify-center items-center flex-wrap lg:items-start mx-auto my-1'}>
        <iframe
            width={width}
            height={height}
            className={'m-2'}
            src={`https://www.youtube.com/embed/${youtubeId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        />
        <div
            className={'flex-grow p-2 overflow-y-scroll'}
            style={{maxHeight: height + 'px', maxWidth: width}}
        >
            <p className={'text-red-400'}>{data?.title}</p>
            <p className={'font-bold'}>Shared by {email}</p>
            <p>Description: </p>
            <p>{data?.description}</p>
        </div>
    </div>
}

export default VideoItem