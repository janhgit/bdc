const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super('ban', 'moderation', []);
  }

  run(client, message, args) {
    if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('You cannot ban members')

    let member = message.mentions.members.first()
    if (!member) return message.reply('Please specify a member for me to ban them')
    let reason = args.slice(1).join(" ");
    if (!reason) reason = 'No Reason Given';
    // if (!member.banable) return message.reply('This member is not banable')

    member.kick(reason + ` |Banned by ${message.author.username}`)
    .then((r) => message.reply(":thumbsup:"))
    .catch(err => console.log(err));
  }
}