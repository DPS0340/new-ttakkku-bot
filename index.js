const config = require("./config.json");
const Discord = require("discord.js");
const Embed = require("./lib/embed.js");
const choose = require('./lib/choose');
const fetch = require('node-fetch');
const roles = require("roles");
const bot = new Discord.Client();
const client = new Discord.Client();
const dscl = new Discord.Client();
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
let xp = require("./xp.json");
bot.afk = new Map();
const superagent = require("superagent");
const fortnite = require('fortnitetracker-7days-stats');
const weather = require('weather-js');
const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const google = require("google");



bot.commands = new Discord.Collection();
let coins = require("./coins.json");
let purple = botconfig.purple;
let cooldown = new Set();
let cdseconds = 5;



let statuses = [`>>help`, `>>도움`, `딱구 봇 문의는 딱구#6166`]
const prefix = config.prefix;
function RandInt(max) {
  return Math.round(Math.random() * max);
}
fs.readdir("./commands/", (err, files) => {

  if (err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});


var rArraya = [`xp 따라하세요!`];
var helloArray = ["그래", "ㅃㅃ", "왜"];
var AnswerArray = [`확실합니다.`, "아마 아닐 것 같아요.", "아니오", "절대 아닙니다.", "잘 모르겠네요.", "확실합니다.", "왜 물어봐"];
var rArray = ["**1**이 나왔습니다", "**3**이 나왔습니다", "**2**이 나왔습니다", "**4**이 나왔습니다", "**5**이 나왔습니다", "**6**이 나왔습니다"]
var aArray = ["1%", "2%", "3%", "4%", "5%", "6%", "7%", "8%", "9%", "11%","10%", "12%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%", "측정 불가(너무 높습니다)", "측정 불가(너무 낮습니다)"]
client.on("ready", () => {
  console.log(`딱구 봇 is online`);

 setInterval(function() {
  let status = statuses[Math.floor(Math.random()*statuses.length)];

  client.user.setPresence({ game: { name: status }, status: `dnd`});
  answered = true;
  cAnswer = "";
  userAnswer = "";


}, 4000)
});
bot.on("message", async message => {

  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (message.author.id === `284658034179833866`) return;//
  if (message.author.id === `444117332143374337`) return;//



  if (message.content.startsWith(">>serverlist")) {
    let bicon = bot.user.displayAvatarURL;
    let string = '';
    bot.guilds.forEach(guild => {
      string += guild.name + '\n';
    })
    let bt = bot.user.username;
    let botembed = new Discord.RichEmbed()
      .setColor("#000FF")
      .addField("Servers In", string)
      .setTimestamp()
      .setFooter("Command Ran By: " + message.author.username, message.author.avatarURL);
    message.channel.send(botembed);
  }


  if (message.content.startsWith(">>level")) {
    if (!xp[message.author.id]) {
      xp[message.author.id] = {
        xp: 0,
        level: 1
      };
    }
    let curxp = xp[message.author.id].xp;
    let curlvl = xp[message.author.id].level;
    let nxtLvlXp = curlvl * 300;
    let difference = nxtLvlXp - curxp;

    let lvlEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.username)
      .setColor(purple)
      .addField("Level", curlvl, true)
      .addField("XP", curxp, true)
      .setFooter(`${difference} XP til level up`, message.author.displayAvatarURL);

    message.channel.send(lvlEmbed)
  }
  if (message.content.startsWith(">>coins")) {
    if (!coins[message.author.id]) {
      coins[message.author.id] = {
        coins: 0
      };
    }

    let uCoins = coins[message.author.id].coins;


    let coinEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.username)
      .setColor("#00FF00")
      .addField("💸", uCoins);

    message.channel.send(coinEmbed)
  }


  if(message.content.startsWith(`>>reload`)) {
  
    message.channel.send({embed:{description:"다시 봇 작동 힙니다"}})
    message.channel.send("봇 작동 완료!")
  }
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if (!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }

  if (!coins[message.author.id]) {
    coins[message.author.id] = {
      coins: 0
    };
  }

  let coinAmt = Math.floor(Math.random() * 15) + 1;
  let baseAmt = Math.floor(Math.random() * 15) + 1;
 

  if (coinAmt === baseAmt) {
    coins[message.author.id] = {
      coins: coins[message.author.id].coins + coinAmt
    };
    fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
      if (err) console.log(err)
    });
    let coinEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.username)
      .setColor("#0000FF")
      .addField("💸", `${coinAmt} coins added!`);

    message.channel.send(coinEmbed)
  }

  let xpAdd = Math.floor(Math.random() * 7) + 8;


  if (!xp[message.author.id]) {
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }


  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 300;
  xp[message.author.id].xp = curxp + xpAdd;
  if (nxtLvl <= xp[message.author.id].xp) {
    xp[message.author.id].level = curlvl + 1;
    let lvlup = new Discord.RichEmbed()
      .setTitle("Level Up!")
      .setColor(purple)
      .addField("New Level", curlvl + 1);

    message.channel.send(lvlup)
  }
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if (err) console.log(err)
  });
  let prefix = prefixes[message.guild.id].prefixes;
  if (!message.content.startsWith(prefix)) return;
  if (cooldown.has(message.author.id)) {
    message.delete();
    return message.reply("You have to wait 5 seconds between commands.")
  }
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    cooldown.add(message.author.id);
  }
  if (!xp[message.author.id]) {
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }


  let nxtLvlXp = curlvl * 300;
  let difference = nxtLvlXp - curxp;


  
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(bot, message, args);

  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdseconds * 1000)
});




   dscl.on("message", (message)=> {
    if(message.author.bot) return;
     if (message.author.id === `284658034179833866`) return;//
     if (message.author.id === `444117332143374337`) return;//
     if (message.channel.type === "dm") return;
        var msg = message.content.split(" ");
        var cmd = msg[0];
      
        if(cmd === `${prefix}fafaf`) {
          message.channel.send('전송 중~').then(function(ping) {
            ping.edit(`:ping_pong:  ${ping.createdTimestamp - message.createdTimestamp}ms가 소요되었습니다.`)
          })




        }



      
        
        if(cmd === `${prefix}fix`) {
          message.channel.send('고치는 중').then(function(ping) {
            ping.edit(`3`)
            ping.edit(`2`) 
            ping.edit(`1`)
            ping.edit(`고쳤습니다`)                     

          })

 
        if(message.content.startsWith(`${prefix}server`) ){
            message.channel.send(`서버 이름: ${message.guild.name}\n멤버: ${message.guild.memberCount}`);
        }
        else if (message.content.startsWith(`${prefix}user`) ){
            message.channel.send(`네 이름: ${message.author.username}\n너의 아이디: ${message.author.id}`);
        }
        switch (cmd) {
           case `${prefix}안녕`:
                message.channel.send(helloArray[RandInt(3)]);

                break;
           
        }
      } 
      switch (cmd) {
        case `${prefix}가위 바위 보`:
             message.channel.send("ok 하자");
             break;
      }
        if (cmd === `${prefix}질문`) {
          var textTemp = '';
          for (var i = 1;i<msg.length;i++) {
              textTemp = textTemp + ' ' + msg[1];
            message.channel.send(AnswerArray[RandInt(6)]);
            message.react('🤔')
            break;
          }
        }     

     if (cmd === `${prefix}주사위`)
        message.channel.send('굴러가는 중~').then(function(pong) {
          pong.edit(rArray[RandInt(6)]);
          message.react('🤔')
        })
        if (cmd === `${prefix}확률`)
        message.channel.send('계산 중~~').then(function(p0ng) {
          p0ng.edit(aArray[RandInt(25)]);
          message.react('🤔')
        })       

  if(cmd === `${prefix}serverinfo`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount)
    .addField("roles", message.guild.roles)
    .addField("owner", message.guild.owner)
    .addField("channel", message.guild.channels/message.guild.voiceChannel)
    .addField("id", message.guild.id);
    return message.channel.send(serverembed);
  
  }
     if (cmd === `${prefix}퀴즈`) {
       message.channel.send(rArraya[RandInt(1)])
        message.channel.send('`5초`이내 답을 적어주세요 \n 답이 아니면 아니라고 답이 안옵니다 \n 답 적는 거는 `>>(정답)`하세요!');
       }
  if(cmd === `${prefix}정보`){


    let serverebed = new Discord.RichEmbed()
    .setTitle("정보")
    .setColor("#15f153")
    .addField("유저 수", bot.users.size)
    .addField("서버 수", bot.guilds.size)
    return message.channel.send(serverebed);
  
  }   
  

 
  if (message.content === '>>과일') {
    message.react('🍎');
    message.react('🍊');
    message.react('🍇');
     } 
  if (message.content === '>>x') {
    const emoji = message.guild.emojis.find('name', 'No');
    message.react(emoji);
}
     
if(message.content.startsWith(`>>마마무 정보`)){

    
     var serverebed = new Discord.RichEmbed()
 
     .setColor("#cc00ff")    
     .setThumbnail('https://cdn.discordapp.com/attachments/517265813841903636/518100229661130763/nF6jTeZV_400x400.jpg')
     .addField("마마무 정보", "다음은 마마무의 대한 정보 입니다.")   
     .addField('마마무 데뷔일', '2014년 4월 19일', true)     
     .addField('마마무 데뷔곡', 'Mr.애매모호', true)
     .addField('마마무 멤버', '솔라 문별 휘인 화사', true)
     .addBlankField()
     .addField("수상", "2018년 아시아 아티스트|어워즈 베스트 뮤직 \n2018년 아시아 아티스트 어워즈|가수부문 올해의 아티스트\n 2017년 제6회 가온차트 뮤직 어워즈| 올해의 가수상 음원부문 2월")
     .setImage('https://cdn.discordapp.com/attachments/513702147758489612/518086649205227530/fe3a7ace4a60c258.jpg')
     .setTitle('__**마마무 자세히 알아보기**__')
     .setURL('https://search.naver.com/search.naver?where=nexearch&sm=tab_jum&query=%EB%A7%88%EB%A7%88%EB%AC%B4')
     .setAuthor('마마무', 'https://cdn.discordapp.com/attachments/517265813841903636/518101030530056202/download.jpg')              
     .setFooter("By:딱구#6166, Thanks:작별#1222", client.user.avatarURL);
  
    return message.channel.send(serverebed);
  }  


  if(cmd === `${prefix}관리자`){

    
    let serverembed = new Discord.RichEmbed()
    .setTitle("관리자 명령어")
    .setColor("#15f153")
    .addField("명령어들", "준비 중");
    return message.channel.send(serverembed);
  }
        if (cmd === `${prefix}봇정보`) {
          var InfoEmbed = new Discord.RichEmbed()
                .setColor("#2fce64")
                .setTitle(`딱구 봇의 정보`)
                .setThumbnail(client.user.avatarURL)
                .addField("만들어진 시각", dscl.user.createdAt)
                .addField("봇 이름", dscl.user.username)
                .addField("봇에 있는 서버 개수", bot.guilds.size)
                .setImage(``)
                .setFooter("딱구 봇", client.user.avatarURL);

                message.channel.send(InfoEmbed);
        }

            if (message.content.startsWith(`${prefix}ban`)) {
          
              const user = message.mentions.users.first();
          
              if (user) {
          
                const member = message.guild.member(user); 
          
                if (member) {
          
                  member.ban({
                    reason: '당신은 이 서버의 규칙을 어기셨으므로 관리자의 결정에 따라 밴이 되셨습니다.',
                  }).then(() => {
          
                    message.reply(`${user.tag}이/가 성공적으로 밴되었습니다.`);
                  }).catch(err => {
          
                    message.reply('해당 유저가 저의 권한보다 높거나 같기 때문에 밴을 시킬 수 없습니다.');
          
                    console.error(err);
                  });
                } else {
          
                  message.reply('해당 유저가 이 디스코드 방에 없습니다!');
                }
              } else {
          
                message.reply('당신은 해당 유저를 밴시킬 권한이 없습니다.');
              }
            }
            if (message.content === '>>news') {
              message.channel.send(":loudspeaker:딱구 ~~막장~~ 소식:loudspeaker:\n`0시00분`에 **wiki**님이 서버를 폭화했습니다\n`10시30분`에 파이봇이 만들어졌다");
            }  
            if (cmd === `>>생일축하`) {
              message.channel.send(`__**yelin1131409**__ 와 __**[13년산 산삼_]٩( ๑•ω•๑)۶ (*ฅ́˘ฅ̀*)**__입니당!`);
            }         
            if (message.content.startsWith(`${prefix}1123213123`)) {
            message.delete(2)
            .then(msg => console.log(`Deleted message from ${msg.author.username}`))
            .catch(console.error);
            message.channel.send('허브봇 `OFF`')
            }

            if (message.content.startsWith(`${prefix}21313`)) {
            message.channel.send(Embed.pong)
            }
            if (message.content.startsWith(`${prefix}123213231`)) {
              message.delete(2)
              .then(msg => console.log(`Deleted message from ${msg.author.username}`))
              .catch(console.error);
              message.channel.send('허브봇 `ON`')
              }   
              if (message.content.startsWith(`${prefix}clean`)) {
                message.clearReactions()
                .then(msg => console.log(`Deleted message from ${msg.author.username}`))              
                .catch(console.error);
              }
              if (message.content.startsWith(`${prefix}호출`)) {
                message.delete(2)
                .then(msg => console.log(`Deleted message from ${msg.author.username}`))
                .catch(console.error);                         
                message.channel.send(`출동`) 
              }
              if (message.content.startsWith(`${prefix}clean`)) {
                message.delete(2)
                .then(msg => console.log(`Deleted message from ${msg.author.username}`))
                .catch(console.error);           
              }
              if (message.content.startsWith(`${prefix}너 산삼이야?`)) {
                message.delete(2)
                .then(msg => console.log(`Deleted message from ${msg.author.username}`))
                .catch(console.error);
                message.channel.send('허브님에게 ~~조심 조심~~')
                }       
                if(message.content.startsWith( `${prefix}산삼봇 출동!`)) {
                  message.channel.send("얍!");
              }
              if(message.content.startsWith( `${prefix}산삼봇 정보`)) {
              
                  message.reply("\n:arrow_forward:**산삼봇**은 **허브님의 봇**입니다\n:arrow_forward:__**저작권은 딱구에게 있습니다**__\n:arrow_forward:그리고 **봇이 생긴 날짜**는 __**11월20일**__에 생겼습니다");
              }
              
              if(message.content.startsWith( `${prefix}level up`)) {
              
                message.reply("http://bitly.kr/TFET");
            }
            if(message.content.startsWith( `${prefix}help`)) {
              var InfoEmbed = new Discord.RichEmbed()
              .setColor("#2fce64")
              .setTitle(`봇의 대개편`)
              .setThumbnail('https://cdn.discordapp.com/attachments/517265813841903636/518409505097383943/4144.gif')
              .addField(`딱구 봇에 추가 할 것`, `음악봇의 기능|kick와 ban 기능|등등많이 추가합니다!!`)

              .setFooter("딱구 봇", client.user.avatarURL);

              message.author.send(InfoEmbed);
              message.channel.send("메세지를 :regional_indicator_d::regional_indicator_m:로 보냈습니다."); 
              
      }              
      if (message.content.startsWith(`${prefix}webhook`)) {
        message.channel.send(`${prefix}hook <title>, <message>, [HEXcolor], [avatar]\n\n**<> is required\n[] is optional**`)
      }          
                    if (message.content.startsWith(`카트라이더`)) {
                      message.delete(2)
                      .then(msg => console.log(`카트라이더 Deleted message from ${msg.author.username}`))
                      .catch(console.error);
                      message.reply(' 저런! 노잼게임은 듣는 사람과 말하는 사람의 건강이 나빠져요. 주의하세요.')
                       }       
                    if(message.content.startsWith( `${prefix}지하철소리`)) {
                      message.channel.send("주소 없어요__**(저작권 때문)**__")               
                    
                      message.reply("진짜 추억이네요(2018월5월1일에 바뀜)")      
                  
                    }//욕설 방지
                    if (message.content.startsWith(`시발`)) {
                      message.delete(2)
                      .then(msg => console.log(`시발 Deleted message from ${msg.author.username}`))
                      .catch(console.error);
                      message.reply(' 저런!  듣는 사람과 말하는 사람의 건강이 나빠져요. 주의하세요.')
                       } 
                       if (message.content.startsWith(`씨발`)) {
                        message.delete(2)
                        .then(msg => console.log(`씨발 Deleted message from ${msg.author.username}`))
                        .catch(console.error);
                        message.reply(' 저런!  듣는 사람과 말하는 사람의 건강이 나빠져요. 주의하세요.')
                        
                      }                              
                      if (message.content.startsWith(`ㅁㅊ`)) {
                        message.delete(2)
                        .then(msg => console.log(`ㅁㅊ Deleted message from ${msg.author.username}`))
                        .catch(console.error);
                        message.reply(' 저런!  듣는 사람과 말하는 사람의 건강이 나빠져요. 주의하세요.')
                         }                                            
                      if(message.content.startsWith( `${prefix}사진Mee6 First server season`)) {
                      message.channel.send("https://cdn.discordapp.com/attachments/513661472321306636/515910999036133376/gfsfsfsdfsdfsdfsf.PNG")               
            
                  
                    }
                    if(message.content.startsWith( `${prefix}사진딱구봇 멸망`)) {
                      message.channel.send("https://cdn.discordapp.com/attachments/513702147758489612/518615863667064856/unknown.png")               
            
                  
                    }
                    if(message.content.startsWith( `${prefix}사진노림수`)) {
                    message.channel.send("https://cdn.discordapp.com/attachments/513661472321306636/515819498423582720/asdasdsadsad.PNG")               
          
                }                                               
                if(message.content.startsWith( `${prefix}사진떡밥`)) {
                  message.channel.send("https://cdn.discordapp.com/attachments/513661472321306636/515918254531936269/afsdfaffdaffa.PNG")               
        
              }                   
              if(message.content.startsWith( `${prefix}사진디코의 현실`)) {
                message.channel.send("https://cdn.discordapp.com/attachments/513661472321306636/515921865013985311/adsdadasdad.PNG")               
      
            }                        
            if(message.content.startsWith( `${prefix}사진허브봇 고백`)) {
              message.channel.send("https://cdn.discordapp.com/attachments/513661472321306636/516103336567504911/afsfafs.PNG")               
    
          }                                       
            if(message.content.startsWith( `${prefix}사진내일 지구상황`)) {
              message.channel.send("https://cdn.discordapp.com/attachments/513661472321306636/515922935412948992/unknown.png")               
    
          }                                    
     if (message.content.startsWith(`${prefix}사진현2`)) {
       message.channel.send("https://cdn.discordapp.com/attachments/513661472321306636/521294095105261578/unknown.png")

     }           
          if(message.content.startsWith('>>유저사진')) {  

            let domgembed2 = new Discord.RichEmbed()
            
            .setTitle("유저 사진")
            .setImage(message.author.avatarURL);
            message.channel.send(domgembed2);
            
            
            
            
             
            
            }
          if(message.content.startsWith( `${prefix}사진허브봇 죽음`)) {
            message.channel.send("https://cdn.discordapp.com/attachments/513702147758489612/516104740325556237/00eaffe9b14f3dab.JPG")               
  
        }               
     if (message.content.startsWith(`${prefix}사진내성봇 사망?`)) {
       message.channel.send("https://cdn.discordapp.com/attachments/513702147758489612/521294199665197057/unknown.png")

     }  
        if(message.content.startsWith( `${prefix}사진허브봇 js 배신`)) {
          message.channel.send("https://cdn.discordapp.com/attachments/513702147758489612/516104343422763014/js_.JPG")               
        }
        if(message.content.startsWith( `${prefix}사진허브봇 python 좋아함`)) {
          message.channel.send("https://cdn.discordapp.com/attachments/513702147758489612/516104444841164800/4f31778bb56ce123.JPG")               
         }              
         if(message.content.startsWith( `${prefix}사진허브봇의 사생활`)) {
          message.channel.send("https://cdn.discordapp.com/attachments/513661472321306636/515922935412948992/unknown.png")               
         }           
         if(message.content.startsWith( `${prefix}t`)) {
          message.author.send(client.user.avatarURL)            
         }           
         if(message.content.startsWith( `${prefix}사진음모론`)) {
          message.channel.send("https://cdn.discordapp.com/attachments/517265813841903636/518617904539762690/aaaa.PNG")               
         }
         if(message.content.startsWith( `${prefix}사진현실`)) {
          message.channel.send("https://cdn.discordapp.com/attachments/481430756514856982/518618701130366978/unknown.png")               
         }
         if (message.content.startsWith('>>마인크래프트')) {
          message.channel.send("`>>마크 도전과제`\n`>>마크 명령어`\n`>>마크 역사`\n`>>마크 서버리스트`\n을/를 입력하세요!")
        }          
         if(message.content.startsWith( `${prefix}마크 도전과제`)) {//마크 임
          message.channel.send("`>>마크 minecraft` \n`>>마크 네더` \n`>>마크 the end` \n`>>마크 모험` \n`>>마크 농사` 중에서 입력하세요! \n 그리고 `>>마크 검색 (발전과제 이름)` 하면 달성 조건이 나옵니다!")               
         }         
         if (message.content.startsWith('>>마크 minecraft')) {
          message.channel.send(`Minecraft`)
          message.channel.send(`석기 시대`)
          message.channel.send(`더욱 더 좋게`)
          message.channel.send(`철이 철철 넘쳐`)
          message.channel.send(`차려입기\n화끈한 화제 \n이젠 철 좀 들어라 \n저희는 그런 것 받지 않습니다 \n아이스 버킷 챌린지\n다이아몬드다! \n더 깊은 곳으로 \n다이아몬드로 날 감싸줘 \n마법 부여자 \n좀비 의사 \n다이아몬드다! \n더 깊은 곳으로 \n다이아몬드로 날 감싸줘 \n마법 부여자 \n좀비 의사`)//

        }
        if (message.content.startsWith('>>마크 네더')) {
          message.channel.send("네더 \n천 리 길도 한 걸음 \n끔찍한 요새\n 전해지지 않은 러브레터 \n으스스한 스켈레톤 \n쉽지 않은 동행\n 물약 양조자 \n시들어버린 언덕 \n뿅가는 폭탄주 \n신호기 꾸리기 \n어쩌다 이 지경까지 \n신호자");
        }        
        if (message.content.startsWith('>>마크 the end')) {
          message.channel.send("개발 중")
        }          
        if (message.content.startsWith('>>마크 모험')) {
          message.channel.send("개발 중")
        }          
        if (message.content.startsWith('>>마크 농사')) {
          message.channel.send("개발 중")
        }          
        if(message.content.startsWith( `${prefix}개발`)) {
          message.channel.send(":ballot_box_with_check: https://minecraft-ko.gamepedia.com/%EB%B0%9C%EC%A0%84_%EA%B3%BC%EC%A0%9C :regional_indicator_x: ");               
         }

         if(message.content.startsWith( `${prefix}명언`)) {
          message.channel.send("개발 중")               
   
      }  
      if(message.content.startsWith( `${prefix}마크 명령어`)) {
        message.channel.send("개발 중")               
 
    }        
      if(message.content.startsWith( `${prefix}산삼`)) {
        message.channel.send("https://cdn.discordapp.com/attachments/481430756514856982/520519371135647744/1544098866106.gif")               

    }          
    if(message.content.startsWith( `${prefix}마크 검색 `)) {
      message.channel.send("개발 중")               

  }   
  if(message.content.startsWith( `${prefix}마크 역사`)) {
    message.channel.send("개발 중")               

}   
if(message.content.startsWith( `${prefix}마크 서버리스트`)) {
  message.channel.send("개발 중")               

} 
if(message.content.startsWith( `${prefix}중딩2년의 라이프`)) {
  message.channel.send("중2병 걸리고 싶니?")               

} 
if(message.content.startsWith( `${prefix}내성위키`)) {
  message.channel.send("**내성**:시험 끝나고 16일")               

} 

if (cmd === `${prefix}사진`) {
              var InfoEmbed = new Discord.RichEmbed()
                .setColor("#2fce64")              
                .addField(`:white_check_mark: 커스텀 보기 :white_check_mark: `,`노림수|Mee6 First server season|내성봇 사망?|현2|떡밥|디코의 현실|내일 지구상황|허브봇 고백|허브봇 python 좋아함|허브봇 js 배신|허브봇 죽음|딱구봇 멸망|음모론|현실`)            
                .addField(`:white_check_mark: 커스텀 보기는 먼저>>사진(이름)을 하면 됩니다:white_check_mark:`, `제발 해주세요;;;`)
                .setFooter("딱구 봇", client.user.avatarURL);
    
                message.channel.send(InfoEmbed);
            }
            if (cmd === `${prefix}1호선`) {
              var InfoEmbed1 = new Discord.RichEmbed()
              .setColor("RANDOM")
              .setAuthor(`노선 주인장`, `https://cdn.discordapp.com/attachments/517265813841903636/520542485370372107/download.png`)
              .setTitle(`:tram: **1호선**:tram:`)                                                                                
              .setImage('https://cdn.discordapp.com/attachments/520196482712993803/520556205920354315/Busan_metro_line_1.jpeg');
            
             message.channel.send(InfoEmbed1);
            
            }           
            if (cmd === `${prefix}2호선`) {
              var InfoEmbed1 = new Discord.RichEmbed()
              .setColor("RANDOM")
              .setAuthor(`노선 주인장`, `https://cdn.discordapp.com/attachments/517265813841903636/520542485370372107/download.png`)
              .setTitle(`:tram: **2호선**:tram:`)                                                                                
              .setImage('https://cdn.discordapp.com/attachments/520196482712993803/520556204880035841/ee1d3691d70213578182d57afce25157db9448916f3099cade032ef38062ac75570e6532efe0c928e2af73bf1d283b3b5772.jpeg');
            
             message.channel.send(InfoEmbed1);
            
            }                      
            if (cmd === `${prefix}3호선`) {
              var InfoEmbed1 = new Discord.RichEmbed()
              .setColor("RANDOM")
              .setAuthor(`노선 주인장`, `https://cdn.discordapp.com/attachments/517265813841903636/520542485370372107/download.png`)
              .setTitle(`:tram: **3호선**:tram:`)                                                                                
              .setImage('https://cdn.discordapp.com/attachments/520196482712993803/520556205475889153/8094231ac78fd7c016d24708a8407f768eeff81dd560a9dd3e732372fbc006f79d3cb554e74166205aa083267ca238c9099b.jpeg');
            
             message.channel.send(InfoEmbed1);
            
            }            
            if (cmd === `${prefix}4호선`) {
              var InfoEmbed1 = new Discord.RichEmbed()
              .setColor("RANDOM")
              .setAuthor(`노선 주인장`, `https://cdn.discordapp.com/attachments/517265813841903636/520542485370372107/download.png`)
              
              .setTitle(`:tram: **4호선**:tram:`) 
              .addField("(401-406)\n 부산도시철도 4호선 \n 401 미남 (환승역, 3호선) \n 주변 장소 : 미남교차로, 온천2동 치안센터, 광혜병원, 세화병원\n 빠른 환승 : 5-1 5-2 \n위치 : 부산광역시 동래구 온천동 충렬대로, 아시아드대로\n 출구 : 7, 8, 9, 10, 11, 12, 13, 14번", "402 동래 (환승역, 1호선)\n 주변 장소 : 동래역, 명륜1번가, 메가마트, 대동병원, 온천천, 부산내성중학교, 동래시외버스정류소, 한국건강관리협회 부산시지부, 내산초등학교, 온천2동 행정복지센터 \n빠른 환승 : 1-1 \n 위치 : 부산광역시 동래구 온천동 충렬대로 \n출구 : 5, 6, 7, 8번 \n 403 수안 주변 \n장소 : 수안교차로, 동래구청, 임진왜란전쟁역사관(역내), 명륜1번가, 메가마트 동래점, 동래시장, 수안 119 안전센터, 수안동 우체국, 동래경찰서\n BRT(버스중앙차로)와 환승 가능 위치 : 부산광역시 동래구 수안동, 명륜동 충렬대로 404 낙민 (간접환승역, 동해남부선) \n주변 장소 : 동래고등학교, 낙민초등학교, 동래시장, 내성초등학교BRT\n(버스중앙차로)와 환승 가능위치 : 부산광역시 동래구 낙민동, 복산동 \n충렬대로출구 : 1, 2, 3, 4번\n405 충렬사주변 \n장소 : 안락교차로, 충렬사, 서원시장, 부산항운병원, 동래봉생병원\n위치 : 부산광역시 동래구 안락동 반송로\n출구 : 1, 2, 3, 4번 \n406 명장주변 \n장소 : 명장1동 행정복지센터, 안락초등학교, 혜화초등학교, 혜화여자중학교, 혜화여자고등학교, 충렬초등학교, 충렬중학교, 충렬고등학교, 명동초등학교, 금정고등학교, 금정동 우체국, 부산맹학교, 동신중학교, 학산여자고등학교, 학산여자중학교, 명장초등학교, 명장2동 행정복지센터, 명장도서관, 대명여자고등학교\n위치 : 부산광역시 동래구 명장동 반송로\n출구 : 1, 2, 3, 4번")                                                                               
              .addField("407 서동\n주변 장소 : 금사사거리, 서2동 행정복지센터, 서동미로시장, 서2치안센터, 동상초등학교, 명서초등학교\n위치 : 부산광역시 금정구 서동 반송로\n출구 : 1, 2, 3, 4번\n408 금사\n주변 장소 : 금사요양병원, 반여4동 행정복지센터, 금정구 종합사회 복지관, 서금지구대, 삼어초등학교\n위치 : 부산광역시 금정구 금사동 반송로", "409 반여농산물시장\n주변 장소 : 반여농산물도매시장, 해운대 수목원, 석대도시 첨단산업단지, 반석초등학교, 석대화훼단지위치 : 부산광역시 해운대구 석대동 반송로출구 : 1, 2번410 석대\n주변 장소 : 해운대구 자원 재활용센터, 반석교\n위치 : 부산광역시 해운대구 석대동 석대천로\n출구 : 1, 2번\n411 영산대(아랫반송)\n주변 장소 : 영산대학교 해운대 캠퍼스, 성심보건고등학교, 반송골목시장, 꽃다래공원, 부산시립 반송도서관, 반송1동  행정복지센터, 반송동 우체국, 반송시장, 반송 119 안전센터, 반석파출소, 반송초등학교, 반송중학교, 반송3동 경로당, 행복가득 복지센터\n위치 : 부산광역시 해운대구 반송동 반송로\n출구 : 1, 2, 3번\n412 동부산대학(윗반송)\n주변 장소 : 동부산대학교, 운송중학교, 반송여자중학교, 반송2동 행정복지센터, 반송2동 우체국, 송운초등학교, 운봉초등학교\n위치 : 부산광역시 해운대구 반송동 반송로\n출구 : 1, 2, 3, 4번\n413 고촌\n위치 : 부산광역시 기장군 철마면 반송로\n출구 : 1, 2, 3, 4번 \n414 안평(고촌주택단지)\n주변 장소 : 경전철운영사업소, 고촌마을, 안평마을, 신진초등학교\n위치 : 부산광역시 기장군 철마면\n출구 : 1, 2, 3, 4번")
              .setImage('https://cdn.discordapp.com/attachments/520196482712993803/520556205920354314/449d6dc045e140bf7558f91fb93bbc841eeeffdd139d149a79765e4b296473c71f2e1104f3d26111e852eb009419cc70022a.jpeg');
            
             message.channel.send(InfoEmbed1);
            
            }                    
            if (cmd === `${prefix}부산김해경전철`) {
              var InfoEmbed1 = new Discord.RichEmbed()
              .setColor("RANDOM")
              .setAuthor(`노선 주인장`, `https://cdn.discordapp.com/attachments/517265813841903636/520542485370372107/download.png`)
              .setTitle(`:tram: **1호선**:tram:`)  
              .addField("부산도시철도 4호선 \n401 미남 (환승역, 3호선) \n주변 장소 : 미남교차로 \n빠른 환승 : 5-1 5-2\n 402 동래 (환승역, 1호선)\n 주변 장소 : 동래역 \n빠른 환승 : ", "__**노선**__")                                                                              
              .setImage('https://cdn.discordapp.com/attachments/520196482712993803/520556205920354315/Busan_metro_line_1.jpeg');
              
             message.channel.send(InfoEmbed1);
            
            }               
            if (cmd === `${prefix}음악`) {
              var InfoEmbed1 = new Discord.RichEmbed()
              .setColor("RANDOM")
            
              .setTitle(`:notes:**음악**:notes: `)                                                                                
                .addField('https://youtu.be/5epHjnnPnqk | https://youtu.be/n8X9_MgEdCg | https://youtu.be/B7xai5u_tnk | https://www.youtube.com/watch?v=OPBECnDBiRQ | https://youtu.be/cMg8KaMdDYo', '(이 음악들은 유튜브링크 밖에 없습니다)');
            
             message.channel.send(InfoEmbed1);
            
            }              
            if (cmd === `${prefix}지하철`) {
              var InfoEmbed1 = new Discord.RichEmbed()
              .setColor("RANDOM")
              .setTitle(`:tram: **지하철**:tram:`)                                                                                
              .addField(`${prefix}1호선 | ${prefix}2호선 | ${prefix}3호선 | ${prefix}4호선 | ${prefix}부산김해경전철`, `(주의)아직은 부산 노선과 정보만 나옵니다`)
              .setAuthor(`노선 주인장`, `https://cdn.discordapp.com/attachments/517265813841903636/520542485370372107/download.png`);
             message.channel.send(InfoEmbed1);
            
            }             
            if (cmd === `${prefix}추가요청`) {
              var InfoEmbed = new Discord.RichEmbed()
              .setColor("RANDOM")
              .setTitle(`**추가 요청**`)                                                                                
              .setDescription(`추가 요청은 딱구#6166으로 보내주세요`)          
              .setFooter("딱구 봇", client.user.avatarURL);
              
             message.channel.send(InfoEmbed);
            
            }
            if (cmd === `${prefix}내성님은?`) {
              var InfoEmbed = new Discord.RichEmbed()
              .setColor("RANDOM")
              .setTitle(`**내성님은 아주 좋은 분입니다**`)                                                                                
              .setDescription(`빨리 칭찬 해!<---(딱구)`)          
              .setFooter("딱구 봇 죽음", client.user.avatarURL);
              
             message.channel.send(InfoEmbed);
            }

     if (cmd === `${prefix}yelin1131409`) {
       var InfoEmbed = new Discord.RichEmbed()
         .setColor("RANDOM")
         .setTitle(`**yelin1131409은 아주 좋은 분입니다**`)
         .setDescription(`빨리 칭찬 해!<---(딱구)`)
         .setFooter("딱구 죽음", client.user.avatarURL);

       message.channel.send(InfoEmbed);
     }            
            //>>yelin1131409
              if (message.content.startsWith(`>>돈줘`)) {

                let embed = new Discord.RichEmbed()
                  .setDescription(`**1만원을 충전 했습니다**`)
                  .setColor(0x00AE86)

                message.channel.send(embed);

              }
     if (message.content.startsWith(`>>돈딱구`)) {

       let embed = new Discord.RichEmbed()
         .setDescription(`**100000000000000000000000000000000000000조원을 충전 했습니다**`)
         .setColor(0x00AE86)

       message.channel.send(embed);

     }
                      
            client.on('message', message => {
              if (message.channel.type === "dm") return;
            if (!message.guild) return;
              if (message.author.id === `284658034179833866`) return;//
              if (message.author.id === `444117332143374337`) return;//
            if (message.content === `${prefix}재생`) {
              if (message.member.voiceChannel) {
                message.member.voiceChannel.join()
                  .then(connection => {
                    message.reply("재생한다!");
                    connection.playFile("C:\Users\김택우\Desktop\[MV] Good Day (Prod. by Code Kunst) - Loopy x Kid Milli x pH-1 (feat. Paloalto) SMTM777.mp3");
                  })

                  .catch(console.log);
                  voiceChannel.leave();
              } else {
                message.reply("널 따라갈건데 너가 보이스채널에 없어.");
              }
            }
          });
            if (cmd === `${prefix}과거뉴스`) {
              var InfoEmbed = new Discord.RichEmbed()
              .setTitle(`KT 큰 불... 서대문·마포 일대 통신망 '먹통'에 주민들 '분통'`)                                                                                
              .setDescription(`24일 서울 서대문구 충정로 3가 KT아현지사에서 발생한 대형 화재로 휴대폰과\n 초고속인터넷,인터넷TV(IPTV) 통신 장애가 발생해 인근 주민들이 큰 불편을 겪고 있다.\n출쳐:\nhttp://news.chosun.com/site/data/html_dir/2018/11/24/2018112400856.html`)          
              .setFooter("딱구 봇", client.user.avatarURL);
    
             message.channel.send(InfoEmbed);
            }

            if (message.content.startsWith(`>>허브봇 사망일`)) {
              message.channel.send("2018월 12월 01일 10시 13분") 
              message.channel.send("X.......")               

            }
            if(message.content.startsWith(`${prefix}분노`))
            message.channel.send('(╯°□°）╯︵ ┻━┻').then(function(p1ng) {
              p1ng.edit(`┬─┬ ノ( ゜-゜ノ)`)
            })
            if(message.content.startsWith(`${prefix}솔로`))
            message.channel.send('~~연인~~ `삭제`').then(function(p1ng) {
              p1ng.edit(`**솔로 천국**`)
           
            })
            if(message.content.startsWith(`${prefix}문의`) ){
              message.reply(`문의는 딱구#6166 친추 하고 DM으로 보내주세요!`);
            }            
            if(message.content.startsWith( `${prefix}hex`)) {
              message.channel.send(`hex: ${hex}`);
                 
    
          }  
     var msg = message.content.split(" ");
     var cmd = msg[0];
     let messageArray = message.content.split(" ");
     let args = messageArray.slice(1); 
     if (message.content.startsWith(`${prefix}유튜브`)) {
       let youtube = args.slice(0).join('+');

       let link = `https://www.youtube.com/results?search_query=` + youtube;
       if (!youtube) return message.reply(`Please enter a word `)
       if (!link) return message.reply("Console error")
       let embed = new Discord.RichEmbed()


         .setColor("RED")

         .setTimestamp()

         .addField('Action:', 'Searching on youtube')

         .addField("Word:", `${args.slice(0).join(' ')}`)

         .addField('Link:', `${link}`)

         .setFooter("You're avatar", message.author.avatarURL);

       message.channel.send(embed);
     }
     if (message.content.startsWith(`${prefix}포나`)) {
     if (args.length < 2) {
       message.channel.send(":x: 사용법 : `>>포나 pc (자신의 닉네임)` ");
       return;
     }

     var name = "";
     for (var i = 1; i < args.length; i++) {
       name += args[i] + " ";
     }
     name = name.trim(); // remove last space

     var url = "https://fortnitetracker.com/profile/pc/"
       + encodeURIComponent(name);
     message.channel.startTyping();

     fortnite.getStats(name, "pc", (err, result) => {
       if (err) {
         message.channel.send(":x: 너는 다른 거 쓰군!");
         message.channel.stopTyping();
         return;
       }

       var embed = new Discord.RichEmbed()
         .setAuthor(result.accountName, "", url)
         .setDescription('')
         .addField("일치", result.wins)
         .addField("경기 수", result.matches, true)
         .addField("승률", ~~result.wr + "%", true)
         .addField("총킬 수", + result.kills, true)
         .addField("K/D", + result.kd, true)
         .setColor("#36393F")
         .setURL(url)
         .setThumbnail(result.skinUrl);

       message.channel.stopTyping();
       message.channel.send(embed);
     });
    }
     if (message.content.startsWith(`${prefix}test`)) {
     let pages = ['This is page one!', 'Second page', 'Third', 'You can add pages', 'All you need to do is add another item in the array', '**Supports markdown and regular chat description properties**'];
     let page = 1;

     const embed = new Discord.MessageEmbed()
       .setColor(0xffffff)
       .setFooter(`Page ${page} of ${pages.length}`)
       .setDescription(pages[page - 1])

       message.channel.send(embed).then(message => {

         message.react('⏪').then(r => {
           message.react('⏩')

         const backwardsFilter = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
         const forwardsFilter = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id;

           const backwards = message.createReactionCollector(backwardsFilter, { time: 60000 });
           const forwards = message.createReactionCollector(forwardsFilter, { time: 60000 });


         backwards.on('collect', r => {
           if (page === 1) return;
           page--;
           embed.setDescription(pages[page - 1]);
           embed.setFooter(`Page ${page} of ${pages.length}`);
           message.edit(embed)
         })

         forwards.on('collect', r => {
           if (page === pages.length) return;
           page++;
           embed.setDescription(pages[page - 1]);
           embed.setFooter(`Page ${page} of ${pages.length}`);
           msg.edit(embed)
         })

       })

     })
    }
     const osu = require('node-osu');
     const api = new osu.Api("", {
       notFoundAsError: true,
       completeScores: false
     })
     if (message.content.startsWith(`${prefix}ous`)) {
       let username = args[0]


       if (!args[0]) return message.channel.send('Please, provide a valid user\'s nickname! (osu!)')

       api.getUser({ u: username }).then(user => {
         const embed = new Discord.RichEmbed()
           .setTitle('User Osu Search System')
           .setDescription(`using with node-osu module`)
           .setThumbnail(`http://s.ppy.sh/a/${user.id}}`)
           .setColor("#D0436A")
           .addField('닉네임', user.name, true)
           .addField('PP', Math.round(user.pp.raw), true)
           .addField('랭크', user.pp.rank, true)
           .addField('레벨', Math.round(user.level), true)
           .addBlankField()
           .addField('국가', user.country, true)
           .addField('국가 랭크', user.pp.countryRank, true)
           .addField('플레이 수', user.counts.plays, true)
           .addField('성공', `${user.accuracyFormatted}`, true)
           .setFooter('Requested By ' + message.author.tag, message.author.avatarURL)
         message.channel.send(embed)

       })
      
      }
     if (message.content.startsWith(`${prefix}날씨`)) {
     weather.find({ search: args.join(" "), degreeType: 'C' }, function (err, result) {
       if (err) message.channel.send(err);
       if (result === undefined || result.length === 0) {
         message.channel.send('**Please enter a location!**')
         return;
       }
       var current = result[0].current;
       var location = result[0].location;
       const embed = new Discord.RichEmbed()
         .setDescription(`**${current.skytext}**`)
         .setAuthor(`날씨 ${current.observationpoint}`)
         .setThumbnail(current.imageUrl)
         .setColor(0x00AE86)
         .addField('시간대', `UTC${location.timezone}`, true)
         .addField('Degree Type', location.degreetype, true)
         .addField('온도', `${current.temperature} Degrees`, true)
         .addField('체온', `${current.feelslike} Degrees`, true)
         .addField('바람', current.winddisplay, true)
         .addField('습기', `${current.humidity}%`, true)
       message.channel.send({ embed });
     })
   }

     if (message.content.startsWith(`${prefix}시간`)) {
     var today = new Date()
     let Day = today.toString().split(" ")[0].concat("day");
     let Month = today.toString().split(" ")[1]
     let Year = today.toString().split(" ")[3]
     const embed = new Discord.RichEmbed()
       .setColor(`RANDOM`)
       .addField("오늘 은", `\`${Day}\` ,\`${Month}\` ,\`${Year}\`\n\`시간:\` \`${today.toString().split(" ")[4]}\``)
     message.channel.send({ embed })
     message.react("🕰")
   };
     if (message.content.startsWith(`${prefix}타이머`)) {
     let Timer = args[0];

     if (!args[0]) {
       return message.channel.send("마지막에`s`, `m` 또는 `h`와 함께 시간을 입력하십시오!");
     }

     if (args[0] <= 0) {
       return message.channel.send("마지막에`s, m` 또는 `h `와 함께 시간을 입력하십시오!");
     }

       message.channel.send(":white_check_mark: 타이머가 다음과 같이 설정되었습니다.: " + `${ms(ms(Timer), { long: true })}`)

     setTimeout(function () {
       message.channel.send(`타이머가 끝났습니다. 지속되었습니다.: ${ms(ms(Timer), { long: true })}` + message.author.toString())

     }, ms(Timer));
   }
     if (message.content.startsWith(`${prefix}검색`)) {
     let link = `https://www.google.com/search?q=` + google;
     let embed = new Discord.RichEmbed()

       .setColor("RED")
       .setTimestamp()
       .addField('Action:', 'Searching on Google')
       .addField("Word:", `${args.slice(0).join(' ')}`)
       .addField('Link:', `${link}`)
       .setFooter("You're avatar", message.author.avatarURL);

     message.channel.send(embed);

   }

       .catch(console.error) // catch any possible errors
      client.on('message', message => {
        if (message.channel.type === "dm") return;
          if(message.author.bot) return;        
        if (message.author.id === `284658034179833866`) return;//
        if (message.author.id === `444117332143374337`) return;//
          if (message.content === '>>profile') {
            message.reply(message.author.avatarURL)
          }

        });
      });
        



        client.on('message', message => {
          if (message.content === '>>movie') 
            message.channel.send('이번달의 대표 영화입니다. `BTS - Burn The Stage : The Movie`');
          });
