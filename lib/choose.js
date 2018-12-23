const embed = require('./embed')

var choose = function(word) {
  var token = word.split(',')
  var length = token.length
  var ran = Math.floor(Math.random() * length)
  return token[ran]
}

module.exports = function(word, client) {
  try {
    var chosen = choose(word)
    return embed.choose(chosen, client)
  } catch(err) { console.dir(err) }
}