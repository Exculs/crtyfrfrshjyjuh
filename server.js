require("express")().listen(1343);

const db = require("quick.db");
const discord = require("discord.js");
const client = new discord.Client({ disableEveryone: true });
client.login(process.env.token);
const fetch = require("node-fetch");
const fs = require("fs");

setInterval(() => {
  var links = db.get("zHyra Uptime");
  if (!links) return;
  var linkA = links.map(c => c.url);
  linkA.forEach(link => {
    try {
      fetch(link);
    } catch (e) {
      console.log("" + e);
    }
  });
  console.log("Başarıyla Pinglendi.");
}, 60000);

client.on("ready", () => {
  if (!Array.isArray(db.get("zHyra Uptime"))) {
    db.set("zHyra Uptime", []);
  }
});

client.on("ready", () => {
  client.user.setActivity(`h-help | zHyra Uptime`);
  console.log(`Başarıyla Yeniden Başlatıldı`);
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "h-add") {
    var link = spl[1]; 
    fetch(link)
      .then(() => {
        
        if (
          db
            .get("zHyra Uptime")
            .map(z => z.url)
            .includes(link)
        )
          return message.channel.send("**⛔ This bot is already running.**"); 

        let yardım = new Discord.MessageEmbed() 
          .setAuthor(client.user.username)
          .setColor(0x6a3db8)
          .setDescription("**✅ Successful! Your project is now 7/24!**") 
          .setFooter(`© ${client.user.username}`)
          .setTimestamp();
        message.channel.send(yardım).then(msg => msg.delete(60000)); 
        db.push("zHyra Uptime", { url: link, owner: message.author.id });
      })
      .catch(e => {
        let yardım = new Discord.MessageEmbed() 
          .setAuthor(client.user.username)
          .setColor(0x6a3db8)
          .setDescription(
            "⛔ **Error! You can just add proper urls.**"
          ) 
          .setFooter(`© ${client.user.username}`)
          .setTimestamp();
        return message.channel.send(yardım).then(msg => msg.delete(60000)); 
      });
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "h-botsay") {
    var link = spl[1];
    message.channel.send(`**${db.get("zHyra Uptime").length} / 10000**`); 
  }
});

const Discord = require("discord.js");

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" "); 
  if (spl[0] == "h-help") {
    let embed = new Discord.MessageEmbed() 
      .setColor("#070706")
      
      .setDescription(
        `**After using the uptime command, wait 3-5 minutes for it to be added to the system..**

 🌙 **h-help** : Opens the bot's help menu.

 🔋 **h-add <link>** : Makes the project link you add open 7/24.

 ⚡ **h-botsay** : Shows the number of projects open on the bot.

 🔮 **h-botinfo** : Shows the bot's statistics.
 🔮 **h-invite** : Shows invite links.
 [**Invite Link**](https://discord.com/oauth2/authorize?client_id=790667480821268480&scope=bot&permissions=8)
 [**Support Server**](https://discord.gg/VBZFU5vx4T) 
 [**Do not forget to vote plz xd**](https://top.gg/bot/790667480821268480/vote)
 
 `)
      .setAuthor(`zHyra Uptime | Help Menu`, client.user.avatarURL)
      .setFooter(
        `zHyra Uptime Bot | Bot Developer = @!             Exculs#9999 `
      )
      .setImage(
        `https://cdn.discordapp.com/attachments/794647756706283532/794651263777767445/standard.gif`
      );
    return message.channel.send(embed);
  }
});
const log = message => {
  console.log(`${message}`);
};

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "h-botinfo") {
    var link = spl[1];
    message.channel.send(`***Coming Soon!***`);
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "h-invite") {
    var link = spl[1];
    const davet = new Discord.MessageEmbed()
  
   
      
      .setColor("#108f8f")
      .setThumbnail(message.author.avatarURL({dynamic: true}))
      .setAuthor(`====================================`) 
      .setDescription(`**You can find my Invitation Link, Vote Link and Bot Support Server below.**

[**Invite Link**](https://discord.com/oauth2/authorize?client_id=790667480821268480&scope=bot&permissions=8)

[**Support Server**](https://discord.gg/VBZFU5vx4T)

[**Do Not Forget To Vote Plz**](https://top.gg/bot/790667480821268480/vote)




`)
      
      .addField(`====================================`, `** **`)
      .setImage(``)
      .setTimestamp()
      .setFooter(`zHyraUptime`,message.author.avatarURL({dynamic: true}));
  
  
  message.channel.send(davet);
  }
});
//////////////
