var Twitter = require('twitter')
var twitterclient = new Twitter(require('./config.js'))

module.exports = {
  sendTweet: function (msg) {
    if (msg.content.indexOf('!tweet ') !== -1) {
      if (msg.content.length <= 146) {
        twitterclient.post('statuses/update', {status: msg.content.substring(6)}, function (error, tweet, response) {
          if (error) {
            console.log(error)
            throw error
          }
          console.log(tweet)
          console.log(response)
        })
      } else {
        msg.channel.sendMessage('Le tweet est trop loooooooooong mamene...')
      }
    }
  }
}
