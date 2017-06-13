const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()
var youtube = require('./youtube.js')
var translate = require('./translate.js')
var pokemon = require('./pokemon.js')
var spotify = require('./spotify')
var weather = require('./services/openweathermap.js')
var twitter = require('./services/twitter.js')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
  twitter.listenAccount()
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

  // permet d'effectuer une recherche youtube
  youtube.searchYoutube(msg)

  // permet de traduire un message
  translate.translate(msg)

  // permet de tweeter avec l'utilisation de "!tweet"
  twitter.sendTweet(msg)

  // permet de rechercher un pokemon et le faire évoluer
  pokemon.pokemon(msg)

  // permet d'effectuer une recherche spotify
  spotify.spotify(msg)

  weather.Now(msg)
  weather.Forecast(msg)
})
client.login(config.token)
