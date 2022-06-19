# any-api
In case you want to simplify the apis and create instances

-   Fast
-   Simple
-   Light

> **Note:** requires *ES Modules, Node `^18` or Node `^17.5.0` and the flag `--experimental-fetch` or Node `^16.15.0` whit the same flag

## Example
```js
// Import the Api
import Api from 'allapis'

// Create Api object
const api = Api('https://pokeapi.co/api/v2/') // eg. pokeapi

// Its ready to use
const ditto = await api.pokemon.ditto.get()
console.log(ditto)

const cheri = await api.berry['1'].get()
console.log(cheri)