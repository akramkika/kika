const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()
var Twitter = require('twitter')

var twitterclient = new Twitter({
  consumer_key: '2i0pUPgNow0UxEfqaRLAoSpdZ',
  consumer_secret: 'tOesWjSJN5IlspYu9oPMMJN8q8qdu0gYffZkx1lRjnE5rfcuIK',
  access_token_key: '864107579680731136-bXEcBf0JwcY0mxvMyreu0jAd6spn3rJ',
  access_token_secret: 'eDX69eMS9RoWkUnIRpOsoKeZnT8W1qhyoiiJHrgBvw0Kb'
})

twitterclient.post('statuses/update', {status: 'I Love Twitter'}, function (error, tweet, response) {
  if (error) throw error;
  console.log(tweet)
  console.log(response)
})

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
})

client.login(config.token)
