const {Discord, MessageEmbed} = require('discord.js')
const BaseCommand = require('../../utils/structures/BaseCommand');


module.exports = class AvatarCommand extends BaseCommand {
  constructor() {
    super('avatar', 'fun', ['av']);
  }

  async run (client, message, args) {

    let member = message.mentions.users.first() || message.author

    let avatar = member.displayAvatarURL({dynamic: true , size: 1024 })
 {

    const embed = new MessageEmbed()
    .setTitle(`${member.username}'s avatar`)
    .setImage(avatar)
    .setColor("RANDOM")

    message.channel.send(embed);
}
}}