client.on('message', message => {
  // If the message is '!rip'
  if (message.content === '>>rip') {
    // Create the attachment using Attachment
    let embed = new Discord.RichEmbed()
      .setImage("https://i.imgur.com/w3duR07.png")
    // Send the attachment in the message channel
  
    message.channel.send(embed);
  }
  var msg = message.content.split(" ");
  var cmd = msg[0];
  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1); 
  if (message.content === '>>재시작') {
    if (message.author.id !== "309230935377707011") return message.channel.send("⛔ **ACCESS DENIED**");

    try {
      delete require.cache[require.resolve(`./${args[0]}.js`)];
    } catch (e) {

      return message.channel.send(`Unable to reload: ${args[0]}.js`);
    }

    message.channel.send(`**Successfully reloaded:** ${args[0]}.js`);


  }

  
  
});
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === '안녕하세요');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`:inbox_tray:${member}님께서 서버에 들어오셨습니다. 환영합니다.`);
});      
client.on('guildMemberRemove', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === '안녕하세요');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`:outbox_tray:${member}님께서 서버을 나가셨습니다. 안녕히 가십시오.`);
});
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'welcome');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`:inbox_tray:${member}님께서 서버에 들어오셨습니다. 환영합니다.`);
});
client.on('guildMemberRemove', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'welcome');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`:outbox_tray:${member}님께서 서버을 나가셨습니다. 안녕히 가십시오.`);
});
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === '멤버-로그');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});      
client.on('guildMemberRemove', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === '멤버-로그');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`bye to the server, ${member}`);
});
  client.on("messageDelete", (messageDelete) => {
   const channel = messageDelete.guild.channels.find(ch => ch.name === '멤버-로그');    
    if (!channel) return;
    channel.send(`메세지 삭제: ${messageDelete.author.tag}[${messageDelete.author.id}]이/가 \n"${messageDelete.content}" 메세지 삭제 했습니다.`)
  });
