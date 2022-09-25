import merge from 'just-extend'

let fetch = globalThis.fetch
try {
    if (!fetch) {
        fetch = (await import('node-fetch')).default
    }
} catch (error) {
    console.error(
        "[allapis] You need to install 'node-fetch' or use the '--experimental-fetch' flag",
        '\n\tmore info: https://github.com/eliyya/allapis'
    )
    throw error
}

/**
 * process a query option
 * @param {string | Object} query
 * @returns {string}
 */
function proccesQuery(query = '') {
    if (!query) return ''
    if (typeof query === 'object') return `?${new URLSearchParams(query)}`
    if (typeof query === 'string' && !query.startsWith('?')) return `?${query}`
    if (typeof query === 'string') return query
    return ''
}

/**
 * @typedef FetchOptions
 * @property {(string | Object)} [query] - a url query
 * @type {RequestInit}
 */

/**
 * @typedef FetchInit
 * @property {string} url - a url
 * @type {RequestInit}
 */

//
/**
 * process a fetch options
 * @param {(FetchOptions | string)} options
 * @returns {[RequestInit, string]}
 */
function processOptions(options) {
    if (typeof options === 'string') return [{}, proccesQuery(options.query)]
    let q = ''
    if ('query' in options) q = proccesQuery(options.query)
    delete options.query
    return [options, q]
}

/**
 * Create new Api
 * @param {(FetchInit | string)} options
 */
export function Api(options) {
    if (typeof options === 'string') options = { url: options }
    return createProxy(options)
}

function createProxy(options) {
    return new Proxy(
        {
            async get(foptions = {}) {
                const [r, q] = processOptions(foptions)
                return fetch(`${options.url}${q}`, merge(true, {}, options, r, { method: 'GET' }))
            },
            async post(foptions = {}) {
                const [r, q] = processOptions(foptions)
                return fetch(`${options.url}${q}`, merge(true, {}, options, r, { method: 'POST' }))
            },
            async patch(foptions = {}) {
                const [r, q] = processOptions(foptions)
                return fetch(`${options.url}${q}`, merge(true, {}, options, r, { method: 'PATCH' }))
            },
            async put(foptions = {}) {
                const [r, q] = processOptions(foptions)
                return fetch(`${options.url}${q}`, merge(true, {}, options, r, { method: 'PUT' }))
            },
            async delete(foptions = {}) {
                const [r, q] = processOptions(foptions)
                return fetch(`${options.url}${q}`, merge(true, {}, options, r, { method: 'DELETE' }))
            }
        },
        {
            get: (obj, prop) =>
                obj[prop] ??
                createProxy({
                    ...options,
                    url: `${options.url}/${prop}`
                })
        }
    )
}

export default Api
