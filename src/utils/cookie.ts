import jsCookie from 'js-cookie'
const cookieName = 'db_man'
export const getCookie = () => {
    return jsCookie.get(cookieName)
}
export const setCookie = (value) => {
    return jsCookie.set(cookieName, value, {
        expires: 2,
        path: '/',
        sameSit: 'strict',
    })
}
