import Api from './index.js'

const api = Api('https://pokeapi.co/api/v2/')

const ditto = await api.pokemon.ditto.get()
console.log(ditto)

const cheri = await api.berry['1'].get()
console.log(cheri)