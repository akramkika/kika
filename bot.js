const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()
var twitter = require('./services/twitter.js')

function sendMessage (content) {
  console.log(content)
  for (var channel of client.channels) {
    var c = client.channels.get(channel[0])
    c.send('Tweet reçu sur #botweet_jat :  ' + content)
  }
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
  // fonction d'écoute sur #botweet_jat
  twitter.listenAccount(sendMessage)
})

client.on('message', msg => {
  // Check if the message has been posted in a channel where the bot operates
  // and that the author is not the bot itself
  if (msg.channel.type !== 'dm' && (config.channel !== msg.channel.id || msg.author.id === client.user.id)) return
  // dm=directmessage
  // If message is hello, post hello too
  if (msg.content === 'hello') {
    msg.channel.send('Hello to you too, fellow !')
  }
  // permet de tweeter un message grâce à la commande !tweet
  twitter.sendTweet(msg)
})
client.login(config.token)
