const axios = require('axios');
const lfmconfig = require('./lfmconfig.json')
const schema = require('../../db/login');
const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageAttachment } = require('discord.js')
module.exports = class FmchartCommand extends BaseCommand {
  constructor() {
    super('fmchart', 'last-fm', ['fmc']);
  }

  async run(client, message, args) {
    const username = message.mentions.users.first() || message.author
    schema.findById(username.id)
    .then((res) => {
      const fmname = res.fmusername
      let period = ``
      if(!res){
        return message.channel.send({embed :{
          title: "looks like you are not logged in ",
          description: "please run ,fmlogin to login"
        }})
      }

      console.log(message.content)
      const content = message.content
      if(content.includes("7day") === true){
         period = "7day"
      }
      else if(content.includes("1month") === true){
        period = "1month"
      }
      else if(content.includes("3month") === true){
        period = "3month"
      }
      else if(content.includes("6month") === true){
        period = "6month"
      }
      else if(content.includes("12month") === true){
        period = "12month"
      }
      else if(content.includes("overall") === true){
        period = "overall"
      }
      else if(!args[0]){
        period = "7day"
      }

      const img_url = `https://lastfm-collage.herokuapp.com/collage?username=${fmname}&method=album&period=${period}&column=3&row=3&caption=true&scrobble=true`
      // const pic = new MessageAttachment(`https://lastfm-collage.herokuapp.com/collage?username=${fmname}&method=album&period=${period}&column=3&row=3&caption=true&scrobble=true`)
      message.channel.send(`${fmname}'s ${period} chart`, {embed: {
        image: {
          url: img_url
        }
      }})
      .catch(err => console.error(err))
    })

    
  }
}