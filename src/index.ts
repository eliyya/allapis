function merge(
    obj1: Record<string, any>,
    ...objn: Record<string, any>[]
): Record<string, any>
function merge(
    deep: boolean,
    obj1: Record<string, any>,
    ...objn: Record<string, any>[]
): Record<string, any>
function merge(...args: any[]): any {
    let deep = typeof args[0] === 'boolean' ? args.shift() : false
    const result = args[0]

    for (const extender of args.slice(1)) {
        for (const key in extender) {
            if (Object.prototype.hasOwnProperty.call(extender, key)) {
                if (deep) {
                    if (
                        typeof extender[key] === 'object' &&
                        extender[key] !== null
                    ) {
                        // Si el valor es un objeto o array, hacer la fusión recursiva
                        result[key] = merge(
                            true,
                            Object.prototype.hasOwnProperty.call(result, key) ?
                                result[key]
                            :   {},
                            extender[key],
                        )
                    } else {
                        // Si no es un objeto, asignar el valor directamente
                        result[key] = extender[key]
                    }
                } else {
                    result[key] = extender[key]
                }
            }
        }
    }
    return result
}

declare function request(
    input?: RequestInit & Record<string, any>,
): Promise<Response>
declare function request(input?: string | URLSearchParams): Promise<Response>
declare function request(
    input?: string | URLSearchParams,
    init?: RequestInit & Record<string, any>,
): Promise<Response>
declare function request(
    input?: string | URLSearchParams | (RequestInit & Record<string, any>),
    init?: RequestInit & Record<string, any>,
): Promise<Response>

type API = {
    get: typeof request
    post: typeof request
    put: typeof request
    delete: typeof request
    patch: typeof request
} & {
    [key: string]: API
}

/**
 *
 * @param input - The input URL as a string or URL object.
 * @param init - Optional request initialization options like a fetch.
 * @returns An object that can be used to make requests.
 */
export function Api(
    input: string | URL,
    init?: RequestInit & Record<string, any>,
): API {
    // @ts-ignore: TypeScript cannot infer the return type of createProxy, but it is correct.
    return createProxy(new URL(input), init ?? {})
}

function createProxy(url: URL, globalInit: RequestInit) {
    return new Proxy(
        {},
        {
            get: (_, prop) => {
                const method = prop.toString().toUpperCase()
                const mergeInit = (newInit?: RequestInit) =>
                    merge(true, globalInit, newInit ?? {}, { method })

                if (['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].includes(method))
                    return function (
                        input?: string | URLSearchParams | RequestInit,
                        init?: RequestInit,
                    ) {
                        if (
                            typeof input !== 'string' &&
                            !(input instanceof URLSearchParams)
                        )
                            return fetch(url, mergeInit(input))
                        for (const [key, value] of new URLSearchParams(input))
                            url.searchParams.set(key, value)
                        return fetch(url, mergeInit(init))
                    }

                const nurl = url.toString()
                if (nurl.endsWith('/'))
                    return createProxy(
                        new URL(`${nurl}${prop.toString()}`),
                        globalInit,
                    )
                return createProxy(
                    new URL(`${nurl}/${prop.toString()}`),
                    globalInit,
                )
            },
        },
    )
}

export default Api
