const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class GivestaffCommand extends BaseCommand {
  constructor() {
    super('givestaff', 'fun', []);
  }

  run(client, message, args) {
    let role = message.guild.roles.cache.find(r => r.id === "817853644464062465");

  
    message.guild.member(message.member).roles.add(role);

  }
}