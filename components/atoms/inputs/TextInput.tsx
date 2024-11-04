import classNames from "classnames";
import { HTMLAttributes, useState } from "react"
interface TextInputProps extends HTMLAttributes<HTMLInputElement> {
    type?: string;
    before?: JSX.Element;
    after?: JSX.Element;
}

export default function TextInput({ type = 'text', before, after, ...props }: TextInputProps) {
    const [focus, setFocus] = useState(false)
    return (
        <div className="relative w-auto h-12">
            {before && <div className={classNames(`absolute h-full left-0 top-0 w-12 flex justify-center items-center pointer-events-none`, focus && 'text-morning')}>{before}</div>}
            {after && <div className={`absolute h-full right-0 top-0 w-12 flex justify-center items-center`}>{after}</div>}
            <input
                type={type}
                onBlur={() => setFocus(false)} onFocus={() => setFocus(true)}
                className={`block w-full h-full text-base sm:text-lg pl-12 p-2.5 focus:text-morning bg-hero border-2 placeholder:text-eclipse/30 outline-none border-eclipse/20 focus:border-morning focus:ring-morning rounded-lg ${after && 'pr-11'}`} {...props} />
        </div>
    )
}