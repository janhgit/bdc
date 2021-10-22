const BaseCommand = require('../../utils/structures/BaseCommand');
const disbut = require("discord-buttons")

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'util', []);
  }

  run(client, message, args) {
    let button = new disbut.MessageButton()
          .setStyle('url')
          .setURL(`https://bdcgg.gitbook.io/bdc-docs/`)
          .setLabel(`The Official BDC docs`)
          message.channel.send("please note that the docs are still in development. So it may not be completed with all the commands" , button)
  }
}