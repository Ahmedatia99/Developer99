import AuthLayout from "layouts/AuthLayout"
import { Button } from "components/atoms/Button"
import Password from "components/molecules/Password"
import useAuthService from "hooks/service/auth.service"
import { useState } from "react"
import { useRouter } from "next/router"

export default function ResetPassword() {
    const { query } = useRouter()
    const { updatePass } = useAuthService()
    const [password, setPassword] = useState('')

    return (
        <AuthLayout title="New Password">
            <div className="flex flex-col my-12">
                <Password placeholder="New Password" onChange={(e: any) => setPassword(e.target.value)} noForget />
            </div>
            <Button onClick={() => updatePass({ password, token: query.token as string })} style={{ width: '100%', maxWidth: '100%', height: '60px' }}>Update</Button>
        </AuthLayout>
    )
}