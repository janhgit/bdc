const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class FmfriendnowplayingCommand extends BaseCommand {
  constructor() {
    super('fmfriendnowplaying', 'last-fm', []);
  }

  run(client, message, args) {
    message.channel.send('fmfriendnowplaying command works');
  }
}