const {Discord, MessageEmbed} = require('discord.js')
const BaseCommand = require('../../utils/structures/BaseCommand');
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('test', 'testing', []);
  }

  async run(client, message, args) {
    const embed = new MessageEmbed()
    .setTitle("hi")
    .setImage(`https://www.tapmusic.net/collage.php?user=janh07&type=7day&size=3x3&caption=true&playcount=true`)
    message.channel.send(embed);
  }
}