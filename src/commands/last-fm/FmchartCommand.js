const {Discord, MessageEmbed} = require('discord.js')
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
      let size = ``
      if(!res){
        return message.channel.send({embed :{
          title: "looks like you are not logged in ",
          description: "please run ,fmlogin to login"
        }})
      }

      console.log(message.content)
      const content = message.content
      if (content == "7day" || "1month" || "3month" || "6month" || "12month" || "overall") {
        period = args[0]
      }
      if (!args[0]) {
        period = "7day"
      }
      
      // const array = ["3x3" , "4x4", "5x5", "6x6", "7x7", "8x8"]
      //   // if (content == "3x3" || "4x4" || "5x5" || "6x6" || "7x7" || "8x8") {
      //   //   content = args[1]
      //   // }
      //   if(content)
      //   if (!args[1]) {
      //     period = "3x3"
      //   }
      if(args[0] == "help"){
       return message.channel.send({embed : {
         author:{
           name : `Fmchart - Help`
         },
          description: "valid timeperiods are:\n **7day\n 1month\n 3month\n 6month\n 12month\n overall\n**"
        }})
      }
      
      const img_url = `https://www.tapmusic.net/collage.php?user=${fmname}&type=${period}&size=3x3&caption=true&playcount=true`
      // const pic = new MessageAttachment(`https://lastfm-collage.herokuapp.com/collage?username=${fmname}&method=album&period=${period}&column=3&row=3&caption=true&scrobble=true`)
     const embed = new MessageEmbed()

     .setImage(img_url)
     .setColor('36393F')
     message.channel.send(`${period} chart for ${fmname}`,embed)
    })

    
  }
}