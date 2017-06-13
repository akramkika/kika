var Twitter = require('twitter')
var twitterclient = new Twitter(require('../config.js'))

module.exports = {
  sendTweet: function (msg) {
    if (msg.content.startsWith('!tweet ')) {
      if (msg.content.length <= 146) {
        twitterclient.post('statuses/update', {status: msg.content.substring(6)}, function (error, tweet, response) {
          if (error) {
            console.log(error)
            throw error
          }
          msg.channel.send('Tweet envoyé !')
        })
      } else {
        msg.channel.send('Le tweet est trop loooooooooong...')
      }
    }
  },
  listenAccount: function (callback) {
    twitterclient.stream('statuses/filter', {track: '#botweet_jat'}, function (stream) {
      stream.on('data', function (tweet) {
        if (callback) {
          callback(tweet.text)
        }
      })
      stream.on('error', function (error) {
        console.log(error)
      })
    })
  }
}
