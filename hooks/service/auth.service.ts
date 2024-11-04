import { useRouter } from "next/router";
import { useDispatch } from 'react-redux';
import { login as userLogin, logout as userLogout, updateInfo } from 'store/user/user.slice'
import useService from "./useService";
export interface LoginProps {
    email: string;
    password: string;
}
export interface RegisterProps extends LoginProps {
    first_name: string;
    last_name: string;
}
export interface ResetPassProps {
    email: string;
}
export interface UpdatePass {
    token: string;
    password: string;
}

const useAuthService = () => {
    const { loading, request, finish } = useService('auth')
    const { loading: loadingUser, request: requestUser, finish: finishUser } = useService('users')
    const { push } = useRouter()
    const dispatch = useDispatch();

    const login = (payload: LoginProps) => request<LoginProps>({
        method: 'post', action: AuthAction.Login, payload: { identifier: payload.email, password: payload.password },
        error: {
            toast: (msg) => msg,
        },
        success: {
            handler: (data) => {
                localStorage.setItem('auth', data.jwt)
                dispatch(userLogin())
                dispatch(updateInfo(data.user))
                push('/dashboard/tracks')
            }
        }
    })

    const resetPass = (payload: ResetPassProps) => request<ResetPassProps>({
        method: 'post', action: AuthAction.ResetPass, payload,
        error: {
            toast: (msg) => msg,
        },
        success: {
            handler: () => {
                push('/auth/login')
            }
        }
    })

    const updatePass = (payload: UpdatePass) => request<UpdatePass>({
        method: 'post', action: AuthAction.UpdatePass, payload: {code: payload.token, password: payload.password, passwordConfirmation: payload.password},
        error: {
            toast: (msg) => msg,
        },
        success: {
            handler: () => {
                push('/auth/login')
            }
        }
    })

    const logout = (redirect = true) => request({
        method: 'post', action: AuthAction.Logout,
        success: {
            handler: () => {
                dispatch(userLogout())
                redirect && push('/')
            }
        }
    })

    // Get user details
    const me = () => requestUser({
        action: AuthAction.Me,
        success: {
            handler: (data: any) => {
                if (!data) return;
                dispatch(userLogin())
                dispatch(updateInfo(data))
            }
        },
        error: {
            handler: () => {
                logout(false)
            },
            // toast: (msg) => msg,
        },
    })

    const register = (payload: RegisterProps, successCb?: Function) => {
        const generateUserName = () => {
            if(!payload.first_name.trim().length || !payload.last_name.trim().length) return `${Math.random()}`.slice(-10)
            return `${payload.first_name}${payload.last_name}${`${Math.random()}`.slice(-2)}`
        }

        return (
            request<RegisterProps>({
                method: 'post', action: AuthAction.Register, payload: {...payload, username: generateUserName()},
                error: {
                    toast: (msg) => msg
                },
                success: {
                    toast: () => 'Account is created',
                    handler: (data) => {
                        dispatch(updateInfo(data))
                        successCb && successCb()
                        push('/auth/login')
                    }
                }
            })
        )
    }

    return { loading, loadingUser, finishUser, login, resetPass, updatePass, register, me, logout, push, finish }
}

export enum AuthAction {
    Me = 'me',
    Login = 'local',
    Register = 'local/register',
    ResetPass = 'forgot-password',
    UpdatePass = 'reset-password',
    Logout = 'logout',
}

export enum LoginProvider {
    Github = 'Github',
    Google = 'Google',
}
export default useAuthService