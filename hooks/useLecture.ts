import useService from "./service/useService"
export const useLecture = (id: number, push: any, meta: any) => {
    const { loading, request } = useService(`complete-lecture`)
    const toggleComplete = (mutate: any, currLecId?: number) => request({
        method: 'patch', action: `${id}`,
        error: {
            toast: (msg) => msg,
        },
        success: {
            handler: () => {
                mutate()
                if (currLecId) {
                    const getIndex = meta.links.findIndex((l: any) => l.id == currLecId)
                    getIndex + 1 != meta.links.length && push(meta.links[getIndex + 1].href)
                }
            }
        }
    })
    return { loading, toggleComplete }
}