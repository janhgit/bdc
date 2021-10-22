const disbut = require("discord-buttons")
const schema = require('../../db/login')
const BaseCommand = require('../../utils/structures/BaseCommand');
module.exports = class FmaccountCommand extends BaseCommand {
  constructor() {
    super('fmaccount', 'last-fm', []);
  }

  async run(client, message, args) {
    const username = message.mentions.users.first() || message.author
    schema.findById(username.id)
      .then((res) => {
        const fmname = res.fmusername
        let button = new disbut.MessageButton()
          .setStyle('url')
          .setURL(`https://www.last.fm/user/${fmname}`)
          .setLabel(`${username.username}s last.fm profile`)
          message.channel.send("click the button to get to the profile" , button)
      })

  }
}