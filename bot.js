const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
})

client.on('message', msg => {
  // Check if the message has been posted in a channel where the bot operates
  // and that the author is not the bot itself
  if (msg.channel.type !== 'dm' && (config.channel !== msg.channel.id || msg.author.id === client.user.id)) return
  // dm=directmessage
  // If message is hello, post hello too
  if (msg.content === 'hello') {
    msg.channel.sendMessage('Hello to you too, fellow !')
  }
  function pokeInfo (pkm) {
    P.getPokemonByName(pkm) // with Promise
    .then(function (response) {
      console.log(response)
      msg.channel.send('name: ' + response.name + '\nid: ' + response.id + '\nheight: ' + response.height + '\nweight: ' + response.weight)
      var pokeType1 = response.types[0].type.name
      if (response.types.length === 2) {
        var pokeType2 = response.types[1].type.name
      } else pokeType2 = null
      msg.channel.send('type1 : ' + pokeType1 + '\ntype2: ' + pokeType2)
      msg.channel.send('sprite: ' + response.sprites.front_default)
    })
    .catch(function (error) {
      msg.channel.send('Not found, are you sure you are looking for ' + msg.content.substring(9) + '?\n -->error: ' + error)
    })
  }
  function evolution (id, pkm) {
    P.getEvolutionChainById(id)
            .then(function (response) {
              console.log(response)
              // console.log(response.evolve_to[0])
              var evoChain = []
              var evoData = response.chain
              do {
                evoChain.push(evoData.species.name)
                evoData = evoData['evolves_to'][0]
              } while (!!evoData && evoData.hasOwnProperty('evolves_to'))
              console.log(evoChain)
              var nbrEvol = evoChain.length
              for (var i = 0; i < nbrEvol; i++) {
                if (evoChain[i] === pkm) {
                  var order = i
                }
              }
              if (order < nbrEvol) {
                msg.channel.send('pokemon can evolve in ' + evoChain[order + 1])
                pokeInfo(evoChain[order + 1])
              } else {
                msg.channel.send('pokemon cannot evolve')
              }
            })
            .catch(function (error) {
              console.log('There was an ERROR: ', error)
            })
            // The function returns the product of p1 and p2
  }

  if (msg.content.startsWith('!pokemon ')) {
    var Pokedex = require('pokedex-promise-v2')
    var P = new Pokedex()
    if (msg.content.substring(9.16) === 'evolve') {
      var pkm = client.user.username
      console.log(pkm)
      P.getPokemonSpeciesByName(pkm)
        .then(function (response) {
          console.log(response)
          var e = response.evolution_chain.url
          console.log(e)
          var a = e.slice(41)
          console.log(a)
          var b = a.lastIndexOf('/')
          var c = a.slice(0, b)
          console.log(c)
          evolution(c, pkm)
        })
        .catch(function (error) {
          console.log('There was an ERROR: ', error)
        })
    } else {
      P.getPokemonByName(msg.content.substring(9)) // with Promise
      .then(function (response) {
        console.log(response)
        msg.channel.send('name: ' + response.name + '\nid: ' + response.id + '\nheight: ' + response.height + '\nweight: ' + response.weight)
        var pokeType1 = response.types[0].type.name
        if (response.types.length === 2) {
          var pokeType2 = response.types[1].type.name
        } else pokeType2 = null
        msg.channel.send('type1 : ' + pokeType1 + '\ntype2: ' + pokeType2)
        msg.channel.send('sprite: ' + response.sprites.front_default)
        client.user.setAvatar(response.sprites.front_default)
        client.user.setUsername(response.name)
      })
      .catch(function (error) {
        msg.channel.send('Not found, are you sure you are looking for ' + msg.content.substring(9) + '?\n -->error: ' + error)
      })
    }
  }
})
client.login(config.token)
