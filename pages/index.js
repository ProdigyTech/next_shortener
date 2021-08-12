import Head from 'next/head'
import { ShortCodeGenerator } from '../components/ShortCode'
import { csrfToken } from '../lib/csrf'

const Home = () => {
    return (
        <div className="container">
            <Head>
                <title>Next Shortener</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ShortCodeGenerator csrfToken={csrfToken} />
        </div>
    )
}

export default Home
