import { ButtonIcon } from "components/atoms/Button";
import { Progress } from "components/atoms/Progress";
import Image from "next/image";
import { HiOutlineX, HiOutlineMinus, HiPencil, HiOutlineHand, HiPlus, HiArrowRight } from "react-icons/hi";
import { getImg } from "server";
import { motion, useAnimationControls } from 'framer-motion'
import { useState, useEffect } from 'react'
import { swing } from "animations/swing";
import classNames from "classnames";
import Spinner from "components/atoms/Spinner";
import Link from "next/link";
export interface TrackProps {
    id: number;
    name: string;
    progress: number;
    courses: { id: number; name: string; poster: { url: string } }[];
    meta?: Record<string, any>
}
interface TrackCompProps extends TrackProps {
    loading: boolean;
    onDelete: () => void;
    onDeleteCourse: (id: number) => void;
    onCreate: () => void;
}

export const Track = ({ id, loading, name, progress, courses, onDelete, onDeleteCourse, onCreate }: TrackCompProps) => {
    const controls = useAnimationControls()
    const [edit, setEdit] = useState(false)
    useEffect(() => {
        edit ? controls.start(swing.to as any) : controls.start({ rotate: 0 })
    }, [edit])


    return (
        <div className='bg-white rounded-xl'>
            <header className="flex justify-between border-b-2 py-4 px-5">
                <div className="flex space-x-4">
                    {loading && <Spinner />}
                    <h1 className="font-bold text-2xl">{name}</h1>
                </div>
                <div className="flex space-x-2">
                    <ButtonIcon variant="success" icon={edit ? HiOutlineHand : HiPencil} onClick={() => setEdit(!edit)} />
                    <ButtonIcon variant="danger" icon={HiOutlineX} onClick={onDelete} />
                </div>
            </header>
            <section className="px-8 py-10 flex gap-10 justify-between overflow-x-auto">
                <div className="flex space-x-12 relative items-center">
                    {courses.map((c, i) => (
                        <motion.div animate={controls} key={`key${i}`} className={classNames("flex flex-col relative items-center gap-2")}>
                            {edit && <ButtonIcon onClick={() => onDeleteCourse(c.id)} className="absolute z-10 -top-2 -left-2 bg-gray-400 hover:bg-gray-300 text-white" icon={HiOutlineMinus} />}
                            <Image src={getImg(c.poster.url)} width={80} height={80} alt='course image' />
                            <p>{c.name}</p>
                        </motion.div>
                    ))}
                    {edit && <ButtonIcon onClick={onCreate} className="bg-success text-white px-8 hover:bg-success/50 h-[100px]" icon={HiPlus} />}
                </div>
                {!edit && courses.length > 0&& <Link href={`/dashboard/tracks/${id}`} className="[&_.arrow]:hover:translate-x-4">
                    <button className="transition p-2 flex items-center justify-end gap-4 ml-auto arrow">
                        <HiArrowRight className="text-6xl transition text-morning" />
                    </button>
                </Link>}
            </section>
            {progress > 0 && <Progress value={progress} />}
        </div >
    )
}