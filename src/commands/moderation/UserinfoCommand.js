const Discord = require('discord.js')
const BaseCommand = require('../../utils/structures/BaseCommand');
const moment = require('moment');
module.exports = class UserinfoCommand extends BaseCommand {
  constructor() {
    super('userinfo', 'moderation', []);
  }

  run(client, message, args) {
    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
      user = message.author;
    } 
    console.log(user)

    const member = message.guild.member(user);

    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setAuthor( "","", user.displayAvatarURL({ dynamic: true }))
      .addField(`${user.tag}`, `${user}`, true)
      .addField("ID:", `${user.id}`, true)
      .addField("Nickname:", `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
      .addField("Status:", `${user.presence.status}`, true)
      .addField("In Server", message.guild.name, true)
      .addField("Game:", `${user.presence.game ? user.presence.game.name : 'None'}`, true)
      .addField("Bot:", `${user.bot}`, true)
      .addField("Joined The Server On:", `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY")}`, true)
      .addField("Account Created On:", `${moment.utc(user.createdAt).format("dddd, MMMM Do YYYY")}`, true)
      .addField("Roles", member.roles.cache.map(r => '`'+r.name+'`').join(' - '), true)

      .setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`)
    message.channel.send({ embed });
  }
}