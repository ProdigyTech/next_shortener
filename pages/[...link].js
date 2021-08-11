import { connectToDatabase } from "../lib/mongodb"

import { useEffect } from "react"

export async function getServerSideProps(context) {
    
    const {link: myLink} = context.query
    const { client, db } = await connectToDatabase()
    const collection = db.collection('shortner')
    const isConnected = await client.isConnected()

    

    if (isConnected) {

        const formattedLink = `${process.env.DOMAIN}/${myLink}`

        const options = {
            // Include only the `title` and `imdb` fields in the returned document
            projection: { originalURL: 1, generatedLink: 1 },
          };

      

        const foundThing =   await collection.find({generatedLink : formattedLink}, options).toArray()

        return {
            props: {
                generatedLink:formattedLink,
                destinationURL: foundThing[0]?.originalURL
            }, // will be passed to the page component as props
          } 
    } else {
        // return {
        //     redirect: {
        //         permanent: true,
        //         destination: '/',
        //       },
        // }
    }

  
   
  }


const Redirect = ({destinationURL}) => {
    useEffect(() => {
        window.location.replace(destinationURL)
    },[])
return <></>

}

export default Redirect