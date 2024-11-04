import { StrapiRes } from "./strapi.interface";

export interface OptionsDecodeStrapi {
    key?: string;
}

type DecodeStripeFunc =  (x: StrapiRes, opts?: OptionsDecodeStrapi) => {meta: any; [x:string]: any} | any
export const decodeStrapiRes: DecodeStripeFunc= (strapiRes: StrapiRes, opts?: OptionsDecodeStrapi) => {
    if(!strapiRes) return undefined;
    const { data, meta } = strapiRes
    const attrs = (data as any).attributes || null
    const metaObj = meta ? {meta: {...meta.pagination}} : {}
    return {
        ...metaObj,
        [opts?.key || 'data']: attrs ? attrs : data?.map((d) => ({id: d.id, ...d.attributes}))
    }
}