client.on('message', message => {   
          if(message.author.bot) return; 
  if (message.author.id === `284658034179833866`) return;//
  if (message.author.id === `444117332143374337`) return;//
          if (message.content.startsWith('>>profile')) {
            message.reply(message.author.avatarURL)
          }          
          if (message.content.startsWith('>>restart')) {
            
          }                    
          if(message.content.startsWith(`>>업타임`)) {
          message.channel.send(Embed.uptime(client))
     
        }
          if(message.content.startsWith(`${prefix}골라`)) {
            message.channel.send(choose(message.content.replace(`${prefix}골라 `, ''), client)) 
 
          }
          if (message.content.startsWith('>>핑')) {
            message.channel.send(Embed.ping(client))
  
          }
          if (message.content === '>>music') {
            message.channel.send('이번달의 대표 음악입니다. `Wanna One - 봄바람`');
          }       
          if(message.content.startsWith('>>도움')) {
            message.channel.send(Embed.help(client, prefix))

    
          }       

             
          let messageArray = message.content.split(" ");
          let cmd = message.content.split(" ")
          let args = messageArray.slice(1);
          
          if(message.content.startsWith('>>신고')) {
            let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if(!rUser) return message.channel.send("유저가 없습니다.");
            let rreason = args.join(" ").slice(22);
        
            let reportEmbed = new Discord.RichEmbed()
            .setDescription("신고")
            .setColor("#15f153")
            .addField("신고된 유저", `${rUser} 와 아이디: ${rUser.id}`)
            .addField("신고 한", `${message.author} 와 아이디: ${message.author.id}`)
            .addField("채널", message.channel)
            .addField("시간", message.createdAt)
            .addField("사유", rreason);


        
        
            let reportschannel = message.guild.channels.find(`name`, "신고");
            if(!reportschannel) return message.channel.send("신고 채널이 없습니다");
        
        
            message.delete().catch(O_o=>{});
            reportschannel.send(reportEmbed);
          }
  if(message.content.startsWith('>>warn')) {            
  
  
  
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("유저를 골르시요!");
  if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("너무 장난이 심하네");
  let reason = args.join(" ").slice(22);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  let warnEmbed = new Discord.RichEmbed()
  .setDescription("Warns")
  .setAuthor(message.author.username)
  .setColor("#fc6400")
  .addField("경고 유저", `<@${wUser.id}>`)
  .addField("경고된 채널", message.channel)
  .addField("경고된 개수", warns[wUser.id].warns)
  .addField("사유", reason);

  let warnchannel = message.guild.channels.find(`name`, "경고");
  if(!warnchannel) return message.reply("채널을 찾지 못 했다");

  warnchannel.send(warnEmbed);

  if(warns[wUser.id].warns == 2){
    let muterole = message.guild.roles.find(`name`, "muted");
    if(!muterole) return message.reply("너는 뮤트가 없어;;");

    let mutetime = "10s";
    await(wUser.addRole(muterole.id));
    message.channel.send(`<@${wUser.id}> 10초 뮤트입니다`);

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      message.reply(`<@${wUser.id}> 언뮤트입니다.`)
    }, ms(mutetime))
  }
  if(warns[wUser.id].warns == 10){
    message.guild.member(wUser).ban(reason);
    message.reply(`<@${wUser.id}> 밴당했습니다.`)
  }
  if(message.content.startsWith('>>경고확인')) {
    if(!warns[wUser.id]) warns[wUser.id] = {
      warns: 0
    };
    
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You can't do that.");
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!wUser) return message.reply("Couldn't find them yo");
    let warnlevel = warns[wUser.id].warns;
    
    message.reply(`<@${wUser.id}> 은 ${warnlevel}개 경고입니다.`);
    }
  }
  if(message.content.startsWith('>>clear')) {    
 
    if(!args[0]) return message.channel.send("no");
    message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`메세지 ${args[0]} 만큼 삭제했습니다.`).then(msg => msg.delete(2000));
  });
  }
 
  if(message.content.startsWith('>>말')) { 
 
  const 말 = args.join(" ");
  message.delete().catch();
  message.channel.send(말);
  }

  if(message.content.startsWith('>>봇말')) {    

  if(!args[0] || args[0 == "help"]) return message.reply("Usage: >>봇말 <봇에게 말넣기>");

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  prefixes[message.guild.id] = {
    prefixes: args[0]
  };

  fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
    if (err) console.log(err)
  });

  let sEmbed = new Discord.RichEmbed()
  .setColor("#FF9900")
  .setTitle("봇의 말")
  .setDescription(` ${args[0]}`);

  message.channel.send(sEmbed);

}


