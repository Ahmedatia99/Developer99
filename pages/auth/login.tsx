import AuthLayout from "layouts/AuthLayout";
// import { SocialButton } from "components/atoms/SocialButton";
import TextInput from "components/atoms/inputs/TextInput";
import Password from "components/molecules/Password";
import { Button } from "components/atoms/Button";
// import Divider from "components/atoms/Divider";
import Link from "next/link";
import { useState } from "react";
import { AuthTypes, useAuthGuard } from "hooks/useAuthGuard";
import useAuthService, { LoginProps } from "hooks/service/auth.service";

export default function Login() {
    useAuthGuard(AuthTypes.Guest)
    const { login, loading } = useAuthService()
    const [form, setForm] = useState<LoginProps>({ email: '', password: '' })
    const handleForm = (key: string, val: string) => setForm((v) => ({ ...v, [key]: val }))

    return (
        <AuthLayout title="Sign In">
            {/* <div className="flex flex-col justify-between gap-5 my-12">
                <SocialButton loginWith="google">
                    <i className="fa-brands fa-google text-2xl" />
                    Continue with Google
                </SocialButton>
                <SocialButton loginWith="github">
                    <i className="fa-brands fa-github text-2xl" />
                    Continue with Github
                </SocialButton>
            </div>
            <Divider text="Or sign in with" /> */}
            <div className="flex flex-col gap-5 my-12">
                <TextInput
                    placeholder="Email" before={<i className="fa-solid fa-envelope text-2xl" />}
                    onChange={(e) => handleForm('email', (e.target as any).value)}
                />
                <Password
                    onChange={(e) => handleForm('password', (e.target as any).value)}
                />
            </div>
            <Button loading={loading} onClick={() => login(form)} style={{ maxWidth: '100%', height: '60px' }}>
                Login
            </Button>
            <p className="text-center mt-12 text-base sm:text-lg">Don’t have an account? <Link href='/auth/register' className="underline cursor-pointer">Sign up</Link></p>
        </AuthLayout>
    )
}