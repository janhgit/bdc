const axios = require('axios');
const lfmconfig = require('./lfmconfig.json')
const schema = require('../../db/login');
const BaseCommand = require('../../utils/structures/BaseCommand');
module.exports = class FmrecentCommand extends BaseCommand {
  constructor() {
    super('fmrecent', 'last-fm', []);
  }

 async run(client, message, args) {
  
  
  const username = message.mentions.users.first() || message.author
 
  }
}