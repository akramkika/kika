const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()
var q

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
  if (msg.content.startsWith('!youtube ')) {
    var YouTube = require('youtube-node')
    var youTube = new YouTube()
    youTube.setKey('AIzaSyBqCmlXiZ1db_57J3LSqpaIFF-7B8DElLQ')
    youTube.search(msg.content.substring(9), 2, function (error, result) {
      if (error) {
        console.log(error)
      } else {
        for (var i in result.items) {
          var item = result.items[i]
          msg.channel.send('Title: ' + item.snippet.title + '\nVideo: ' + item.snippet.thumbnails.default.url)
        }
      }
    })
  }
})

client.login(config.token)
