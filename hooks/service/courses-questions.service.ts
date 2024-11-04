import useSWR from 'swr'
import { useMemo } from "react";
import { getImg } from "server";


export const useCoursesQuestions = (query: Record<string, any> | any, callback?: (x: any[]) => any[]) => {
    const params = new URLSearchParams(query as any).toString()
    const typesLinks = (type: string) => ({
        courses: `courses-q?${params}`,
        guide: `courses-smart?${params}`
    })[type]
    const { data, isLoading } = useSWR(query ? typesLinks(query.questType) : null)
    const coursesData = useMemo(() => {
        const dataMapped = data?.map((it: any) => ({ id: it.id, label: it.name, img: getImg(it.poster?.url) }))
        return callback ? callback(dataMapped) : dataMapped
    }, [data, callback])

    return { coursesData, isLoading }
}

