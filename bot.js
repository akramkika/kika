const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()
var YouTube = require('youtube-node')
var youTube = new YouTube()

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

  youTube.setKey('AIzaSyB1OOSpTREs85WUMvIgJvLTZKye4BVsoFU')
  youTube.search('World War z Trailer', 2, function (error, result) {
    if (error) {
      console.log(error)
    } else {
      console.log(JSON.stringify(result, null, 2))
    }
  })
})

client.login(config.token)
