export function Api(options: string | FetchInit): API

interface fetchOptions extends RequestInit {
    query?: string | object
}

interface FetchInit extends RequestInit {
    url: string
}

interface API {
    get(getOptions: fetchOptions): Promise<Response>
    post(postOptions: fetchOptions): Promise<Response>
    patch(patchOptions: fetchOptions): Promise<Response>
    put(putOptions: fetchOptions): Promise<Response>
    delete(deleteOptions: fetchOptions): Promise<Response>
    [key: string]: API
}
