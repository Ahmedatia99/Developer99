import LoadingScreen from "layouts/LoadingScreen";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux"
import { selectUser } from "store/user/user.slice"
import useAuthService from "./service/auth.service";

export enum AuthTypes {
    Guest = 'Guest',
    User = 'User',
}

export const useAuthGuard = (type: AuthTypes) => {
    const { push } = useRouter()
    const { isLogged, info } = useSelector(selectUser)
    useEffect(() => {
        if (type == AuthTypes.Guest && isLogged) push('/dashboard/tracks');
        else if (type == AuthTypes.User && !isLogged) push('/auth/login');
    }, [isLogged, push, type]);

    return { push, isLogged, info };
}

// Initialize user and set in redux
interface AuthInitProps {
    children?: JSX.Element | JSX.Element[] | any;
};
export const AuthInit = ({ children }: AuthInitProps) => {
    const { me, loadingUser, finishUser } = useAuthService()
    useEffect(() => {
        me()
    }, [])

    if (loadingUser) return <LoadingScreen />;
    return finishUser ? children : <></>
}
