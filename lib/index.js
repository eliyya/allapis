function merge(...args) {
    let deep = typeof args[0] === 'boolean' ? args.shift() : false;
    const result = args[0];
    for (const extender of args.slice(1)) {
        for (const key in extender) {
            if (Object.prototype.hasOwnProperty.call(extender, key)) {
                if (deep) {
                    if (typeof extender[key] === 'object' &&
                        extender[key] !== null) {
                        // Si el valor es un objeto o array, hacer la fusión recursiva
                        result[key] = merge(true, Object.prototype.hasOwnProperty.call(result, key) ?
                            result[key]
                            : {}, extender[key]);
                    }
                    else {
                        // Si no es un objeto, asignar el valor directamente
                        result[key] = extender[key];
                    }
                }
                else {
                    result[key] = extender[key];
                }
            }
        }
    }
    return result;
}
/**
 *
 * @param input - The input URL as a string or URL object.
 * @param init - Optional request initialization options like a fetch.
 * @returns An object that can be used to make requests.
 */
export function Api(input, init) {
    // @ts-ignore: TypeScript cannot infer the return type of createProxy, but it is correct.
    return createProxy(new URL(input), init ?? {});
}
function createProxy(url, globalInit) {
    return new Proxy({}, {
        get: (_, prop) => {
            const method = prop.toString().toUpperCase();
            const mergeInit = (newInit) => merge(true, globalInit, newInit ?? {}, { method });
            if (['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].includes(method))
                return function (input, init) {
                    if (typeof input !== 'string' &&
                        !(input instanceof URLSearchParams))
                        return fetch(url, mergeInit(input));
                    for (const [key, value] of new URLSearchParams(input))
                        url.searchParams.set(key, value);
                    return fetch(url, mergeInit(init));
                };
            const nurl = url.toString();
            if (nurl.endsWith('/'))
                return createProxy(new URL(`${nurl}${prop.toString()}`), globalInit);
            return createProxy(new URL(`${nurl}/${prop.toString()}`), globalInit);
        },
    });
}
export default Api;
