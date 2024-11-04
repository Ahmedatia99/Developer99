import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { server } from "server";

interface OnProps {
    toast?: (msg: string) => string,
    handler?: (data: any) => any
}

interface RequestProps<Payload> {
    method?: string;
    action: string;
    payload?: Payload | { [x: string]: any };
    success?: OnProps
    error?: OnProps
}

const useService = (prefix: string) => {
    const [loading, setLoading] = useState(false)
    const [finish, setFinish] = useState(false)

    async function request<Payload>({ method = 'get', action, payload, success, error }: RequestProps<Payload>) {
        setLoading(true)
        try {
            const res = await server()({
                method,
                url: `/${prefix}/${action}`,
                data: payload,
            })
            // Fire the Handler + Toast
            success?.handler && success?.handler(res.data)
            success?.toast && toast.success(success.toast(res.data), {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        } catch (e: any) {
            // Fire the Handler + Toast
            const readableErrMsg = e?.response?.data?.error?.details.errors?.[0]?.message.replaceAll('_', ' ') || ''
            const err = e?.response?.data?.error?.message || e?.response?.data?.message || readableErrMsg || 'Something went wrong, try again later'
            const errMsg = typeof err == 'string' ? err : err[0]
            error?.handler && error?.handler(e.response)
            error?.toast && toast.error(errMsg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })

        }
        setLoading(false)
        setFinish(true)
    }

    return { request, loading, finish }
}

export default useService