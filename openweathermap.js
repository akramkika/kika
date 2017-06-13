const config = require('./config.js')

var weather = require('node-rest-client-promise').Client()
var querystring = require('querystring')

var openWeatherMapQuery = querystring.stringify({
  units: 'metric',
  APPID: config.owm_token,
  mode: 'json',
  lang: 'fr'
})

module.exports = {
  Now: function (msg, callback) {
    if (msg.content.startsWith('!weather ')) {
      weather.getPromise('http://api.openweathermap.org/data/2.5/weather?q=' + msg.content.substring(9) + openWeatherMapQuery)
      .catch((error) => {
        throw error
      })
      .then((res) => {
        if (res.data.message === 'city not found') {
          msg.channel.send('Oups... Ville non répertoriée')
        } else {
          msg.channel.send('Météo actuelle sur ' + msg.content.substring(9) + ': ' + res.data.main.temp + '°C    Humidité: ' + res.data.main.humidity + '%    Ciel: ' + res.data.weather[0].description)
        }
        if (callback) {
          callback()
        }
      })
    }
  },
  Forecast: function (msg, callback) {
    if (msg.content.startsWith('!forecast ')) {
      weather.getPromise('http://api.openweathermap.org/data/2.5/forecast?lang=fr,q=' + msg.content.substring(10) + openWeatherMapQuery)
      .catch((error) => {
        throw error
      })
      .then((res) => {
        var text = ''
        var x = res.data.cnt / 5
        var i = 1
        for (var j = 1; j <= res.data.cnt; j = j + x) {
          if (j > 1) { text += '\n' }
          text += 'J+' + i + ' : Température : ' + res.data.list[j].main.temp + '°C   Ciel : ' + res.data.list[j].weather[0].description
          i++
        }
        msg.channel.send(text)
        if (callback) {
          callback(text)
        }
      })
    }
  }
}
