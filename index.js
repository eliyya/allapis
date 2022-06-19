// import WebSocket from "ws"

function proccesQuery(query = '') {
    if (query && typeof query === 'object') return `?${new URLSearchParams(query)}`
    if (query && typeof query === 'string' && !query.startsWith('?')) return `?${query}`
    if (query && typeof query === 'string') return query
    return ''
}

/**
 * Create new Api
 * @param {string | RequestInit} options
 */
export function Api(options) {
    if (typeof options === 'string') options = { url: options }
    return createProxy(options)
}

function createProxy(options) {
    return new Proxy(
        {
            /**
             * Apply a GET to this route
             * @param {{query?:string;headers?:object}} getOptions 
             * @returns {Psomise<any>}
             */
            async get({ query = "", headers = {} } = {}){
                const res = await fetch(`${options.url}${proccesQuery(query)}`, {
                    ...options,
                    method: 'GET',
                    headers: { ...options.headers, ...headers }
                })
                if (res.ok) return res.json()
                else Promise.reject(new Error(res.statusText))
            },

            /**
             * Apply a POST to this route
             * @param {{query?:string;headers?:object;body?:string|object}} getOptions 
             * @returns {Psomise<any>}
             */
            async post({ query = "", headers = {}, body = "" } = {}){
                const res = await fetch(`${options.url}${proccesQuery(query)}`, {
                    ...options,
                    headers: { ...options.headers, ...headers },
                    method: 'POST',
                    body: typeof body !== 'string' ? JSON.stringify(body) : body
                })
                if (res.ok) return res.json()
                else Promise.reject(new Error(`Error ${res.status}: ${res.statusText}`))
            },

            /**
             * Apply a PATCH to this route
             * @param {{query?:string;headers?:object;body?:string|object}} getOptions 
             * @returns {Psomise<any>}
             */
            async patch({ query = "", headers = {}, body = "" } = {}){
                const res = await fetch(`${options.url}${proccesQuery(query)}`, {
                    ...options,
                    headers: { ...options.headers, ...headers },
                    method: 'PATCH',
                    body: typeof body !== 'string' ? JSON.stringify(body) : body
                })
                if (res.ok) return res.json()
                else Promise.reject(new Error(`Error ${res.status}: ${res.statusText}`))
            },

            /**
             * Apply a PUT to this route
             * @param {{query?:string;headers?:object;body?:string|object}} getOptions 
             * @returns {Psomise<any>}
             */
            async put({ query = "", headers = {}, body = "" } = {}){
                const res = await fetch(`${options.url}${proccesQuery(query)}`, {
                    ...options,
                    headers: { ...options.headers, ...headers },
                    method: 'PUT',
                    body: typeof body !== 'string' ? JSON.stringify(body) : body
                })
                if (res.ok) return res.json()
                else Promise.reject(new Error(`Error ${res.status}: ${res.statusText}`))
            },

            /**
             * Apply a DELETE to this route
             * @param {{query?:string;headers?:object;body?:string|object}} getOptions 
             * @returns {Psomise<any>}
             */
            async delete({ query = "", headers = {}, body = "" } = {}){
                const res = await fetch(`${options.url}${proccesQuery(query)}`, {
                    ...options,
                    headers: { ...options.headers, ...headers },
                    method: 'DELETE',
                    body: typeof body !== 'string' ? JSON.stringify(body) : body
                })
                if (res.ok) return res.json()
                else Promise.reject(new Error(`Error ${res.status}: ${res.statusText}`))
            }
        },
        {
            get: (obj, prop) => {
                if (!["get", "post", "patch", "put", "delete"].includes(prop))
                    return createProxy({ ...options, url: `${options.url}/${prop}` })
                else return obj[prop]
            }
        }
    )
}

/**
 * Create a new WebSocket connection to the Revolt Api
 * @param {string} token - Bot Token
 * @returns {WebSocket} - the WebSocket connection ready to use
 */
// export function WebSocketConnection(token) {
//     try {
//         const ws = new WebSocket("wss://ws.revolt.chat?format=json")
//         ws.on("open", () => {
//             setInterval(() => ws.ping(), 15_000)
//             ws.send(
//                 JSON.stringify({
//                     type: "Authenticate",
//                     token: token,
//                 })
//             )
//         })
//         return ws
//     } catch (error) {
//         throw error
//     }
// }

export default Api