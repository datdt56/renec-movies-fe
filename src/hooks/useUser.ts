import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/configs/firebase";
import {useEffect} from "react";
import {useSnapshot} from "valtio";
import {userProxy} from "@/store/user.proxy";

const useUser = () => {
    const {user, logout} = useSnapshot(userProxy)
    const [authState] : any = useAuthState(auth)

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