if(message.content.startsWith('>>ball')) {  
  if(!args[2]) return message.reply("질문을 받을 수 없습니다 !다시 하세요!");
  let replies = ["네.", "아니요", "나도 알지 못한다", "나중에 물어보세요"];
 
  let result = Math.floor((Math.random() * replies.length));
  let question = args.slice(1).join(" ");
 
  let ballembed = new Discord.RichEmbed()
  .setAuthor(message.author.tag)
  .setColor("#FF9900")
  .addField("질문", question)
  .addField("답", replies[result]);
 
  message.channel.send(ballembed);
 }


 bot.on("message", async message => {
   if (message.author.id === `284658034179833866`) return;//
   if (message.author.id === `444117332143374337`) return;//
  if(message.author.bot) return;
  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLowerCase();
  let args = messageArray.slice(1); 

 if(message.content.startsWith('>>밴')) {  
 message.delete();
 if(!message.member.hasPermission("BAN_MEMBERS")) return errors.noPerms(message, "BAN_MEMBERS");
 if(args[0] == "help"){
   message.reply("Usage: >>밴 유저 사유");
   return;
 }
 let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
 if(!bUser) return errors.cantfindUser(message.channel);
 if(bUser.id === bot.user.id) return errors.botuser(message); 
 let bReason = args.join(" ").slice(22);
 if(!bReason) return errors.noReason(message.channel);
 if(bUser.hasPermission("MANAGE_MESSAGES")) return errors.equalPerms(message, bUser, "MANAGE_MESSAGES");

 let banEmbed = new Discord.RichEmbed()
 .setDescription("~Ban~")
 .setColor("#bc0000")
 .addField("밴 유저", `${bUser} 와 아이디 ${bUser.id}`)
 .addField("밴한 유저", `<@${message.author.id}> 와 아이디 ${message.author.id}`)
 .addField("밴된 채널", message.channel)
 .addField("시간", message.createdAt)
 .addField("사유", bReason);

 message.guild.member(bUser).ban(bReason);
 incidentchannel.send(banEmbed);
}


if(message.content.startsWith('>>주기')) {  

if(!role) return message.reply("Specify a role!");

let gRole = message.guild.roles.find(`name`, roles);

if(!gRole) return message.reply("룰을 찾을수 없습니다.");



if(rMember.roles.has(gRole.id)) return message.reply("They already have that role.");

await(rMember.addRole(gRole.id));



try{

  await rMember.send(`축하합니다! 당신은 ${gRole.name} Role을 획득하였습니다!`)

}catch(e){

  message.channel.send(`<@${rMember.id}>님이 ${gRole.name}룰을 획득하였습니다.`)

}
if(message.content.startsWith('>>kick')) {  

if(!message.member.hasPermission("KICK_MEMBERS")) return errors.noPerms(message, "KICK_MEMBERS");
if(args[0] == "help"){
  message.reply("Usage: >>kick <user> <reason>");
  return;
}
let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!kUser) return errors.cantfindUser(message.channel);
let kReason = args.join(" ").slice(22);
if(kUser.hasPermission("MANAGE_MESSAGES")) return errors.equalPerms(message, kUser, "MANAGE_MESSAGES");

let kickEmbed = new Discord.RichEmbed()
.setDescription("~Kick~")
.setColor("#e56b00")
.addField("Kicked User", `${kUser} with ID ${kUser.id}`)
.addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
.addField("Kicked In", message.channel)
.addField("Tiime", message.createdAt)
.addField("Reason", kReason);

let kickChannel = message.guild.channels.find(`name`, "incidents");
if(!kickChannel) return message.channel.send("Can't find incidents channel.");

message.guild.member(kUser).kick(kReason);
kickChannel.send(kickEmbed);
}
}



if(cmd === `${prefix}테스트`) {
  message.channel.send('고치는 중').then(function(ping) {
    ping.edit(`3`)
    ping.edit(`2`) 
    ping.edit(`1`)
    ping.edit('`Fail`')                     

  })
}
if(message.content.startsWith('>>뮤트')) {  
let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!tomute) return message.reply("Couldn't find user.");
if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
let muterole = message.guild.roles.find(`name`, "muted");
//start of create role
if(!muterole){
  try{
    muterole = await message.guild.createRole({
      name: "muted",
      color: "#000000",
      permissions:[]
    })
    message.guild.channels.forEach(async (channel, id) => {
      await channel.overwritePermissions(muterole, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false
      });
    });
  }catch(e){
    console.log(e.stack);
  }
}
//end of create role
let mutetime = args[1];
if(!mutetime) return message.reply("You didn't specify a time!");

