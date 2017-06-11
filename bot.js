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
  if (msg.content.startsWith('!pokemon ')) {
    msg.channel.sendMessage('Hello to you too, fellow !')
    var Pokedex = require('pokedex-promise-v2')
    var P = new Pokedex()
    P.getPokemonByName('eevee') // with Promise
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log('There was an ERROR: ', error)
    })

    P.getPokemonByName(34, function (response, error) { // with callback
      if (!error) {
        console.log(response)
      } else {
        console.log(error)
      }
    })
  }
})

client.login(config.token)
