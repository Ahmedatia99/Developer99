import useService from "./useService"


export const useTrackService = (mutate?: any) => {
    const { loading, request } = useService('tracks')
    const deleteTrack = (id: number) => request({
        method: 'delete', action: `${id}`, success: {
            toast: () => 'Deleted successfully',
            handler: () => {
                mutate && mutate()
            }
        }
    })

    const deleteCourse = (trackId: number, courseId: number) => request({
        method: 'delete', action: `courses/${trackId}/${courseId}`, success: {
            toast: () => 'Deleted successfully',
            handler: () => {
                mutate && mutate()
            }
        }
    })

    const addCourse = (trackId: number, selected?: number[]) => request({
        method: 'PATCH', action: `courses/${trackId}`, payload: {courses: selected},
        success: {
            toast: () => 'Added successfully',
            handler: () => {
                mutate && mutate()
            }
        }
    })

    return { loading, deleteTrack, addCourse, deleteCourse }
}

