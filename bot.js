const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()
var SpotifyWebApi = require('spotify-web-api-node')
var clientid = '132f44ff456c41d29d544a608b448bbd'
var clientSecret = '25d2c3ee445140bfa9aaa3d6bcdc194b'
var spotifyApi = new SpotifyWebApi({
  clientId: clientid,
  clientSecret: clientSecret
})
var result


client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
})

client.on('message', msg => {
  // Check if the message has been posted in a channel where the bot operates
  // and that the author is not the bot itself
  if (msg.content.lastIndexOf('!spotify') !== -1) {

    spotifyApi.clientCredentialsGrant()
      //TOKEN
      .then(function (data) {
        console.log(' Le token expire le : ' + data.body['expires_in'])
        console.log('Voici le token : ' + data.body['access_token'])


        spotifyApi.setAccessToken(data.body['access_token'])
        result = msg.content.substring(msg.content.lastIndexOf('!spotify ') + '!spotify '.length, msg.content.length)
        // ARTISTES
        spotifyApi.searchArtists(result)
              .then(function (data) {
                msg.channel.sendMessage('ARTISTES - Résultats de votre recherche pour "' + result + '"')
                for (var i = 0; i < 3; i++) {
                  msg.channel.sendMessage('"' + data.body.artists.items[i].name + '"')
                }
              })
        //ALBUMS
        spotifyApi.searchTracks('album:' + result)
        then(function (data) {
          msg.channel.sendMessage('ALBUMS - Résultats de votre recherche pour "' + result + '"')
          for (var i = 0; i < 3; i++) {
            msg.channel.sendMessage('"' + data.body.tracks.items[i].album.name + '" de ' + data.body.tracks.items[i].artists[0].name)
          }
          })

      // TRACKS
      spotifyApi.searchTracks('track:' + result)
            .then(function (data) {
              msg.channel.sendMessage('TRACKS - Résultats de votre recherche pour "' + result + '"')
              for (var i = 0; i < 3; i++) {
                msg.channel.sendMessage('"' + data.body.tracks.items[i].name + '" de ' + data.body.tracks.items[i].artists[0].name)
              }
            })
    })
  }
})

client.login(config.token)
