import Api from './index.js'

// Create Api object
const pokeApi = Api('https://pokeapi.co/api/v2/') // eg. pokeapi
const messageId = '996656476661751818'

// Its ready to use
const ditto = await pokeApi.pokemon.ditto.get().then(r => r.json())
console.log(ditto)

// you can save routes
const berries = pokeApi.berry
const cheri = berries['1'].get().then(r => r.json())
console.log(cheri)

// predenfine fetch options
const discordApi = Api({
    url: 'https://discord.com/api/v10',
    headers: {
        Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
        'Content-Type': 'application/json'
    }
})
const channel = discordApi.channels['885674115615301643']

// use url query like a string
const messages1 = await channel.messages.get('limit=20').then(r => r.json())
// or like a object
const messages2 = await channel.messages
    .get({
        query: {
            limit: 50,
            around: messageId
        }
    })
    .then(r => r.json())

// use post, delete, put, patch methods too
channel.messages
    .post({
        body: JSON.stringify({
            content: 'hello!!'
        })
    })
    .catch(console.error)
    .then(r => r.json())
    .then(console.log)

console.log({
    ditto,
    cheri,
    messages1,
    messages2
})
