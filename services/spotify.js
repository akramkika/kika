const config = require('../config.js')
var SpotifyWebApi = require('spotify-web-api-node')
var spotifyApi = new SpotifyWebApi({
  clientId: config.clientId,
  clientSecret: config.clientSecret
})

module.exports = {
  spotify: function (msg) {
    if (msg.content.lastIndexOf('!spotify') !== -1) {
      spotifyApi.clientCredentialsGrant()

      // TOKEN
      .then(function (data) {
        // console.log(' Le token expire le : ' + data.body['expires_in'])
        // console.log('Voici le token : ' + data.body['access_token'])

        spotifyApi.setAccessToken(data.body['access_token'])
        // var result = msg.content.substring(msg.content.lastIndexOf('!spotify ') + '!spotify '.length, msg.content.length)

        if (msg.content.endsWith('--alb')) {
          var type = 0
        } else if (msg.content.endsWith('--art')) {
          type = 1
        } else if (msg.content.endsWith('--tra')) {
          type = 2
        } else {
          type = 2
        }

        if (msg.content.endsWith('--art') || msg.content.endsWith('--tra') || msg.content.endsWith('--alb')) {
          var a = (msg.content).length
          var b = a - 5
          var asw = msg.content.substring(9, b)
        } else {
          asw = msg.content.substring(9)
        }

        if (type === 0) {
          // ALBUMS
          spotifyApi.searchTracks('album:' + asw)
          .then(function (data) {
            msg.channel.sendMessage('ALBUMS - Résultats de votre recherche pour "' + asw + '"')
            if (data.body.tracks.items[0] === undefined || msg.content === ' ' || msg.content === '') {
              msg.channel.send("Votre recherche n'a pas abouti, veuillez rééssayer.")
            } else {
              for (let i = 0; i < data.body.tracks.items.length && i < 3; i++) {
                msg.channel.send('"' + data.body.tracks.items[i].album.name + '" de ' + data.body.tracks.items[i].artists[0].name + '\n' + data.body.tracks.items[i].external_urls.spotify)
              }
            }
          })
        }
        if (type === 1) {
          // ARTISTES
          spotifyApi.searchArtists(asw)
          .then(function (data) {
            msg.channel.sendMessage('ARTISTES - Résultats de votre recherche pour "' + asw + '"')
            if (data.body.artists.items[0] === undefined) {
              msg.channel.send("Votre recherche n'a pas abouti, veuillez rééssayer.")
            } else {
              for (let i = 0; i < data.body.artists.items.length && i < 3; i++) {
                msg.channel.send(data.body.artists.items[i].name + '\n' + data.body.artists.items[i].external_urls.spotify)
              }
            }
          })
        }
        if (type === 2) {
          // TRACKS
          spotifyApi.searchTracks('track:' + asw)
          .then(function (data) {
            msg.channel.sendMessage('TRACKS - Résultats de votre recherche pour "' + asw + '"')
            if (data.body.tracks.items[0] === undefined) {
              msg.channel.send("Votre recherche n'a pas abouti, veuillez rééssayer.")
            } else {
              for (let i = 0; i < data.body.tracks.items.length && i < 3; i++) {
                msg.channel.send('"' + data.body.tracks.items[i].name + '" de ' + data.body.tracks.items[i].artists[0].name + '\n' + data.body.tracks.items[i].external_urls.spotify)
              }
            }
          })
        }
        msg.channel.sendMessage('Vous pouvez affinez votre recherche avec --alb --art --tra pour rechercher un album, un artiste ou une track.')
      })
    }
  }
}
