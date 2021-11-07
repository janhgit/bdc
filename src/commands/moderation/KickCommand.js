const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'moderation', []);
  }

  run(client, message, args) {
    if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply('You cannot kick members')

    let member = message.mentions.members.first()
    if (!member) return message.reply('Please specify a member for me to kick them')
    let reason = args.slice(1).join(" ");
    if (!reason) reason = 'No Reason Given';
    if (!member.kickable) return message.reply('This member is not kickable')

    member.kick(reason + ` |Kicked by ${message.author.username}`)
    .then((r) => message.reply(":thumbsup:"))
    .catch(err => console.log(err));
  }
}