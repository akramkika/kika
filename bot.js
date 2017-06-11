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
      msg.guild.member(client.user).setNickname('myNicknameGoesHere')
    })
    .catch(function (error) {
      console.log('There was an ERROR: ', error)
    })
  }
})

client.login(config.token)
