const config = require("./config.json");
const Discord = require("discord.js");



const dscl = new Discord.Client();
const client = new Discord.Client();
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();


client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for new guild members
client.on('${guildMemberAdd}', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === '안녕하세요');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);



  var helloArray = ["그래", "ㅃㅃ", "왜"];
  var AnswerArray = ["확실합니다.", "아마 아닐 것 같아요.", "아니오", "절대 아닙니다.", "잘 모르겠네요.", "확실합니다."];
  var rArray = ["**1**이 나왔습니다", "**3**이 나왔습니다", "**2**이 나왔습니다", "**4**이 나왔습니다", "**5**이 나왔습니다", "**6**이 나왔습니다"]
  var aArray = ["1%", "2%", "3%", "4%", "5%", "6%", "7%", "8%", "9%", "11%","10%", "12%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%", "측정 불가(너무 높습니다)", "측정 불가(너무 낮습니다)"]
  var qArray = ["https://youtu.be/n8X9_MgEdCg", "https://youtu.be/B7xai5u_tnk"]
  bot.on("message", async message => { 
  dscl.on("message", (message)=> {
      if(message.author.bot) return;
      var msg = message.content.split(" ");
      var cmd = msg[0];
      
    
   
    //a little bit of data parsing/general checks
  
  
    let content = message.content.split(" ");
    let command = content[0];
    let args = content.slice(1);
    let prefix = config.prefix;
  
  
    //checks if message contains a command and runs it
    let commandfile = bot.commands.get(command.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);
  })
  
  
  
  
  
      
  
          var msg = message.content.split(" ");
          var cmd = msg[0];
        
      
        
      
          if(cmd === `${prefix}fix`) {
            message.channel.send('보내는 중').then(function(ping) {
              ping.edit(`3`)
              ping.edit(`2`) 
              ping.edit(`1`)
              ping.edit(`고쳤습니다`)                     
            })
  
          }        
          else if (message.content === `${prefix}server`) {
              message.channel.send(`서버 이름: ${message.guild.name}\n멤버: ${message.guild.memberCount}`);
          }
          else if (message.content === `${prefix}user-info`) {
              message.channel.send(`네 이름: ${message.author.username}\n너의 아이디: ${message.author.id}`);
          }
          switch (cmd) {
             case `${prefix}안녕`:
                  message.channel.send(helloArray[RandInt(3)]);
  
                  break;
          }     
          if (cmd === `${prefix}질문`) {
            var textTemp = '';
            for (var i = 1;i<msg.length;i++) {
                textTemp = textTemp + ' ' + msg[1];
              message.channel.send(AnswerArray[RandInt(6)]);
              break;
            }
          }     
          if (cmd === `${prefix}주사위`)
          message.channel.send('굴러가는 중~').then(function(pong) {
            pong.edit(rArray[RandInt(6)]);
          })
          if (cmd === `${prefix}확률`)
          message.channel.send('계산 중~~').then(function(p0ng) {
            p0ng.edit(aArray[RandInt(25)]);
          })       
          if (cmd === `${prefix}음악`)
          message.channel.send('불러오는 중~').then(function(p0ng) {
            p0ng.edit(qArray[RandInt(2)]);
          })      
    if(message.content.startsWith(`${prefix}serverinfo`)){
  
      let sicon = message.guild.iconURL;
      let serverembed = new Discord.RichEmbed()
      .setDescription("Server Information")
      .setColor("#15f153")
      .setThumbnail(sicon)
      .addField("Server Name", message.guild.name)
      .addField("Created On", message.guild.createdAt)
      .addField("You Joined", message.member.joinedAt)
      .addField("Total Members", message.guild.memberCount)
      return message.channel.send(serverembed);
    }
     
          
  
  
          
          if (message.content.startsWith(`${prefix}봇정보`)) {
            var InfoEmbed = new Discord.RichEmbed()
                  .setColor("#2fce64")
                  .setTitle(`딱구 봇의 정보`)
                  .setThumbnail('https://cdn.discordapp.com/attachments/487222566918815744/516186239112839178/4144.gif')
                  .addField("만들어진 시각", bot.user.createdAt)                
                  .addField("봇 이름", bot.user.username)
                  .addField("봇에 있는 서버 개수", bot.guilds.size)
                  .setImage(``)
                  .setFooter("Copyright ⓒ 2018 TTAKKKU All Right Reserved.", 'https://cdn.discordapp.com/attachments/487222566918815744/516186239112839178/4144.gif');
  
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
  
  
  
                if (message.content.startsWith(`${prefix}clean`)) {
                  message.deletable(10000)
                  .then(msg => console.log(`Deleted message from ${msg.author.username}`))              
                  .catch(console.error);
                }
                if (message.content.startsWith(`${prefix}호출`)) {
                  message.delete(2)
                  .then(msg => console.log(`Deleted message from ${msg.author.username}`))
                  .catch(console.error);                         
                
                  message.reply(`딱구 맨션하고 이유 적어주세요 !!`) 
                }
  
        
                if(message.content.startsWith( `${prefix}level up`)) {
                
                  message.reply("http://bitly.kr/TFET");
              }
              if(message.content.startsWith( `${prefix}help`)) {
                var InfoEmbed = new Discord.RichEmbed()
                .setColor("#2fce64")
                .setTitle(`봇의 대개편`)
                .setThumbnail('https://cdn.discordapp.com/attachments/487222566918815744/516186239112839178/4144.gif')
                .addField(`딱구 봇에 추가 할 것`, `음악봇의 기능|rpg게임 기능|kick와 ban 기능|등등많이 추가합니다!!`)
  
                .setFooter("Copyright ⓒ 2018 TTAKKKU All Right Reserved.", 'https://cdn.discordapp.com/attachments/487222566918815744/516186239112839178/4144.gif');
  
                message.channel.send(InfoEmbed);
        }              
  
                      if (message.content.startsWith(`카트라이더`)) {
                        message.delete(2)
                        .then(msg => console.log(`카트라이더 Deleted message from ${msg.author.username}`))
                        .catch(console.error);
                        message.reply(' 저런! 노잼게임은 듣는 사람과 말하는 사람의 건강이 나빠져요. 주의하세요.')
                        
                      }       
                      if(message.content.startsWith( `${prefix}사진Mee6 First server season`)) {
                        message.channel.send("https://cdn.discordapp.com/attachments/513661472321306636/515910999036133376/gfsfsfsdfsdfsdfsf.PNG")               
              
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
            if(message.content.startsWith( `${prefix}사진허브봇 죽음`)) {
              message.channel.send("https://cdn.discordapp.com/attachments/513702147758489612/516104740325556237/00eaffe9b14f3dab.JPG")               
    
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
           if (!message.guild) return;
                    dscl.on('guildMemberAdd', member => {
                      const channel = member.guild.channels.find(ch => ch.name === '안녕하세요' );
                      if (!channel) return;
                      emitter.setMaxListeners(1)
                      channel.send(`${member}님. 안녕하세요.`);
                      
                    })
  
             if (!message.guild) return;
                    dscl.on('guildMemberRemove', member => {
                      const channel = member.guild.channels.find(ch => ch.name === '잘 가요' );
              if (!channel) return;
              
                      channel.send(`${member}님. 안녕하세요.`);
                    })
              if (cmd === `${prefix}사진`) {
                var InfoEmbed = new Discord.RichEmbed()
                  .setColor("#2fce64")              
                  .addField(`:white_check_mark: 커스텀 보기`,`노림수|Mee6 First server season|떡밥|디코의 현실|내일 지구상황|허브봇 고백|허브봇 python 좋아함|허브봇 js 배신|허브봇 죽음`)            
                  .setFooter("Copyright ⓒ 2018 TTAKKKU All Right Reserved.", 'https://cdn.discordapp.com/attachments/487222566918815744/516186239112839178/4144.gif');
      
                  message.channel.send(InfoEmbed);
              }
              
  
              if(message.content.startsWith(`${prefix}이름 변경`)) {
                message.channel.send('Ƭ𝓪𝓴𝓴𝓴𝓾')
              } 
              if(message.content.startsWith(`${prefix}이름변경 주소`)) {
                message.channel.send('https://nickfinder.com/fancy-text')
              }  
              if (cmd === `${prefix}과거뉴스`) {
                var InfoEmbed = new Discord.RichEmbed()
                .setTitle(`KT 큰 불... 서대문·마포 일대 통신망 '먹통'에 주민들 '분통'`)                                                                                
                .setDescription(`24일 서울 서대문구 충정로 3가 KT아현지사에서 발생한 대형 화재로 휴대폰과\n 초고속인터넷,인터넷TV(IPTV) 통신 장애가 발생해 인근 주민들이 큰 불편을 겪고 있다.\n출쳐:\nhttp://news.chosun.com/site/data/html_dir/2018/11/24/2018112400856.html`)          
                .setFooter("Copyright ⓒ 2018 TTAKKKU All Right Reserved.", 'https://cdn.discordapp.com/attachments/487222566918815744/516186239112839178/4144.gif');
      
               message.channel.send(InfoEmbed);
              }
              if (cmd === `${prefix}추가요청`) {
                var InfoEmbed = new Discord.RichEmbed()
                .setTitle(`**추가 요청**`)                                                                                
                .setDescription(`추가 요청은 딱구#6166으로 보내주세요`)          
                .setFooter("Copyright ⓒ 2018 TTAKKKU All Right Reserved.", 'https://cdn.discordapp.com/attachments/487222566918815744/516186239112839178/4144.gif');
      
               message.channel.send(InfoEmbed);
              
              }
              dscl.on('guildMemberAdd', member => {
  
                let channel = member.guild.channels.find('name', 'welcome-leave');
                let memberavatar = member.user.avatarURL
                    if (!channel) return;
                    let embed = new Discord.RichEmbed()
                    .setColor('#2fce64')
                    .setThumbnail(memberavatar)
                    .addField(':bust_in_silhouette: | 이름 : ', `${member}`)
                    .addField(':microphone2: | 환영합니다!', `서버에 오셔서 환영합니다, ${member}`)
                    .addField(':id: | 유저 :', "**[" + `${member.id}` + "]**")
                    .addField(':family_mwgb: | 유저 수', `${member.guild.memberCount}`)
                    .addField("이름", `<@` + `${member.id}` + `>`, true)
                    .addField('서버', `${member.guild.name}`, true )
                    .setFooter(`${member.guild.name}`)
                    .setTimestamp()
                    emitter.setMaxListeners()
                    channel.sendEmbed(embed);
            });
            
      dscl.on("message", (message)=> {
  
        if (message.author.bot) return;    
   
            bot.on('guildMemberAdd', member => {
            
                console.log(`${member}`, "has joined" + `${member.guild.name}`)
            
            });
  
              
  
                        
            dscl.on('guildMemberRemove', member => {
                let channel = member.guild.channels.find('name', 'welcome-leave');
                let memberavatar = member.user.avatarURL
                    if (!channel) return;
                  
                    let embed = new Discord.RichEmbed()
                    .setColor('#2fce64')
                    .setThumbnail(memberavatar)
                    .addField('Name:', `${member}`)
                    .addField('Has Let the Server', ';(')
                    .addField('Bye Bye :(', 'We will all miss you!')
                    .addField('The server now as', `${member.guild.memberCount}` + " members")
                    .setFooter(`**${member.guild.name}`)
                    .setTimestamp()
                    emitter.setMaxListeners()
                    channel.sendEmbed(embed);
            
            
            dscl.on('guildMemberRemove', member => {
                console.log(`${member}` + "has left" + `${member.guild.name}` + "Sending leave message now")
                console.log("Leave Message Sent")
            });
        
          });
   
        
        
        
        });
  
  
          
          
         
        
       
  
  msg = ' ';   
  });
  bot.login(config.token)        
  










































































































































msg = ' ';   
});

dscl.login(config.Token);