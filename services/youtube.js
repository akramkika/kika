const config = require('../config.js')
var YouTube = require('youtube-node')
var youTube = new YouTube()

module.exports = {
  searchYoutube: function (msg) {
    if (msg.content.startsWith('!youtube ')) {
      youTube.setKey(config.youtubeKey)

      if (msg.content.endsWith('cha')) {
        var url = 'https://www.youtube.com/channel/'
        var tp = 'channel'
      } else if (msg.content.endsWith('pla')) {
        url = 'https://www.youtube.com/playlist?list='
        tp = 'playlist'
      } else if (msg.content.endsWith('vid')) {
        url = 'https://www.youtube.com/watch?v='
        tp = 'video'
      } else {
        url = 'https://www.youtube.com/watch?v='
        tp = 'video'
      }

      youTube.addParam('type', tp)

      if (msg.content.endsWith('cha') || msg.content.endsWith('pla') || msg.content.endsWith('vid')) {
        var a = (msg.content).length
        var b = a - 3
        var ask = msg.content.substring(9, b)
      } else {
        ask = msg.content.substring(9)
      }

      msg.channel.sendMessage('Hello, you search is: ' + ask + ' by ' + tp)

      youTube.addParam('order', 'relevance')

      youTube.search(ask, 3, function (error, result) {
        if (error) {
          console.log(error)
        } else {
          
          for (var i in result.items) {
            var item = result.items[i]
            msg.channel.send('\nTitle: ' + item.snippet.title)
            if (tp === 'video') {
              msg.channel.send('\nVideo: ' + url + item.id.videoId)
            } else if (tp === 'playlist') {
              msg.channel.send('\nVideo: ' + url + item.id.playlistId)
            } else {
              msg.channel.send('\nVideo: ' + url + item.id.channelId)
            }
          }
        }
      })
      msg.channel.sendMessage('-----------Résult-----------')
    }
  }
}
