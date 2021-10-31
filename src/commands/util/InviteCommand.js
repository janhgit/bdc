const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class InviteCommand extends BaseCommand {
  constructor() {
    super('invite', 'util', []);
  }

  run(client, message, args) {
    message.channel.send({embed : {
      title: "Click here to invite me",
      url : "https://discordapp.com/api/oauth2/authorize?client_id=847501807567503360&scope=bot&permissions=8",
      description: "thanks for adding:)"
    }})
  }
}