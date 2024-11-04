import AuthLayout from "layouts/AuthLayout";
import TextInput from "components/atoms/inputs/TextInput";
import Password from "components/molecules/Password";
import { Button } from "components/atoms/Button";
import Link from "next/link";
import { useState } from "react";
import useAuthService, { RegisterProps } from "hooks/service/auth.service";
import { AuthTypes, useAuthGuard } from "hooks/useAuthGuard";


export default function Register() {
    useAuthGuard(AuthTypes.Guest)
    const { loading, register } = useAuthService()
    const [form, setForm] = useState<RegisterProps>({ email: '', password: '', first_name: '', last_name: '' })
    const handleForm = (key: string) => (e: any) => setForm((v) => ({ ...v, [key]: e.target.value }))

    return (
        <AuthLayout title="Register">
            <div className="flex flex-col sm:flex-row gap-5 mt-12">
                <TextInput onChange={handleForm('first_name')} placeholder="First Name" before={<i className="fa-solid fa-user text-2xl" />} />
                <TextInput onChange={handleForm('last_name')} placeholder="Last Name" before={<i className="fa-solid fa-user text-2xl" />} />
            </div>
            <div className="flex flex-col gap-5 mt-5 mb-12">
                <TextInput onChange={handleForm('email')} placeholder="Email" before={<i className="fa-solid fa-envelope text-2xl" />} />
                <Password onChange={handleForm('password')} noForget />
            </div>
            <Button loading={loading} onClick={() => register(form)} style={{ maxWidth: '100%', height: '60px' }}>Register</Button>
            <p className="text-center mt-12 text-base sm:text-lg">Already have an account? <Link href='/auth/login' className="underline cursor-pointer">Log in</Link></p>
        </AuthLayout>
    )
}