const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class FartCommand extends BaseCommand {
  constructor() {
    super('fart', 'fun', []);
  }

  run(client, message, args) {
    message.channel.send(`${message.author.username} farted. claps in chat`)
  }
}