await(tomute.addRole(muterole.id));
message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

setTimeout(function(){
  tomute.removeRole(muterole.id);
  message.channel.send(`<@${tomute.id}> has been unmuted!`);
}, ms(mutetime));



}
if(message.content.startsWith('>>dog')) {  
  let {body} = await superagent
  .get(`http://random.dog/woof.json`);
 let domgembed = new Discord.RichEmbed()
 .setColor("#ff9900")
 .setTitle("개 :dog:")
 .setImage(body.url);
 
 message.channel.send(domgembed);
};


});
if(message.content.startsWith('>>역할')) {
let colors = message.guild.roles.filter(role => role.name.startsWith("#"));
if(colors.size < 1) return message.channel.send("여기에는 역할이 없습니다");

message,channel.send(colors.array().join(" "));
}



if (message.content.startsWith(`${prefix}유저정보`) ){
  let embed = new Discord.RichEmbed();
  embed.setAuthor(`유저정보`)
  embed.setColor('RANDOM')
  embed.setAuthor(message.author.username, message.author.displayAvatarURL)
  embed.setDescription(`${message.author.username}님의 정보입니다!`)
  embed.setThumbnail(message.author.displayAvatarURL)
  embed.addField('유저이름:',` ${message.author.username}#${message.author.discriminator} `)
  embed.addField('ID:',`${message.author.id}`)
  embed.addField('디스코드 계정을 생성한 날짜:', message.author.createdAt);
  message.channel.send(embed);
}


