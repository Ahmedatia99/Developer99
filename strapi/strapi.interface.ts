export interface StrapiRes<Data = any> {
    data: { attributes?: Data | any;[x: string]: any; }[];
    meta: { pagination: PaginationStrapi }
}
export interface StrapiRes2<Data = any> {
    data: Data;
    pagination: PaginationStrapi;
}

export interface PaginationStrapi {
    page: number;
    pageSize: number;
    pageCount: number
    total?: number;
}

//  MEDIA
export interface MediaProps {
    alternativeText: string;
    caption?: string;
    width?: number;
    height?: number;
    url: string;
    formats?: {
        thumbnail: {
            url: string;
        };
        small: {
            url: string;
        };
    }
}