const mongoose = require("mongoose")
const { Client } = require('discord.js');
const dblogin = "mongodb+srv://admin:admin@bdc.xz08c.mongodb.net/bdc?retryWrites=true&w=majority"
const { registerCommands, registerEvents } = require('./utils/registry');
const config = require('../slappey.json');
const client = new Client();
const DisTube = require('distube')
// client.distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true, leaveOnFinish: false })
require('discord-buttons')(client);
const disbut = require('discord-buttons');
const { MessageButton, MessageActionRow } = require('discord-buttons');



(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.prefix = config.prefix;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(config.token);
  client.user.setActivity(",help" ,{type: "WATCHING" , Status : "idle"}) 
  
})();

mongoose.connect(dblogin)
.then(() => {
  console.log("logged in")
})
const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``

// client.distube
//     .on("playSong", (message, queue, song) => message.channel.send({
//         embed: {
//             title: "now playing",
//             description: `\`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`
//         }
//     }
//     ))
//     .on("addSong", (message, queue, song) => message.channel.send(
//         `| Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
//     ))
//     .on("playList", (message, queue, playlist, song) => message.channel.send(
//         `| Play \`${playlist.title}\` playlist (${playlist.total_items} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
//     ))
//     .on("addList", (message, queue, playlist) => message.channel.send(
//         ` | Added \`${playlist.title}\` playlist (${playlist.total_items} songs) to queue\n${status(queue)}`
//     ))
//     // DisTubeOptions.searchSongs = true
//     .on("searchResult", (message, result) => {
//         let i = 0
//         message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`)
//     })
//     // DisTubeOptions.searchSongs = true
//     .on("searchCancel", message => message.channel.send(`${client.emotes.error} | Searching canceled`))
//     .on("error", (message, err) => message.channel.send(`${client.emotes.error} | An error encountered: ${err}`))

