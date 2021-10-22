const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class BigfartCommand extends BaseCommand {
  constructor() {
    super('bigfart', 'fun', []);
  }

  run(client, message, args) {
    message.channel.send(`${message.author.username} just farted BIG. pretty stinky :dash: `);
  }
}