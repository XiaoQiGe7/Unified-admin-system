/**
 * @description 获取随机id
 * @param length
 * @returns {string}
 */
export function uuid(length = 32) {
    const num = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    let str = ''
    for (let i = 0; i < length; i++) {
        str += num.charAt(Math.floor(Math.random() * num.length))
    }
    return str
}

/**
* @description m到n的随机数
* @param m
* @param n
* @returns {number}
*/
export function random(m, n) {
    return Math.floor(Math.random() * (m - n) + n)
}