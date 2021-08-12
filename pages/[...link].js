import { connectToDatabase } from '../lib/mongodb'

import { useEffect } from 'react'

const getUrlFromShortCode = async (collection, shortCode) => {
    const queryOptions = {
        projection: { originalURL: 1, shortCode: 1 },
    }

    const foundRecord = await collection
        .find({ shortCode: shortCode }, queryOptions)
        .toArray()

    return foundRecord ? foundRecord[0] : []
}

const redirectToIndex = () => ({
    redirect: {
        permanent: true,
        destination: '/',
    },
})

export async function getServerSideProps(context) {
    const { link: shortCode } = context.query

    const { client, db } = await connectToDatabase()
    const collection = db.collection('shortener')
    const isConnected = await client.isConnected()

    if (isConnected) {
        const { originalURL } =
            (await getUrlFromShortCode(collection, shortCode[0])) || {}

        return originalURL
            ? {
                  props: {
                      destinationURL: `${originalURL}`,
                  },
              }
            : redirectToIndex()
    } else {
        return redirectToIndex()
    }
}

const Redirect = ({ destinationURL }) => {
    useEffect(() => {
        window.location.replace(destinationURL)
    }, [])
    return null
}

export default Redirect
