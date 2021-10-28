const loginschema = require('../../db/login');
const lfmconfig = require('./lfmconfig')
const lfmemoji = require('../../db/emote')
const BaseCommand = require('../../utils/structures/BaseCommand');
module.exports = class FmsetemojisCommand extends BaseCommand {
  constructor() {
    super('fmsetemojis', 'last-fm', ['fmsetemote', 'fmreact']);
  }

  async run(client, message, args) {
    
    if (!args[0]) {
      return message.channel.send({
        embed: {
          title: "please add 2 emotes example: ,fmsetemote <a:W_:840289570263924777> <a:L_:840289418132324392>   the emotes have to be from a server the bot is in and have one space between them. "
        }
      })
    }
    console.log(args[0], args[1])
    // const emote1 = `${args[0].split('>')[0]}>`
    // const emote2 = `${args[0].split('>')[1]}>`
    const emote1 = args[0]
    const emote2 = args[1]
    if(emote2 == undefined ){
      return message.channel.send("there was an error. Make sure the emotes are from a server the bot is in and the 2 emotes have a space between them.")
    }
    lfmemoji.findByIdAndUpdate(message.author.id, { emoteOne: emote1, emoteTwo: emote2,}, { upsert: true })
    .then(res => {
      console.log(res)
      return message.channel.send(`set your emojis to ${emote1} and ${emote2}`)
    })
  
    
  }
}
