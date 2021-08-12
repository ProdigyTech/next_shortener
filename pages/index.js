import Head from 'next/head'
import { ShortCodeGenerator } from '../components/ShortCode'

const Home = () => {
    return (
        <div className="container">
            <Head>
                <title>Next Shortner</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ShortCodeGenerator />
        </div>
    )
}

export default Home
