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

  if (msg.content.startsWith('!youtube ')) {
    var YouTube = require('youtube-node')
    var youTube = new YouTube()
    youTube.setKey('AIzaSyBqCmlXiZ1db_57J3LSqpaIFF-7B8DElLQ')

    if (msg.content.endsWith('--c')) {
      youTube.addParam('type', 'channel')
    } else if (msg.content.endsWith('--p')) {
      youTube.addParam('type', 'playlist')
    } else if (msg.content.endsWith('--v')) {
      youTube.addParam('type', 'video')
    } else {
      youTube.addParam('type', 'video')
    }

    if (msg.content.endsWith('--c') || msg.content.endsWith('--p') || msg.content.endsWith('--v')) {
      var a = (msg.content).length
      var b = a - 3
      var ask = msg.content.substring(9, b)
    } else {
      ask = msg.content.substring(9)
    }

    msg.channel.sendMessage('Hello, you ask for: ' + ask)

    youTube.addParam('order', 'relevance')

    youTube.search(ask, 3, function (error, result) {
      if (error) {
        console.log(error)
      } else {
        for (var i in result.items) {
          var item = result.items[i]
          msg.channel.send('Title: ' + item.snippet.title + '\nVideo: ' + item.snippet.thumbnails.default.url)
        }
      }
    })
    msg.channel.sendMessage('Finish your research with --v --c --p to search for video channel playlist')
  }
})
client.login(config.token)
