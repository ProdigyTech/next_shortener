
import { generateLink } from '../../lib/linkGenerator';


export const insertNewRecord = async (collection, url) => {
    try {
        const record = {
            generatedLink: generateLink(),
            originalURL: url
        }
        await collection.insertOne(record)
        return record
    } catch (e) {
       return null
    }
}