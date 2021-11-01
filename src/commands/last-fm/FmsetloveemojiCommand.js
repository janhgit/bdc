const schema = require('../../db/loveemote')
const BaseCommand = require('../../utils/structures/BaseCommand');
module.exports = class FmsetloveemojiCommand extends BaseCommand {
  constructor() {
    super('fmsetloveemoji', 'last-fm', ['fmsle']);
  }

  run(client, message, args) {
    const emote = args[0];
    if(emote.includes(">" ||"<")){
      return message.channel.send("Please use an emoji that isnt from a discord server ")
    }
    if(!emote){
      return message.channel.send("please provide one emoji. It has to be a standart emoji that isnt from a discord server .")
    }
    console.log(emote)
    schema.findByIdAndUpdate(message.author.id, { emote: emote}, { upsert: true })
    .then(result => {
      console.log(result);
      message.channel.send("success")
    })
    }
  }