if (message.content.includes(message.mentions.users.first())) {
  let mentioned = bot.afk.get(message.mentions.users.first().id);
  if (mentioned) message.channel.send(`:loudspeaker:지금 그 분은/는 잠수 입니다.:loudspeaker:\n 사유: ${mentioned.reason} `);
}
let afkcheck = bot.afk.get(message.author.id);
if (afkcheck) return [bot.afk.delete(message.author.id), message.channel.send(`:zzz: 다시 오신 걸 환영해요!:zzz:`)];

if (!message.content.startsWith(`>>afk`)) return;

let reason = args.join(' ') ? args.join(' ') : '나는 현재 잠수입니다';
let afklist = bot.afk.get(message.author.id);

if (!afklist) {
    let construct = {
        id: message.author.id,
        reason: reason
    };
    let afkcheck = bot.afk.get(message.author.id);
    if (afkcheck) return [bot.afk.delete(message.author.id), message.channel.send(`:zzz:다시 오신 걸 환영해요!:zzz:\n 사유: ${reason}`)];
    bot.afk.set(message.author.id, construct);
    return message.channel.send(`:zzz: 당신은 잠수입니다!:zzz:   \n 사유: ${reason}`)
}
if (message.content.startsWith(`>>날씨`)) {
  weather.find({search: args.join(" "), degreeType: 'F'}, function(err, result) {
        if(err) message.channel.send(err);
        var current = result[0].current;
        var location = result[0].location;
        const embed2 = new Discord.RichEmbed()
        .setDescription(`**${current.skytext}**`)
        .setAuthor(`weather for ${current.observationpoint}`)
        .setThumbnail(current.imageUrl)
        .setColor(0x00AE86)
        .addField(`Timezone`, `UTC${location.timezone}`, true)
        .addField(`Degree Type`,location.degreeType, true)
        .addField(`Temperature`, `${current.temperature} Degrees`, true)
        .addField(`winds`,current.winnisplay, true)
        .addField(`Humidity`, `${current.humidity}%`, true)
       message.channel.send(embed2);

  });
}
  client.on('messageUpdate', (message, emessage) => {
    var logchannel = 0;
    if (message.guild.id == ramtid) {
      logchannel = logchannelramt;
    } else if (message.guild.id == jclid) {
      logchannel = logchanneljcl;
    } else {
      message.channel.send('An error has happened, please report this to RandomGamer123 #5222 immediately');
    }
    var logchannel = logchannel.guild.channels.find(ch => ch.name === '멤버-로그');
    logchannel.send(`메세지 삭제: ${messageUpdate.author.tag}이/가 "${message.content}""${emessage.content} 메세지 삭제 했습니다.`)
    
  });
  client.on("messageUpdate", (messageUpdate) => {
    const channel = messageUpdate.guild.channels.find(ch => ch.name === '멤버-로그');
    if (!channel) return;
    channel.send(`메세지 삭제: ${messageUpdate.author.tag}이/가 "${message.content}""${emessage.content} 메세지 삭제 했습니다.`)
  });

  

  // This will create the webhook with the name "Example Webhook" and an example avatar.
  message.channel.createWebhook("Example Webhook", "https://i.imgur.com/p2qNFag.png")
    // This will actually set the webhooks avatar, as mentioned at the start of the guide.
    .then(webhook => webhook.edit("Example Webhook", "https://i.imgur.com/p2qNFag.png")
      // This will get the bot to DM you the webhook, if you use this in a selfbot,
      // change it to a console.log as you cannot DM yourself
      .then(wb => message.author.send(`Here is your webhook https://canary.discordapp.com/api/webhooks/${wb.id}/${wb.token}`)).catch(console.error))
  

  let msg = args.join(' ') // add the args together to create a string
  message.channel.createWebhook(message.author.username, message.author.avatarURL) //make the webhook with the authors name and avatar
    .then(wb => {
      const user = new Discord.WebhookClient(wb.id, wb.token) //get the webhook
      user.send(msg); //send the msg
      user.delete() //delete the webhook
    })
    .catch(console.error) // catch any possible errors
  bot.on(`message`, async message => {
    if (message.content.startsWith(`>>12`)) {
      if (message.author.id === "309230935377707011") {
        message.channel.send(":gear: Reload in process")

        bot.destroy()
        bot.login(process.env.TOKEN)
        message.channel.send(":gear: Reload has been done")
      } else {

        message.channel.send("Only the Owner of this bot can do that !")

      }
    }
  });

  var achievement = args.join(" ");
  function isEmpty(obj) {
    if (obj == null) return true;
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;
    if (typeof obj !== "object") return true;
    for (var key in obj) {
      if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
  }
  if (message.content.startsWith(`>>minecraft`)) {
  var wembed = new Discord.RichEmbed()
    .setColor('#DC3545')
    .setAuthor(`${message.author.username} try again`, `${message.author.avatarURL}`)
    .addField("**-achievement {ur achievement}**", "change `{ur achievement}` for the desired achievement")
    .setTimestamp()
    .setFooter('Anubis', `${client.user.avatarURL}`);
  if (isEmpty(achievement)) return message.channel.send(wembed);
  var download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
      //console.log('content-type:', res.headers['content-type']);
      //console.log('content-length:', res.headers['content-length']);
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
  };
  var dir = `achievement.png`;
  download('https://www.minecraftskinstealer.com/achievement/a.php?i=13&h=Achievement%20unlocked&t=' + achievement, dir, function () {
    message.channel.send(`${message.author} has earned a new achievement.`, { file: dir });
  });
  }
  client.on('message', message => {
    if (message.author.bot) return;
    if (message.author.id === `284658034179833866`) return;//
    if (message.author.id === `444117332143374337`) return;//
  if (message.channel.type === "dm") { //if the channel is a DM channel
 //create the args

    if (message.content.startsWith(">>")) return message.channel.send(":x: Please use commands in real server! :x:") //if the message is a command
    message.channel.send("This message has been send to the staff! :incoming_envelope:");
    if (message.content.startsWith(prefix)) return
    if (args.length > 256) return message.reply("Your message content too many characters :/") //if the message contnt more than 256 character, what fields do not allow
    var embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle("New request in DM!")
      .addField(args, "Send by: " + message.author.username + " with the ID: " + message.author.id)
    bot.guilds.get("518291244401819669").channels.get("522390537186050076").send(embed) //send the embed in a specific channel
  }


  if (message.content.startsWith(">>reply")) {
    if (message.author.id !== "309230935377707011") return message.reply('You cannot use that!')

    var Rargs = message.content.split(" ").slice(2).join(" ")
    var userID = args[1]
    if (isNaN(args[1])) return message.reply("This is not an ID!") //if args is Not A Number!
    var embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle("the staff answered you!")
      .setDescription(Rargs)
      .setFooter("this message was sent to you by: " + message.author.username + " !")
    bot.users.get(userID).send(embed)
    message.channel.send("Send!").catch(console.error) //send the message
    //it may be that if the user has blocked your bot that it does not work
  }
  });



























msg = ' ';   
});
client.login(config.Token);
bot.login(config.Token);
dscl.login(config.Token);
bot.login(tokenfile.token);