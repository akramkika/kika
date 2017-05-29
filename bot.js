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
  if (msg.content === 'search') {
    var search = require('youtube-search')
    var opts = {
      maxResults: 10,
      key: 'AIzaSyBqCmlXiZ1db_57J3LSqpaIFF-7B8DElLQ'
    }
    search('deadmau5', opts, function (err, results) {
      if (err) return console.log(err)
      msg.channel.send(results)
      for (var i in results.items) {
        var item = results.items[i]
        msg.channel.sendMessage('[%s] Title: %s', item.id.videoId, item.snippet.title)
      }
    })
  }
})

client.login(config.token)
