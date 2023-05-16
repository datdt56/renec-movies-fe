import dynamic from "next/dynamic";

const VideoList = dynamic(() => import("../components/VideoList"), {ssr:false})
export default function Home() {
  return <VideoList/>
}
