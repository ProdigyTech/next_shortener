import { generateShortCode } from '../../lib/linkGenerator'
import axios from 'axios'
import { ROUTES } from './routes'

export const formatLink = (link) => {
    if (!/\w+:\/\//.test(link)) {
        return `https://${link}`
    } else {
        return link
    }
}

export const insertNewRecord = async (collection, url) => {
    try {
        const record = {
            shortCode: generateShortCode(),
            originalURL: url,
        }
        await collection.insertOne(record)
        return record
    } catch (e) {
        console.log(e)
        return null
    }
}

export const createShortLink = async (csrf, link) => {
    try {
        return await postRequestHelper(
            ROUTES.createShortLink,
            { url: link },
            csrf
        )
    } catch (e) {
        console.warn(e)
    }
}

const postRequestHelper = async (url, body, csrfToken) => {
    const headers = { 'XSRF-TOKEN': csrfToken }
    return await axios.post(url, body, headers)
}
