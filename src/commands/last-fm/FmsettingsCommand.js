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
        if (args[0] == "track" && res.track == "false" || !res.track) {
          schema.findByIdAndUpdate(username.id, { track: true }, { upsert: true })
            .then(a => {
             return message.reply("👍 showing track plays now")
              console.log(a)
            })
        }
        if(args[0] == "track" && res.track == "true") {
          schema.findByIdAndUpdate(username.id, { track: false }, { upsert: true })
          .then(a => {
           
            return message.reply("👍not showing track plays anymore")

          })
        }

      if(args[0] == "colour"){
        schema.findByIdAndUpdate(username.id, { colour: args[1] }, { upsert: true })
        .then(b => {

          console.log(b)
          return message.channel.send(`👍`)
        })
       
      }

      })
      
  }
}