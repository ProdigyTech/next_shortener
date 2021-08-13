import { connectToDatabase } from '../../lib/mongodb'
import { csrf } from '../../lib/csrf'
import { insertNewRecord } from '../../lib/util'

const handler = async (req, res) => {
    /** Only allow post requests on this route */
    if (req.method == 'POST') {
        const { client, db } = await connectToDatabase()
        const collection = db.collection('shortener')



        //lookup 
        const isConnected = await client.isConnected()
        const { url } = req.body


        if (isConnected ) {
                const existingRecord = await findRecord(collection, url)
                if (existingRecord) {
                    return res.status(200).json(existingRecord)
                }
            const record = await insertNewRecord(collection, url)
            return record
                ? res.status(200).json(record)
                : res.status(500).json({ error: 'Internal Server Error' })
        }
    }
    /** If endpoint is hit with anything other than a post, return 404 */
    res.status(404)
    res.send('Not found')
}

const findRecord = async (collection, url) => {

      const queryOptions = {
        projection: { originalURL: 1, shortCode: 1 },
    }

     const foundRecord = await collection
        .findOne({ originalURL:url  },queryOptions)
        
       return foundRecord
}
export default handler //csrf(handler)
