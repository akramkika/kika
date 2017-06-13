const config = require('../config.js')

module.exports = {
  translate: function (msg) {
    if (msg.content.startsWith('!translate ')) {
      var googleTranslate = require('google-translate')(config.apiKey)
      var txt = msg.content.substring(11)
      if ((txt).includes('--')) {
        var w = (msg.content.substring(0)).lastIndexOf('--')
        var n = w + 2
        var m = n + 2
        var lang = msg.content.substring(n, m)
        txt = msg.content.substring(11, w)
      } else {
        lang = 'en'
        txt = msg.content.substring(11)
      }
      googleTranslate.translate(txt, lang, function (err, translation) {
        if (err) {
          console.log(err)
        } else {
          msg.channel.send('Hello, you translate (in ' + lang + ') : ' + txt + ' ---> ' + translation.translatedText)
          // =>  Mi nombre es Brandon
        }
        msg.channel.sendMessage('Finish your research with --*language in abbreviation* (ex: --en for english) to translate in a specified language (english by default)')
      })
    }
  }
}
