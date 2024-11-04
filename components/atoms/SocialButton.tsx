import { HTMLAttributes } from "react"

interface SocialProps extends HTMLAttributes<HTMLButtonElement> {
    loginWith: 'github' | 'google';
    children: React.ReactNode;
}

export const SocialButton = ({ children, loginWith, ...props }: SocialProps) => {
    const serverLink = process.env.NEXT_PUBLIC_SERVER

    return (
        <a href={`${serverLink}/api/login/${loginWith}`} className="w-full">
            <button
                className={`w-full bg-transparent flex justify-center items-center gap-3 px-4 py-3 rounded-lg text-black border-[1px] border-black hover:text-white hover:bg-black transition ease-in-out duration-300 text-base sm:text-lg`}
                {...props}
            >
                {children}
            </button>
        </a>
    )
}