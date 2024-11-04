import { Heading } from "components/atoms/Heading";
import { Selection } from "components/molecules/Selection";
import { useRouter } from "next/router";
import { useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import useService from "hooks/service/useService";
import { Modal } from "components/molecules/Modal";
import TextInput from "components/atoms/inputs/TextInput";
import { HiLightBulb } from "react-icons/hi";
import { useCoursesQuestions } from "hooks/service/courses-questions.service";
import Spinner from "components/atoms/Spinner";


export default function Finish({ }) {
    const [name, setName] = useState<string | null>()
    const { request, loading } = useService('tracks')
    const router = useRouter()
    const [selected, setSelected] = useState<number[]>()
    const { coursesData, isLoading } = useCoursesQuestions(router.query)
    const addTrack = () => request({
        method: 'post', action: '', payload: { name, courses: selected, meta: router.query },
        success: { handler: () => { router.push('/dashboard/tracks') } },
        error: { toast: (msg) => msg }
    })

    return (
        <main className="flex flex-col min-h-screen mx-auto justify-center gap-10 max-w-5xl px-5">
            <Heading>
                Recommended Courses
            </Heading>
            {/* <pre>
                {JSON.stringify(router.query, null, 2)}
            </pre> */}
            {isLoading ? <Spinner color="blue" className="w-12 h-12" /> : <Selection data={coursesData} values={selected} onSelect={setSelected} />}
            <p>Only the selected courses will be added to the track</p>
            <button onClick={() => setName('')} className="text-morning [&_svg]:hover:translate-x-4 transition p-2 flex items-center justify-end gap-4 ml-auto">
                <span className="text-3xl md:text-4xl">Add Track</span>
                <HiArrowRight className="text-6xl transition" />
            </button>
            {/* info Popup */}
            <Modal loading={loading} onSubmit={addTrack} title={'Give your track a name'} isOpen={name != null} onClose={() => setName(null)}>
                <TextInput
                    placeholder="Track Name" before={<HiLightBulb size="30px" />}
                    onChange={(e) => setName((e.target as any).value)}
                />
            </Modal>
        </main>
    )
}

