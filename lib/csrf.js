import { nextCsrf } from "next-csrf";

const options = {
    secret: 'VfS(s&c,*Envc#+YMP]t5[>H' //process.env.CSRF_SECRET
}

export const { csrf, csrfToken } = nextCsrf(options);