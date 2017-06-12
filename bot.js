const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()
var youtube = require('./youtube.js')
var translate = require('./translate.js')
var pokemon = require('./pokemon.js')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
})

client.on('message', msg => {
  // Check if the message has been posted in a channel where the bot operates
  // and that the author is not the bot itself
  if (msg.content.lastIndexOf('!spotify') !== -1) {
  }
  // permet d'effectuer une recherche youtube
  youtube.searchYoutube(msg)

  // permet de traduire un message
  translate.translate(msg)

  // permet de rechercher un pokemon et le faire évoluer
  pokemon.pokemon(msg)
})

client.login(config.token)
