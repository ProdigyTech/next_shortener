import { useState } from 'react'
import { csrfToken } from '../lib/csrf'
import { createShortLink, formatLink } from '../lib/util'
import Loader from 'react-loader-spinner'

export const ShortCodeGenerator = () => {
    const [link, setLink] = useState('')
    const [shortLink, setShortLink] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const makeRequest = async () => {
        if (link) {
            setIsLoading(true)
            try {
                const { data } = await createShortLink(
                    csrfToken,
                    formatLink(link)
                )
                setShortLink(data)
                setIsLoading(false)
            } catch (e) {
                console.warn(e)
                setIsLoading(false)
            }
        } else {
            alert('Invalid URL')
        }
    }

    return (
        <div class="wrapper">
            <h1 className="title">Next Shortner</h1>

            <h2 className="subtitle">
                Enter a URL and have it shortened to make sharing easier
            </h2>

            <input
                value={link}
                placeholder="https://example.com/felknjfeelknfelkn;gfnklefg/"
                type="text"
                className={`url--input`}
                onChange={(e) => setLink(e.target.value)}
            />
            <button className={`btn--submit`} onClick={makeRequest}>
                {' '}
                Go!
            </button>
            {isLoading && (
                <div className="loader">
                    <Loader
                        type="TailSpin"
                        color="#2b2d2f"
                        height={75}
                        width={50}
                    />
                </div>
            )}
            {shortLink && !isLoading && (
                <div className="grid">
                    <a href={`${shortLink.generatedLink}`} className="card">
                        {shortLink.generatedLink}
                    </a>
                </div>
            )}
        </div>
    )
}
