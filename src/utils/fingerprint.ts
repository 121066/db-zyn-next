import FingerprintJS from '@fingerprintjs/fingerprintjs';
export const generateUniqueId = () => {
    return Math.random().toString(36).substring(2, 9)
}
export const getFingerprint = async () => {
    let token = window.localStorage.getItem('fingerprintjs') || ''
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    if (result.visitorId) {
        return result.visitorId;
    } else if (token) {
        return token

    } else {
        token = generateUniqueId()
        window.localStorage.setItem('fingerprintjs', token)
        return token
    }

};