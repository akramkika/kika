var YouTube = require('youtube-node')
var youTube = new YouTube()

module.exports = {
  searchYoutube: function (msg) {
    if (msg.content.startsWith('!youtube ')) {
      youTube.setKey('AIzaSyBqCmlXiZ1db_57J3LSqpaIFF-7B8DElLQ')

      if (msg.content.endsWith('--c')) {
        youTube.addParam('type', 'channel')
      } else if (msg.content.endsWith('--p')) {
        youTube.addParam('type', 'playlist')
      } else if (msg.content.endsWith('--v')) {
        youTube.addParam('type', 'video')
      } else {
        youTube.addParam('type', 'video')
      }

      if (msg.content.endsWith('--c') || msg.content.endsWith('--p') || msg.content.endsWith('--v')) {
        var a = (msg.content).length
        var b = a - 3
        var ask = msg.content.substring(9, b)
      } else {
        ask = msg.content.substring(9)
      }

      msg.channel.sendMessage('Hello, you ask for: ' + ask)

      youTube.addParam('order', 'relevance')

      youTube.search(ask, 3, function (error, result) {
        if (error) {
          console.log(error)
        } else {
          for (var i in result.items) {
            var item = result.items[i]
            msg.channel.send('Title: ' + item.snippet.title + '\nVideo: ' + item.snippet.thumbnails.default.url)
          }
        }
      })
      msg.channel.sendMessage('Finish your research with --v --c --p to search for video channel playlist')
    }
  }
}
