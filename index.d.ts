export function Api(options: string | RequestInit): API

interface API {
    get(getOptions: { query: string | object; headers: object }): object,
    post(postOptions: { query: string | object; headers: object; body: string | object }): object,
    patch(patchOptions: { query: string | object; headers: object; body: string | object }): object,
    put(putOptions: { query: string | object; headers: object; body: string | object }): object,
    delete(deleteOptions: { query: string | object; headers: object; body: string | object }): object,
    [key: string]: API
}