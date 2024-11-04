import { Heading } from "components/atoms/Heading";
interface AuthLayoutProps {
    title: string;
    children: JSX.Element | JSX.Element[];
}

export default function AuthLayout({ title, children }: AuthLayoutProps) {

    return (
        <div className="w-screen min-h-screen bg-hero flex justify-center items-center">
            <div className="bg-white w-[700px] min-w-fit  h-auto rounded-2xl flex flex-col justify-center items-center py-12 px-5 sm:px-8">
                <Heading style={{ padding: '10px' }}>{title}</Heading>
                <div className="mx-auto w-full max-w-[500px]">
                    {children}
                </div>
            </div>
        </div>
    )
}