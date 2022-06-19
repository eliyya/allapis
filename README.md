# any-api
In case you want to simplify the apis and create instances

-   Fast
-   Simple
-   Light

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
```

## Requeriments
You need to have Node `^18`

Or have Node `^17.5` and run your program with the `--experimental-fetch` flag

Or have Node `^16.15` and run your program with the `--experimental-fetch` flag

Or if you use another version of Node you should install **node fetch** with `npm i node-fetch`