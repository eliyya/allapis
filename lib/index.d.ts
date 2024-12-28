declare function request(input?: RequestInit & Record<string, any>): Promise<Response>;
declare function request(input?: string | URLSearchParams): Promise<Response>;
declare function request(input?: string | URLSearchParams, init?: RequestInit & Record<string, any>): Promise<Response>;
declare function request(input?: string | URLSearchParams | (RequestInit & Record<string, any>), init?: RequestInit & Record<string, any>): Promise<Response>;
type API = {
    get: typeof request;
    post: typeof request;
    put: typeof request;
    delete: typeof request;
    patch: typeof request;
} & {
    [key: string]: API;
};
/**
 *
 * @param input - The input URL as a string or URL object.
 * @param init - Optional request initialization options like a fetch.
 * @returns An object that can be used to make requests.
 */
export declare function Api(input: string | URL, init?: RequestInit & Record<string, any>): API;
export default Api;
