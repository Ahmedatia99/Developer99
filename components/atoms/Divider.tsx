interface DividerProps {
    text?: string;
}

export default function Divider({ text }: DividerProps) {
    return (
        <div className="flex items-center gap-3 w-full text-base sm:text-lg">
            <span className="w-full h-[2px] bg-eclipse/30" />
            {text && (<><span className="whitespace-nowrap">{text}</span>
            <span className="w-full h-[2px] bg-eclipse/30" /></>)}
        </div>
    )
}