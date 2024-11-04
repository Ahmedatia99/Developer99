import { CSSProperties, HTMLAttributes } from "react"

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode
}
export const Heading = ({ children, ...props }: HeadingProps) => {
    const style: CSSProperties = {
        backgroundImage: 'linear-gradient(to left, #fea800, #ff9924, #ff8c37, #ff7f47, #ff7455, #f5675f, #e75c67, #d8546e, #b84a6e, #97426a, #763b61, #573353)',
        ...props.style
    }

    return (
        <h1
            className="font-bold text-transparent text-3xl md:text-4xl lg:text-5xl bg-clip-text lg:leading-tight max-w-[auto]"
            {...props}
            style={style}
        >
            {children}
        </h1>
    )
}