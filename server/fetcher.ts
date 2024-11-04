import { server } from "server";

export const swrOptions = {
    fetcher: (resource: any, init: any) => server()(resource, init).then(res => res.data)
}