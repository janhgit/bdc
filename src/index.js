const mongoose = require("mongoose")
const { Client } = require('discord.js');
const config = require('../slappey.json');
const dblogin = config.db
const { registerCommands, registerEvents } = require('./utils/registry');
const client = new Client();
const DisTube = require('distube')
// distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true, leaveOnFinish: false })
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
  client.user.setActivity(",help | ,invite" ,{type: "LISTENING" , Status : "dnd"}) 
  
})();

mongoose.connect(dblogin)
.then(() => {
  console.log("logged in")
})
