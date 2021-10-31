// const BaseCommand = require('../../utils/structures/BaseCommand');
// const ytdl = require('ytdl-core');
// const ytSearch = require('yt-search');
// const client = require('discord.js')
// const distube = require('distube')
// const DisTube = require('distube')
// distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true, leaveOnFinish: false })
// module.exports = class PlayCommand extends BaseCommand {
//   constructor() {
//     super('play', 'music-bot', []);
//   }

//   async run(client, message, args) {
//     const string = args.join(" ")
//     if (!string) return message.channel.send(` Please enter a song url or query to search.`)
//     try {
//         distube.play(message, string)
//     } catch (e) {
//         message.channel.send(` | Error: \`${e}\``)
//     }
//   }
// }