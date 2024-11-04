import { useMemo } from 'react'
import LearnLayout from "layouts/LearnLayout";
import LoadingScreen from "layouts/LoadingScreen";
import { useRouter } from "next/router";
import { StrapiQuery } from "strapi/query-strapi";
import { decodeStrapiRes } from "strapi/decode-res";
import useSWR from 'swr'
import { Heading } from 'components/atoms/Heading';
import Markdown from 'components/molecules/Markdown/Markdown';
import { ButtonIcon } from 'components/atoms/Button';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import { useLecture } from 'hooks/useLecture';

export default function ViewTracks({ }) {
    const { push, query, asPath } = useRouter()
    const trackId = query.track as string
    const courseId = query.course as string
    const lectureId = query.lecture as string
    const tracksEndpoint = new StrapiQuery(`/tracks/${trackId}`).populate(['courses']).link()
    const coursesEndpoint = new StrapiQuery(`/courses/${courseId}`).populate(['lectures']).link()
    const lectureEndpoint = new StrapiQuery(`/lectures/${lectureId}`).populate(['blocks']).link()
    const { data, error } = useSWR(trackId ? tracksEndpoint : null)
    const { data: courseData, error: errorCourse, mutate: mutateCourse } = useSWR(courseId ? coursesEndpoint : null)
    const { data: lectureData, error: errorLecture, mutate } = useSWR(lectureId ? lectureEndpoint : null)
    const { data: trackData } = decodeStrapiRes(data) || {}
    const emptyMsg = courseId ? 'Select the lecture you want' : `Select the course you want to start`
    const meta = useMemo(() => {
        if (courseId) return {
            title: courseData?.name,
            before: `/dashboard/tracks/${trackId}`,
            links: courseData?.lectures.map((l: any) => ({ id: l.id, label: l.name, href: `/dashboard/tracks/${trackId}?course=${courseId}&lecture=${l.id}`, completed: l.completed })) || []
        }
        return { title: trackData?.name, before: `/dashboard/tracks`, links: trackData?.courses?.data.map((c: any) => ({ label: c.attributes.name, href: `/dashboard/tracks/${trackId}?course=${c.id}`})) || [] }
    }, [courseData, courseId, trackData, trackId])
    const { toggleComplete, loading } = useLecture(lectureData?.id, push, meta)
    if (errorCourse) push(`/dashboard/tracks/${trackId}`);
    if (error) push('/dashboard/tracks');
    const update = () => {
        mutateCourse()
        mutate()
    }

    if (!data && !error || (!trackData && errorCourse)) return <LoadingScreen />
    return (
        <LearnLayout title={meta.title} before={meta.before} links={meta.links} emptyMsg={emptyMsg} asPath={asPath}>
            {lectureData && (
                <>
                    {lectureData?.blocks?.map((b: any) => (
                        <div className='space-y-5' key={b.id}>
                            <Heading>{b.title}</Heading>
                            <Markdown content={b.description} />
                        </div>
                    ))}
                    <div className='fixed bottom-5 right-5 z-10'>
                        {lectureData.completed ?
                            (<ButtonIcon variant="dangerSolid" loading={loading} onClick={() => toggleComplete(update)} icon={AiOutlineClose} className={"text-4xl"} />)
                            : <ButtonIcon variant="successSolid" loading={loading} onClick={() => toggleComplete(update, lectureData.id)} icon={AiOutlineCheck} className={"text-4xl"} />}
                    </div>
                </>
            )}
        </LearnLayout>
    )
}

