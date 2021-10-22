const BaseCommand = require('../../utils/structures/BaseCommand');
const lfmconfig = require('./lfmconfig')

module.exports = class FmtopartistsCommand extends BaseCommand {
  constructor() {
    super('fmtopartists', 'last-fm', []);
  }

 async run(client, message, args) {
    message.channel.send('fmtopartists command works');
  }
}