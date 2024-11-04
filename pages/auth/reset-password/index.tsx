import AuthLayout from "layouts/AuthLayout"
import TextInput from "components/atoms/inputs/TextInput"
import { Button } from "components/atoms/Button"
import useAuthService, { ResetPassProps } from "hooks/service/auth.service"
import { useState } from "react"

export default function ResetPassword() {
    const { loading, resetPass } = useAuthService()
    const [form, setForm] = useState<ResetPassProps>({ email: '' })

    return (
        <AuthLayout title="Forget Password">
            <div className="flex flex-col my-12">
                <TextInput onChange={(e: any) => setForm({ email: e.target.value })} placeholder="Email" before={<i className="fa-solid fa-envelope text-2xl" />} />
            </div>
            <Button loading={loading} onClick={() => resetPass(form)} style={{ width: '100%', maxWidth: '100%', height: '60px' }}>Send</Button>
        </AuthLayout>
    )
}