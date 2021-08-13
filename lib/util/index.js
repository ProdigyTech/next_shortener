import { generateShortCode } from '../../lib/linkGenerator'
import axios from 'axios'
import { ROUTES } from './routes'

/** Check the URL, if it doesn't contain a protocol, i.e https, http, ftp, return a link with https */
export const formatLink = (link) => {
    if (!/\w+:\/\//.test(link)) {
        return `https://${link}`
    } else {
        return link
    }
}

/** Method to insert a record into the mongo db collection */
export const insertNewRecord = async (collection, url) => {
    try {
        const record = {
            shortCode: generateShortCode(),
            originalURL: url,
        }
        await collection.insertOne(record)
        return record
    } catch (e) {
        return null
    }
}

/** Wrapper method to create short links  */
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

/** Helper method to make post requests  */
const postRequestHelper = async (url, body, csrfToken) => {
    const headers = { 'XSRF-TOKEN': csrfToken }
    return await axios.post(url, body, { headers })
}
