
module.exports = bot => {



    console.log(`${bot.user.username} is online`)
    //bot.user.setActivity("gg", {type: "PLAYING"});
    
    let statuses = [
        `${bot.guilds.size}!`,
        ">>help",
        `over ${bot.user.size} users!`

    ]

    setInterval(function() {
       let status = statuses[Math.floor(Math.random() * status.length)];
        bot.user.setActivity(status, {type: "PALYING"});
    }, 500)
}
