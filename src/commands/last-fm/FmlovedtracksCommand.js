const axios = require('axios');
const loginschema = require('../../db/login');
const lfmconfig = require('./lfmconfig')
const emoteschema = require('../../db/emote')
const disbut = require('discord.js-buttons')
const BaseCommand = require('../../utils/structures/BaseCommand');
const randomstring = require('randomstring')
module.exports = class FmlovedtracksCommand extends BaseCommand {
  constructor() {
    super('fmlovedtracks', 'last-fm', []);
  }

  async run(client, message, args) {
    const id = randomstring.generate(5)
    const username = message.mentions.users.first() || message.author
    loginschema.findById(username.id)
      .then(res => {
        if (!res) {
          return message.channel.send({
            embed: {
              title: "looks like you are not logged in ",
              description: "please run ,fmlogin to login"
            }
          })
        }
        const fmusername = res.fmusername
        const request_url = `http://ws.audioscrobbler.com/2.0/?method=user.getlovedtracks&user=${res.fmusername}&limit=15&api_key=${lfmconfig.apikey}&format=json`
        let response = ``
       
        axios
          .get(request_url)
          .then(res => {
            const attrbase = res.data.lovedtracks['@attr']
            const attr = {
              totalPages: res.data.lovedtracks['@attr'].totalPages,
              total: attrbase.total
            }
            console.log()
            for (let i = 0; i < 15; i++) {
              const base = res.data.lovedtracks.track[i];
              const items = {
                name: base.name,
                artist: base.artist.name,
                url: base.url
              }
              response += ` **[${items.name}](${items.url})** - *${items.artist}*\n `
            }

            let button = new disbut.MessageButton()
              .setStyle('blurple') //default: blurple
              .setLabel('>') //default: NO_LABEL_PROVIDED
              .setID(id) //note: if you use the style "url" you must provide url using .setURL('https://example.com')
            let member = message.mentions.users.first() || message.author
            let avatar = member.displayAvatarURL({ dynamic: true })
            message.channel.send({
              embed: {
                color: '36393F',
                author: {
                  name: `Loved Tracks - ${username.username}`,
                  url: `https://www.last.fm/user/${fmusername}`,
                  icon_url: avatar
                },
                description: response,
                footer: {
                  text: `${fmusername} has ${attr.total} loved tracks`
                },

              },
              button
            })


            .then(function (message) {
              let response_two = ``
              let a = 1
              let p = 1
              client.on('clickButton', async (button) => {
                if (button.id === id) {
                  a++
                  p++
                  const request_two = `http://ws.audioscrobbler.com/2.0/?method=user.getlovedtracks&user=${fmusername}&limit=15&page=${a}&api_key=${lfmconfig.apikey}&format=json`
                  console.log(a)
               
              
                  axios
                    .get(request_two)
                    .then((result) => {

                      for (let i = 0; i < 15; i++) {
                       
                        const test = result.data.lovedtracks.track[i];
                        const items = {
                          name: test.name,
                          artist: test.artist.name,
                          url: test.url
                        }
                        
                        response_two += ` **[${items.name}](${items.url})** - *${items.artist}*\n `
                      }
                      message.edit({
                        embed: {
                          color: '36393F',
                          author: {
                            name: `Loved Tracks - ${username.username}`,
                            url: `https://www.last.fm/user/${fmusername}`,
                            icon_url: avatar
                          },
                          description: response_two,
                          footer: {
                            text: `${fmusername} has ${attr.total} loved tracks | page: ${p}/${attr.totalPages}`,

                          },

                        },
                      })
                     
                    })
                    response_two = ``
                }


              });

            })

          })
      })
  }
}