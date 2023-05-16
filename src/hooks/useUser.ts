import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/configs/firebase";
import {useEffect, useRef, useState} from "react";
import {useSnapshot} from "valtio";
import {userProxy} from "@/store/user.proxy";
import {WEBSOCKET_URL} from "@/common/constant";
import {msgInfo} from "@/common/msg";

const useUser = () => {
    const {user, logout} = useSnapshot(userProxy)
    const [authState] : any = useAuthState(auth)
    const wsRef = useRef<WebSocket>()

    useEffect(() => {
        wsRef.current = new WebSocket(WEBSOCKET_URL);
        wsRef.current.onopen = () => console.log("websocket opened");
        wsRef.current.onclose = () => console.log("websocket closed");
        const ws = wsRef.current;

        return () => {
            ws.close();
        };
    }, []);

    useEffect(() => {
        if (!wsRef.current) return
        wsRef.current.onmessage = (event) => {
            if (!authState) return
            const message = JSON.parse(event.data);
            console.log(message);
            if (message && user.email !== message.email)
                msgInfo(`${message.email} shared: ${message.title}`)
        }
    },[authState])

    useEffect(() => {
        if (authState && authState.accessToken) {
            userProxy.login = {email: authState.email, refreshToken: authState.refreshToken, accessToken: authState.accessToken}
        }
        else {
            if (user.email) logout()
        }
    },[authState])
}

export default useUser