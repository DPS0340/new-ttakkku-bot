module.exports.ping = function(client) {
  return {
    embed: {
      color: '3447003',
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      title: '핑',
      fields: [{
            name: Math.round(client.ping) + 'ms',
            value: "핑은 봇이 돌아가는 서버에서 측정되었습니다."
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© TTAKKKU All rights reversed"
        }
    }
  }
}

module.exports.uptime = function (client) {
  var day = Math.floor((client.uptime) / 24 / 60 / 60 / 1000)
  var temp = day * 24 * 60 * 60 * 1000
  var hour = Math.floor((client.uptime) / 60 / 60 / 1000)
  temp += hour * 60 * 60 * 1000
  var min = Math.floor((client.uptime - temp) / 60 / 1000)
  temp += min * 60 * 1000
  var sec = Math.floor((client.uptime - temp) / 1000)
  temp += sec * 1000
  var ms = client.uptime - temp

  return {
    embed: {
      color: '3447003',
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      title: '업타임',
      fields: [{
        name:  day + '일 ' + hour + '시간 ' + min + '분 ' + sec + '.' + ms + '초',
        value: "업타임은 봇이 돌아가는 서버에서 측정되었습니다."
      }],
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: "© TTAKKKU All rights reversed"
      }
    }
  }
}

module.exports.help = function (client, prefix) {
  return {
    embed: {
      color: '3447003',
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      title: '명령어',
      fields: [{
        name: '>>문의',
        value: "문의를 해줍니다"
      },
    {
      name: '>>help',
      value: "더 자세히 알려줍니다."
    }],
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: "© TTAKKKU All rights reversed"
      }
    }
  }
}

module.exports.help_func = function (client, prefix) {
  return {
    embed: {
      color: '3447003',
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      title: '기능도움',
      fields: [{
          name: prefix + '핑',
          value: "봇의 핑을 보여줍니다."
        },
        {
          name: prefix + '업타임',
          value: '봇이 작동한 시간을 보여줍니다.'
        }
      ],
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: "© Starlight#7528 All rights reversed"
      }
    }
  }
}

module.exports.choose = function(chosen, client) {
  return {
    embed: {
      color: '3447003',
      title: '봇의 선택',
      fields: [{
          name: ''+chosen,
          value: "봇의 선택입니다."
        }],
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: "© TTTAKKKU All rights reversed"
      }
    }
  }
}
