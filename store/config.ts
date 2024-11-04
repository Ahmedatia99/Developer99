export const reHydrateStore = (hydratsFuncs: any[]) => {
    let result = {};
    hydratsFuncs.forEach((func) => result = {...func()})
    
    return {
        user: {
            isLogged: false,
            info: {
                id: null,
                email: null,
                name: null
            }
        },
        ...result
    }
}