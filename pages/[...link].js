import { connectToDatabase } from '../lib/mongodb'

import { useEffect } from 'react'

export async function getServerSideProps(context) {
    const { link: myLink } = context.query
    const { client, db } = await connectToDatabase()
    const collection = db.collection('shortner')
    const isConnected = await client.isConnected()

    if (isConnected) {
        const formattedLink = `${process.env.DOMAIN}/${myLink}`
        const { originalURL } = getUrlFromShortCode(collection)

        return originalURL
            ? {
                  props: {
                      generatedLink: formattedLink,
                      destinationURL: originalURL,
                  },
              }
            : redirectToIndex()
    } else {
        return redirectToIndex()
    }
}

const getUrlFromShortCode = async (collection) => {
    const queryOptions = {
        projection: { originalURL: 1, generatedLink: 1 },
    }

    const foundRecord = await collection
        .find({ generatedLink: formattedLink }, queryOptions)
        .toArray()
    return foundRecord.length ? foundRecord[0] : []
}

const redirectToIndex = () => ({
    redirect: {
        permanent: true,
        destination: '/',
    },
})

const Redirect = ({ destinationURL }) => {
    useEffect(() => {
        window.location.replace(destinationURL)
    }, [])
    return <></>
}

export default Redirect
