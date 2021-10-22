const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class FmaddfriendCommand extends BaseCommand {
  constructor() {
    super('fmaddfriend', 'last-fm', []);
  }

 async run(client, message, args) {
    message.channel.send('fmaddfriend command works');
  }
}