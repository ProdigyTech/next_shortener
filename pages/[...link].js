import { connectToDatabase } from '../lib/mongodb'

import { useEffect } from 'react'

const getUrlFromShortCode = async (collection, formattedLink) => {
    const queryOptions = {
        projection: { originalURL: 1, generatedLink: 1 },
    }

    const foundRecord = await collection
        .find({ generatedLink: formattedLink }, queryOptions)
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
    const { link: myLink } = context.query
    const { client, db } = await connectToDatabase()
    const collection = db.collection('shortner')
    const isConnected = await client.isConnected()

    if (isConnected) {
        const formattedLink = `${process.env.DOMAIN}/${myLink}`
        const { originalURL = '', ...rest } = await getUrlFromShortCode(
            collection,
            formattedLink
        )

        return originalURL
            ? {
                  props: {
                      generatedLink: `${formattedLink}`,
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
    return <></>
}

export default Redirect
