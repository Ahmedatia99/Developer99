import { HTMLMotionProps, motion } from 'framer-motion'
interface AnswerProps extends HTMLMotionProps<"button"> {
    children: React.ReactNode;
    onInfo?: () => any;
}
const animations = {
    from: {
        width: '10px',
    },
    to: {
        width: '100%',
    },
}

export const Answer = ({ children, onInfo, ...props }: AnswerProps) => {

    return (
        <>
            <div className='flex gap-10'>
                <div className='w-full relative'>
                    <motion.button
                        initial="from" whileHover="to"
                        className="flex gap-4 bg-transparent h-auto p-3 px-0 rounded-xl text-3xl text-left transition ease-in-out duration-300 w-full"
                        {...props}
                    >
                        <motion.div
                            transition={{ duration: 0.3 }}
                            variants={animations} className="absolute z-0 top-0 left-0 bg-morning  h-full rounded-2xl" />
                        <span className="relative z-1 ml-5 text-xl md:text-3xl">{children}</span>
                    </motion.button>
                </div>
                {onInfo && <button onClick={onInfo} className='text-3xl hover:scale-125 transition'><i className="fa-solid fa-circle-info"></i></button>}
            </div>
        </>
    )
}