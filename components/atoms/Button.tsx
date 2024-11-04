import classNames from "classnames";
import { HTMLAttributes } from "react"
import { IconType } from "react-icons/lib";
import Spinner from "./Spinner";
interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'eclipse' | 'success' | "light"
    loading?: boolean;
    isActive?: boolean;
    alignLeft?: boolean;
}

export const Button = ({ children, loading, variant = 'primary', alignLeft, isActive,...props }: ButtonProps) => {
    const variants = {
        primary: 'bg-morning hover:bg-eclipse hover:text-morning',
        eclipse: 'bg-eclipse/30 text-white hover:bg-white hover:text-black',
        success: 'bg-[#4caf5085] text-[#00732a] hover:text-eclipse px-4 py-2 rounded-md',
        light:' bg-white hover:bg-hero  px-4 py-2 rounded-md hover:text-morning xl:text-xl lg:text-base md:text-base sm:text-xs'
    }[variant]
 
    return (
        <button
            className={classNames("p-3 flex items-center rounded-xl md:max-w-[300px] lg:max-w-2xl w-full disabled:text-white disabled:hover:text-white disabled:hover:bg-eclipse disabled:bg-eclipse transition-all",
            isActive? "text-morning border border-morning bg-hero ": null, variants, alignLeft ? "justify-start text-left" : "justify-center")}
            disabled={loading}
            {...props}
        >
            {loading ? <Spinner color="white" /> : children}
        </button>
    )
}

interface ButtonIconProps {
    loading?: boolean;
    variant?: 'success' | 'successSolid' | 'dangerSolid' | 'danger' | 'custom';
    icon: IconType;
    onClick?: any;
    className?: string
}
export const ButtonIcon = ({ icon: Icon, loading, variant = 'custom', className, ...props }: ButtonIconProps) => {
    const variants = {
        custom: '',
        success: 'text-success hover:bg-success/10',
        danger: 'text-sunset hover:bg-sunset/10 rounded-lg transition',
        successSolid: 'bg-success text-white hover:bg-success/80',
        dangerSolid: 'bg-sunset text-white hover:bg-sunset/80',
    }

    return (
        <button className={classNames("text-3xl p-1 rounded-lg justify-center items-center flex transition", variants[variant], className, loading && 'bg-gray-100/50')} {...props}>
            {loading ? <Spinner /> : <Icon />}
        </button>
    )
}