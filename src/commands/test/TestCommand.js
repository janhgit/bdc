const BaseCommand = require('../../utils/structures/BaseCommand');
const MessageEmbed = 
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('test', 'testing', []);
  }

  async run(client, message, args) {
    message.channel.send({embed: {
      description: "[Guide](https://discordjs.guide/ 'optional hovertext')"
    }});
  }
}