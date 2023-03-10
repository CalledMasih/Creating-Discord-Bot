/* 
Make Online your Bot in Discord.js V14
Hope you Enjoy, Made with 💜 by Masih#0258
Github: https://github.com/Masihdev1 | Don't forget to ⭐
Website: https://masihdev.tk/
Copyright Masih 2024 All Right Reserved!
*/

const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActivityType,
} = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");
const ms = require("ms");
const prefix = "Your Prefix";
const ping = Date.now() - message.createdTimestamp;
const time = "6s";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageTyping,
  ],
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(`${prefix}ping`)) {
    const FirstPingReply = await message.reply({
      content: "🎉 Calculating the Bot's Ping...",
      fetchReply: true,
    });

    const PingEmbed = new EmbedBuilder()
      .setTitle(client.user.username + " - Pong!")
      .setThumbnail(
        client.user.displayAvatarURL({
          dynamic: true,
          size: 4096,
          format: "png",
        })
      )
      .addFields(
        {
          name: `🛰 Message Ping:`,
          value: `**__${ping}ms__**`,
        },
        {
          name: `📊 API Latency:`,
          value: `**__${Math.round(client.ws.ping)}ms__**`,
        },
        {
          name: `⏳ Uptime:`,
          value: `<t:${Math.round(
            client.readyTimestamp / 1000
          )}:f> | <t:${Math.round(client.readyTimestamp / 1000)}:R>`,
        }
      )
      .setColor(`${message.guild.members.me.displayHexColor}`)

      .setFooter({
        text: `Requested by ${message.author.username}`,
        iconURL: message.author.displayAvatarURL({
          dynamic: true,
          size: 4096,
          format: "png",
        }),
      })
      .setTimestmap();

    setTimeout(function () {
      message.channel.sendTyping();
      FirstPingReply.edit({ content: "\u200B", embeds: [PingEmbed] });
    }, ms(time));
  }
});
client.on("ready", async () => {
  //Status of your bot; also you can change "idle" with: 'dnd', "online"
  client.user.setPresence({
    status: "idle",
    activities: [{ name: "Nothing...", type: ActivityType.Watching }],
  });

  //Join to a Voice Channel
  setInterval(() => {
    const connection = joinVoiceChannel({
      channelId: "Voice Channel ID",
      guildId: "Guild ID",
      selfDeaf: false, // Also you change it to true for deafen in Voice Channel
      adapterCreator: client.guilds.cache.get("Guild ID").voiceAdapterCreator,
    });
  }, 15000);

  console.log(`${client.user.username} ready!\nGithub: https://github.com/masihdev1 | Don't forget to ⭐`);
});

client.login("TOKEN");
