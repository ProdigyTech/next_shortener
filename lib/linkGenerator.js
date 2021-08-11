export const generateLink = () => {
    const code =  Math.random().toString(36).slice(2)

    const link = `${process.env.DOMAIN}/${code}`

    return link
}