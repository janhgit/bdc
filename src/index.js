const mongoose = require("mongoose")
const { Client } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const config = require('../slappey.json');
const client = new Client();
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
