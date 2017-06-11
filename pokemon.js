var PokeApi = require('pokeapi')
var api = PokeApi.v1()

module.exports = {
  pokemon: function (msg) {
    if (msg.content.startsWith('!pokemon ')) {
      api.get('pokemon', 1).then(function (bulbasaur) {
        msg.channel.sendMessage("Here's Bulbasaur:", bulbasaur)
        api.get(bulbasaur.moves).then(function (moves) {
          msg.channel.sendMessage('Full move list:' + moves)
        })
      }, function (err) {
        console.log('ERROR', err)
      })
    }
  }
}
