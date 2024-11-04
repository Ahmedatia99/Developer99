import { server } from 'server'
import { decodeStrapiRes } from './decode-res';
export interface PaginationQueryStrapi {
  page: number;
  pageSize: number;
  withCount?: boolean;
  [x: string]: any
}

export class StrapiQuery {
  params: any = {}
  constructor(private readonly endpoint: string) { }

  // Select
  select(keys: string[]) {
    keys.forEach((key, i) => {
      this.params[`fields[${i}]`] = key
    })
    return this
  }

  // Sorting
  sort(obj: { [x: string]: string }) {
    Object.keys(obj).forEach((key, i) => {
      this.params[`sort[${i}]`] = `${key}:${obj[key]}`
    })
    return this
  }

  // Pagaination
  pagination(opts: PaginationQueryStrapi) {
    Object.keys(opts).forEach((key, i) => {
      this.params[`pagination[${key}]`] = opts[key]
    })
    return this
  }

  // Populate
  populate(arr: string[]) {
    arr.forEach((key, i) => {
      this.params[`populate[${i}]`] = key
    })
    return this
  }

  // made functions Search
  search(keys: string[], val: string) {
    keys.forEach((key, i) => {
      this.params[`filters[$or][${i}][${key}][$contains]`] = val
    })
    return this
  }

  customParams(custom?: { [x: string]: string }) {
    this.params = { ...this.params, ...custom }
    return this
  }

  link() {
    const params = new URLSearchParams(this.params).toString()
    return `${this.endpoint}?${params}`
  }

  // decode will remove the attributes level
  async fetch({ decode } = { decode: false }) {
    try {
      const link = this.link()
      const res = await server().get(link)
      return decode ? decodeStrapiRes(res.data) : res.data
    } catch (e) {
      console.log(e);
    }
  }
}