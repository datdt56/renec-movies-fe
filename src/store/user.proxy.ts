import {User} from "@firebase/auth";
import {proxy} from "valtio";

type UserType = Partial<User & {accessToken: string}>


type UserProxyType = {
    user: UserType,
    login: UserType,
    logout: () => void,
    accessToken: string
}
export const userProxy = proxy<UserProxyType>({
    user: {},
    set login (data: UserType) {
        this.user = data
    },
    logout ()  {
        this.user = {}
    },
    get accessToken () {
        return this.user.accessToken || ""
    }
})