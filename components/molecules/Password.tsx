import classNames from "classnames";
import TextInput from "components/atoms/inputs/TextInput";
import Link from "next/link";
import { useState } from "react";
import { HTMLAttributes } from "react"
interface PasswordProps extends HTMLAttributes<HTMLInputElement> {
    noForget?: boolean
}

export default function Password({ noForget, ...props }: PasswordProps) {
    const [show, setShow] = useState(false)

    return (
        <div>
            <TextInput
                type={show ? 'text' : 'password'}
                placeholder="Password"
                before={<i className="fa-solid fa-lock text-2xl" />}
                after={<i className={classNames("fa-regular cursor-pointer", show ? "fa-eye-slash" : "fa-eye")}
                    onClick={() => setShow(!show)} />}
                {...props} />

            {!noForget && <div className="text-right w-fit ml-auto mt-2 cursor-pointer hover:underline text-base">
                <Link href="/auth/reset-password">
                    Forget Password?
                </Link>
            </div>}
        </div>
    )
}