import { Modal } from "components/molecules/Modal";
import { Selection } from "components/molecules/Selection";
import { Track, TrackProps } from "components/molecules/Track";
import { useCoursesQuestions } from "hooks/service/courses-questions.service";
import { useTrackService } from "hooks/service/tracks.service";
import DashboardLayout from "layouts/DashboardLayout";
import LoadingScreen from "layouts/LoadingScreen";
import { useState } from 'react'
import useSWR from 'swr'

export default function Tracks({ }) {
    const { data, error, mutate } = useSWR<TrackProps[]>('/tracks')
    const { loading, deleteTrack, addCourse, deleteCourse } = useTrackService(mutate)
    const [selected, setSelected] = useState<number[]>()
    const [create, setCreate] = useState<any>(null)
    const { coursesData } = useCoursesQuestions(create?.meta, (cs: any) => cs?.filter((c: any) => !create.courses.map((cc: any) => cc.id).includes(c.id)))
    const reset = () => {
        setCreate(undefined)
        setSelected([])
    }
    const onAddCourse = () => {
        reset()
        addCourse(create.id, selected)
    }

    if (!data && !error) return <LoadingScreen />
    return (
        <DashboardLayout title="available tracks">
            {data?.length ? <div className="flex flex-col gap-6 my-12">
                {data.map((t) => (
                    <Track {...t}
                        key={t.id}
                        loading={loading}
                        onDeleteCourse={(courseId) => deleteCourse(t.id, courseId)}
                        onDelete={() => deleteTrack(t.id)}
                        onCreate={() => setCreate({ id: t.id, courses: t.courses, meta: t.meta })}
                    />
                ))}
            </div> : <p className="text-3xl mt-10 bg-sunset text-white p-5 rounded-lg">No Tracks</p>}
            {/* info Popup */}
            <Modal onSubmit={coursesData?.length ? onAddCourse : reset} loading={loading} title='Add New Course' isOpen={!!create} onClose={reset} >
                {coursesData?.length ? <Selection data={coursesData} values={selected} onSelect={setSelected} small /> : <p>No recommnded courses</p>}
            </Modal>
        </DashboardLayout>
    )
}

