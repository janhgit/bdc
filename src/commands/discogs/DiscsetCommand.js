
const discogsSchema = require('../../db/discogs')
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class DiscsetCommand extends BaseCommand {
  constructor() {
    super('discset', 'discogs', []);
  }

  run(client, message, args) {
    
    const username = args[0];
    if(!username){
      return message.channel.send("you didnt provide a username. example : ,discset frankie111")
    }
    const user = message.author.id;
    const discogsLogin = new discogsSchema({
      _id: message.author.id,
      discname: args[0],
    })
    discogsLogin.save()
      .then((res) => {
        console.log(res)
        message.channel.send(":thumbsup:")
      })
      .catch((err) => {
        console.error(err);
      })
  }
}