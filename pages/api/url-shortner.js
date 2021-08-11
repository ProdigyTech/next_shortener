import { connectToDatabase } from '../../lib/mongodb'
import { csrf } from '../../lib/csrf';
import { generateLink } from '../../lib/linkGenerator';


export const handler = async(req, res) => {
    if (req.method == 'POST') {
        const { client, db } = await connectToDatabase()
        const collection = db.collection('shortner')
        const isConnected = await client.isConnected()
        const {url} = req.body

        
        const insertNewRecord = async () => {
                try {
                    const record = {
                        generatedLink: generateLink(),
                        originalURL: url
                    }
                    await collection.insertOne(record)
                    return record
                } catch (e) {
                    res.status(500).json({error: 'Internal Server Error'})
                }
        }
    


        if (isConnected) {
           const data = await insertNewRecord()
            res.status(200).json(data)
        } else {
            res.status(500).json({error: 'Internal Server Error'})
        }
    } else {
        res.status(404)
        res.send('Not found')
    }
  }

  export default handler //csrf(handler);
 


