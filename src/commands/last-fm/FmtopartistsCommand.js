const BaseCommand = require('../../utils/structures/BaseCommand');
const schema = require('../../db/login');
const lfmconfig = require('./lfmconfig');
const { default: axios } = require('axios');

module.exports = class FmtopartistsCommand extends BaseCommand {
  constructor() {
    super('fmtopartists', 'last-fm', ['fmta']);
  }

  async run(client, message, args) {
    const username = message.mentions.users.first() || message.author
    schema.findById(username.id)
      .then((res) => {
        if (!res) {
          message.channel.stopTyping();
          return message.channel.send({
            embed: {
              title: "looks like you are not logged in ",
              description: "please run ,fmlogin to login"
            }
          })

        }
        let period = ``
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

        const fmusername = res.fmusername
        const request_url = `http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${fmusername}&period=${period}&api_key=${lfmconfig.apikey}&limit=10&format=json`
        let response = ``
        axios
          .get(request_url)
          .then((res) => {
            for (let i = 0; i < res.data.topartists.artist.length; i++) {
              const base = res.data.topartists.artist[i]
              const items = {
                name: base.name,
                playcount: base.playcount,
                rank: base['@attr'].rank

              }
              // console.log(items)
              response += `${items.rank} : **${items.name}** - *_${items.playcount}_*\n `
            }
            console.log(response)
            let member = message.mentions.users.first() || message.author
            let avatar = member.displayAvatarURL({ dynamic: true })
            message.channel.send({
              embed: {
                color: '36393F',
                author: {
                  name: `Top Artists - ${username.username}`,
                  url: `https://www.last.fm/user/${fmusername}`,
                  icon_url: avatar
                },
                description: response,
                footer: {
                  text: ` These are the top artists for ${period}`,
                  
                },
              }
            })
              // .then(function (message) {
              //   message.react('➡️')
              //   client.on('messageReactionAdd', (reaction, message, users, user) => {
              //     console.log("test")

              //     axios
              //       .get(request_url)
              //       .then((res) => {
              //         for (let i = 0; i < res.data.topartists.artist.length; i++) {
              //           const base = res.data.topartists.artist[i]
              //           const items = {
              //             name: base.name,
              //             playcount: base.playcount,
              //             rank: base['@attr'].rank

              //           }
              //           // console.log(items)
              //           response += `${items.rank} : **${items.name}** - *_${items.playcount}_*\n `
              //         }
              //       })

              //     console.log(response)
              //     // let member = message.mentions.users.first() || message.author
              //     // let avatar = member.displayAvatarURL({ dynamic: true })

              //     message.channel.send({
              //       embed: {
              //         color: '36393F',
              //         author: {
              //           name: `Top Artists - ${username.username}`,
              //           url: `https://www.last.fm/user/${fmusername}`,
              //           // icon_url: avatar
              //         },
              //         description: response,
              //       }
              //     })

              //   })

              // })
          })
      })
  }
}