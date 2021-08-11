import { connectToDatabase } from '../../lib/mongodb'
import { csrf } from '../../lib/csrf'
import { insertNewRecord } from '../../lib/util'

const handler = async (req, res) => {
    if (req.method == 'POST') {
        const { client, db } = await connectToDatabase()
        const collection = db.collection('shortner')
        const isConnected = await client.isConnected()
        const { url } = req.body

        if (isConnected) {
            const record = await insertNewRecord(collection, url)
            return record
                ? res.status(200).json(record)
                : res.status(500).json({ error: 'Internal Server Error' })
        }
    }
    res.status(404)
    res.send('Not found')
}

export default handler //csrf(handler)
