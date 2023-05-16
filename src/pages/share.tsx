import {Button, Card, Input, Spin} from "antd";
import {useState} from "react";
import axios from "axios";
import {API_URL} from "@/common/constant";
import {msgError, msgSuccess} from "@/common/msg";

export default function Share() {
    const [loading, setLoading] = useState(false)
    const [videoURL, setVideoURL] = useState("")
    const handleShare = async () => {
        try {
            setLoading(true)
            await axios.post(`${API_URL}/share-youtube-video`,{
                videoURL
            })
            setVideoURL("")
            msgSuccess("shared successfully")
        }catch (e: any) {
            msgError(e.response?.data?.message || e.message)
        }finally {
            setLoading(false)
        }
    }
    return <Card title="Share a youtube movie"
                 className={'w-full max-w-[500px]'}
        >
        <Spin spinning={loading}>
            <div className={'flex flex-col items-center'}>
                <Input
                    type={'url'}
                    placeholder={'Youtube URL'}
                    value={videoURL}
                    onChange={(e) => {
                    setVideoURL(e.target.value)
                    }
                }/>
                <Button
                    className={'w-1/2 my-1'}
                    onClick={handleShare}
                >
                    Share
                </Button>
            </div>
        </Spin>
    </Card>
}