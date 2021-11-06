const BaseCommand = require('../../utils/structures/BaseCommand');
const schema = require('../../db/login')
module.exports = class FmsettingsCommand extends BaseCommand {
  constructor() {
    super('fmsettings', 'last-fm', []);
  }

  async run(client, message, args) {
    const username = message.author

    schema.findById(username.id)
      .then((res) => {
        if (args[0] == "track" && !res.track) {
          schema.findByIdAndUpdate(username.id, { track: true }, { upsert: true })
            .then(a => {
             return message.channel.send("👍")
              console.log(a)
            })
        }
        if(args[0] == "track" && res.track) {
          schema.findByIdAndUpdate(username.id, { track: false }, { upsert: true })
          .then(a => {
           
            return message.channel.send("👍")

          })
        }
      })
      
  }
}