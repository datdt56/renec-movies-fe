import React from "react";
import {useRouter} from "next/router";
import dynamic from "next/dynamic";

const NavigationBar = dynamic(() => import("../components/NavigationBar"),{ssr: false})

const Layout : React.FC<any> = (props) => {
    const router = useRouter()
    return <div className={'w-full min-h-screen mx-auto bg-white grid'} style={{gridTemplateRows: "auto 1fr"}}>
        <div className={'w-full h-fit flex flex-col md:flex-row md:justify-between items-center border-b-2 border-b-black '}>
            <img
                src={'/img/logo.png'}
                className={'max-h-[100px] cursor-pointer'} alt={'funny-movies-log'}
                onClick={async () => {await router.push("/")}}
            />
            <NavigationBar/>
        </div>
        <div className={'flex w-full justify-center items-center p-1'}>
            { props.children }
        </div>
    </div>
}

export default Layout