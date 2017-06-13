const Discord = require('discord.js')
const config = require('../config.js')
const client = new Discord.Client()

var Pokedex = require('pokedex-promise-v2')
var P = new Pokedex()

module.exports = {
  pokemon: function (msg) {
    if (msg.content.startsWith('!pokemon ')) {
      if (msg.content.substring(9.16) === 'evolve') {
        var pkm = client.user.username
        // console.log(pkm)
        P.getPokemonSpeciesByName(pkm)
          .then(function (response) {
            // console.log(response)
            var e = response.evolution_chain.url
            // console.log(e)
            var a = e.slice(41)
            // console.log(a)
            var b = a.lastIndexOf('/')
            var c = a.slice(0, b)
            // console.log(c)
            evolution(c, pkm)
          })
          .catch(function (error) {
            console.log('There was an ERROR: ', error)
          })
      } else {
        P.getPokemonByName(msg.content.substring(9)) // with Promise
        .then(function (response) {
          // console.log(response)
          msg.channel.send('name: ' + response.name + '\nid: ' + response.id + '\nheight: ' + response.height / 10 + ' m \nweight: ' + response.weight / 10 + 'kg')
          var pokeType1 = response.types[0].type.name
          if (response.types.length === 2) {
            var pokeType2 = response.types[1].type.name
          } else pokeType2 = null
          msg.channel.send('type1 : ' + pokeType1 + '\ntype2: ' + pokeType2)
          msg.channel.send('sprite: ' + response.sprites.front_default)

          var img1 = client.user.avatarURL
          console.log('old avatar' + img1)
          client.user.setAvatar(response.sprites.front_default)
          var start = Date.now()
          setTimeout(function () {
            console.log(Date.now() - start)
            console.log('new avatar' + client.user.avatarURL)
            if (client.user.avatarURL === img1) {
              msg.channel.send('wait before changing avatar')
            } else {
              msg.channel.send('avatar changed')
            }
          }, 6000)

          console.log(response.name)
          console.log(client.user.username)
          client.user.setUsername(response.name)
          setTimeout(function () {
            console.log(Date.now() - start)
            console.log(response.name)
            console.log(client.user.username)
            if (client.user.username === response.name) {
              msg.channel.send('name changed')
            } else {
              msg.channel.send('wait before changing name (2 per hour)')
            }
          }, 6000)
        })
        .catch(function (error) {
          msg.channel.send('Not found, are you sure you are looking for ' + msg.content.substring(9) + '?\n -->error: ' + error)
        })
      }
    }

    // fonction pour afficher les infos du pokemon
    function pokeInfo (pkm) {
      P.getPokemonByName(pkm) // with Promise
      .then(function (response) {
        // console.log(response)
        msg.channel.send('name: ' + response.name + '\nid: ' + response.id + '\nheight: ' + response.height / 10 + ' m \nweight: ' + response.weight / 10 + 'kg')
        var pokeType1 = response.types[0].type.name
        if (response.types.length === 2) {
          var pokeType2 = response.types[1].type.name
        } else pokeType2 = null
        msg.channel.send('type1 : ' + pokeType1 + '\ntype2: ' + pokeType2)
        msg.channel.send('sprite: ' + response.sprites.front_default)
      })
      .catch(function (error) {
        console.log(error)
      })
    }

    // fonction pour gérer l'evolution
    function evolution (id, pkm) {
      P.getEvolutionChainById(id)
      .then(function (response) {
        // console.log(response)
        // console.log(response.evolve_to[0])
        var evoChain = []
        var evoData = response.chain
        do {
          evoChain.push(evoData.species.name)
          evoData = evoData['evolves_to'][0]
        } while (!!evoData && evoData.hasOwnProperty('evolves_to'))
        console.log(evoChain)
        var nbrEvol = evoChain.length
        console.log(nbrEvol)
        for (var i = 0; i < nbrEvol; i++) {
          if (evoChain[i] === pkm) {
            var order = i
          }
        }
        if (order < nbrEvol - 1) {
          msg.channel.send('pokemon ' + pkm + ' can evolve in ' + evoChain[order + 1])
          pokeInfo(evoChain[order + 1])
        } else {
          msg.channel.send('pokemon ' + pkm + ' cannot evolve')
        }
      })
      .catch(function (error) {
        console.log('There was an ERROR: ', error)
      })
    }
  }
}

client.login(config.token)
