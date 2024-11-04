import axios from 'axios'

const serverUrl = process.env.NEXT_PUBLIC_SERVER

const API_URL = `${serverUrl}/api`

export const getImg = (path: string) => `${serverUrl}${path}`

export const server = () => {
    const headers: any = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }

    if(localStorage.getItem('auth')) headers['Authorization'] = `bearer ${localStorage.getItem('auth')}`

    return axios.create({
        baseURL: API_URL,
        timeout: 10000,
        withCredentials: true,
        headers
    })
}
