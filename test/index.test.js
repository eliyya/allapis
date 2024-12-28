import { Api } from '../lib/index.js'
import assert from 'node:assert'
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/dito'
const init = {
    headers: {
        'Content-Type': 'application/json',
    },
}
const api = Api(baseUrl, init)
console.log(api)
assert(api, 'API proxy should be defined')
;(async () => {
    const responseGet = await api.get()
    assert(
        responseGet instanceof Response,
        'GET request should return a Response instance',
    )
    const responsePost = await api.post()
    assert(
        responsePost instanceof Response,
        'POST request should return a Response instance',
    )
    const responsePut = await api.put()
    assert(
        responsePut instanceof Response,
        'PUT request should return a Response instance',
    )
    const responseDelete = await api.delete()
    assert(
        responseDelete instanceof Response,
        'DELETE request should return a Response instance',
    )
    const responsePatch = await api.patch()
    assert(
        responsePatch instanceof Response,
        'PATCH request should return a Response instance',
    )
    const nestedApi = api.users
    assert(nestedApi, 'Nested API proxy should be defined')
    const responseNestedGet = await nestedApi.get()
    assert(
        responseNestedGet instanceof Response,
        'Nested GET request should return a Response instance',
    )
})()
