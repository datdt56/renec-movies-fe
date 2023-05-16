import {Button, Input, InputRef} from "antd";
import React, {FormEventHandler, useMemo, useRef} from "react";
import {msgError, msgSuccess} from "@/common/msg"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, signOut
} from "@firebase/auth";
import {auth} from "@/configs/firebase";
import {userProxy} from "@/store/user.proxy";
import {useSnapshot} from "valtio";
import {useRouter} from "next/router";


const NavigationBar : React.FC = () => {
    const router = useRouter()
    const {user} = useSnapshot(userProxy)
    const emailRef = useRef<InputRef>(null)
    const passwordRef = useRef<InputRef>(null)
    const handleRegister : React.MouseEventHandler = async (event) => {
        event.preventDefault()
        const email = emailRef.current?.input?.value
        const password = passwordRef.current?.input?.value
        if (!email || !password) return msgError("email & password are required")
        try{
            await createUserWithEmailAndPassword(auth, email, password)
            msgSuccess("registered successfully")
        }catch (e:any) {
            if (e instanceof Error){
                if (e.message.includes('email-already-in-use'))
                    await handleLogin(email, password)
                else msgError("Failed to register. " + e.message)
            }
        }
    }
    const handleLogin = async (email: string, password: string) => {
        try{
            await signInWithEmailAndPassword(auth, email, password)
            msgSuccess("logged in successfully")
        } catch (e: any) {
            if (e instanceof Error)
                msgError("Failed to login. " + e.message)
        }
    }
    const handleLogout = async () => {
        try {
            await signOut(auth)
        }catch (e) {
            if (e instanceof Error)
                msgError(e.toString())
        }
    }
    return <div className={'flex flex-col md:flex-row items-center'}>
        {
            user?.email ? <>
                    <p className={"mx-1"}>
                        Welcome <span className={'font-bold'}>{user.email}</span>
                    </p>
                    <Button className={'m-1'} onClick={async () => {await router.push('/share')}}>Share a movie</Button>
                    <Button className={'m-1'} onClick={handleLogout}>Logout</Button>
            </>
            :
            <>
                <Input type="email" className={'m-1'} placeholder={'Email'} ref={emailRef}/>
                <Input type="password" className={'m-1'} placeholder={'Password'} ref={passwordRef}/>
                <Button className={'m-1'} onClick={handleRegister}>Login/Register</Button>
            </>

        }
    </div>
}

export default NavigationBar