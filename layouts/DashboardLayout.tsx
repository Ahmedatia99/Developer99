import { Button } from "components/atoms/Button";
import { Heading } from "components/atoms/Heading";
import { AuthTypes, useAuthGuard } from "hooks/useAuthGuard";
import { useRouter } from "next/router";
interface DashboardLayoutProps {
    title: string;
    children: any;
}

export default function DashboardLayout({ title, children }: DashboardLayoutProps) {
    const { push } = useRouter()
    const { info } = useAuthGuard(AuthTypes.User)
    
    return (
        <main className="min-h-screen flex flex-col justify-center px-5 container">
            <h3 className="capitalize text-3xl text-eclipse mt-20">Hi, {info.first_name}</h3>
            <header className="sticky top-0 bg-hero flex gap-20 z-10 justify-between items-center">
                <Heading style={{ textTransform: 'capitalize' }}>
                    {title}
                </Heading>
                <Button onClick={() => push('/')} style={{ width: '200px' }}>New track</Button>
            </header>
            <div>
                {children}
            </div>
        </main>
    )
}

