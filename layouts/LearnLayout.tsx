import { Button } from "components/atoms/Button";
import { AuthTypes, useAuthGuard } from "hooks/useAuthGuard";
import Image from "next/image";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
interface LearnLayoutProps {
    title: string;
    before?: string;
    children: any;
    links: { label: string; href: string, completed: boolean }[];
    emptyMsg?: string;
    asPath: string;
}

export default function LearnLayout({ title, before, links, emptyMsg, children, asPath }: LearnLayoutProps) {
    useAuthGuard(AuthTypes.User)

    return (
        <main className="min-h-screen bg-white flex ">
            {/* Sidebar */}
            <div className="bg-white border-r-2 border-gray-200  xl:w-[350px] lg:w-[250px] md:w-60 sm:w-40 h-screen overflow-auto fixed  ">
                <header className="w-full pb-5 px-2  border-morning sticky top-0 bg-hero ">
                    {before && <Link href={before} className="transition py-3 px-1 flex arrow hover:-translate-x-2">
                        <BsArrowLeft size={40} />
                    </Link>}
                    <h1 className="text-eclipse text-2xl text-center font-bold capitalize">{title}</h1>
                </header>
                {links.length > 0 && <div className="flex flex-col mt-5 gap-y-5 px-2 py-4 items-start">
                    {links?.map((b: any, i) => <Link key={`i${i}`} className="w-full " href={b.href}><Button variant={b.completed ? 'success' : 'light'} alignLeft={true} isActive={b.href == asPath}>{b.label}</Button></Link>)}
                </div>}
            </div>
            {/* Content */}
            <div className="pl-0 bg-white container min-h-screen  xl:ml-[390px] lg:ml-[380px]  md:ml-[280px]  sm:ml-48">
                {children && <div className="py-10">
                    {children}
                </div>}
                {emptyMsg && !children && <EmptyMsg msg={emptyMsg} />}
            </div>
        </main>
    )
}


export const EmptyMsg = ({ msg }: any) => (
    <div className="flex flex-col justify-center items-center gap-10 h-full">
        <Image src="/images/course.svg" width={650} height={650} alt="empty courses" />
        <h1 className="text-3xl">{msg}</h1>
    </div>
)