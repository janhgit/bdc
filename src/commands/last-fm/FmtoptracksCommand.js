const BaseCommand = require('../../utils/structures/BaseCommand');
const schema = require('../../db/login');
const lfmconfig = require('./lfmconfig');
const { default: axios } = require('axios');
const discord = require('discord.js');
const client = new discord.Client();
const disbut = require('discord.js-buttons')
const randomstring = require('randomstring')

module.exports = class FmtoptracksCommand extends BaseCommand {
  constructor() {
    super('fmtoptracks', 'last-fm', ['fmtt']);
  }

  run(client, message, args) {
    const id = randomstring.generate(5)
    const id_2 = randomstring.generate(5)
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
        if (content == "7day" || "1month" || "3month" || "6month" || "12month" || "overall") {
          period = args[0]
        }
        if (!args[0]) {
          period = "7day"
        }
        if (args[0] == "help") {
          return message.channel.send({
            embed: {
              color: '36393F',
              author: {
                name: `FM Top Tracks Help`,
              },
              description: "valid timeperiods are:\n **7day\n 1month\n 3month\n 6month\n 12month\n overall\n** ",
            }
          })
        }



        const fmusername = res.fmusername
        const request_url = `http://ws.audioscrobbler.com/2.0/?method=user.getTopTracks&user=${fmusername}&period=${period}&api_key=${lfmconfig.apikey}&limit=10&format=json`
        let response = ``
        axios
          .get(request_url)
          .then((res) => {
            const image = res.data.toptracks.track[0].image[3]['#text']
            for (let i = 0; i < res.data.toptracks.track.length; i++) {
              const base = res.data.toptracks.track[i]
              const items = {
                name: base.name,
                playcount: base.playcount,
                rank: base['@attr'].rank,
                url: base.url,
                artist: base.artist.name,


              }
              // console.log(items)
              response += `${items.rank} : **[${items.name}](${items.url})** - **${items.artist}** - _${items.playcount}_\n `
            }
            let button = new disbut.MessageButton()
              .setStyle('blurple') //default: blurple
              .setLabel('>') //default: NO_LABEL_PROVIDED
              .setID(id) //note: if you use the style "url" you must provide url using .setURL('https://example.com')
              let button2 = new disbut.MessageButton()
              .setStyle('blurple') //default: blurple
              .setLabel('<') //default: NO_LABEL_PROVIDED
              .setID(id_2) //note: if you use the style "url" you must provide url using .setURL('https://example.com')
            let member = message.mentions.users.first() || message.author
            let avatar = member.displayAvatarURL({ dynamic: true })
            message.channel.send({
              embed: {
                color: '36393F',
                author: {
                  name: `Top Tracks - ${username.username}`,
                  url: `https://www.last.fm/user/${fmusername}`,
                  icon_url: avatar
                },

                description: response,
                
                footer: {
                  text: ` These are the top Tracks for ${period}`,

                },
              },
              buttons:[button2, button]
            })
              .then(function (message) {


                let response_two = ``
                let a = 1
                
                client.on('clickButton', async (button) => {
                  if (button.id === id) {
                    a++
                    const request_two = `http://ws.audioscrobbler.com/2.0/?method=user.getTopTracks&user=${fmusername}&period=${period}&limit=10&page=${a}&api_key=${lfmconfig.apikey}&format=json`
                    console.log(a)
                    console.log(request_two)
                    axios
                      .get(request_two)
                      .then((result) => {
                        const image = res.data.toptracks.track[0].image[3]['#text']
                        const pages = res.data.toptracks['@attr'].totalPages
                        console.log(pages)
                        for (let i = 0; i < 10; i++) {
                          const base = result.data.toptracks.track[i]


                          const items = {
                            name: base.name,
                            playcount: base.playcount,
                            rank: base['@attr'].rank,
                            artist: base.artist.name,
                            url: base.url

                          }
                          // console.log(items)
                          response_two += `${items.rank} : **[${items.name}](${items.url})** - **${items.artist}** - _${items.playcount}_\n `

                        }
                        message.edit({
                          embed: {
                            color: '36393F',
                            author: {
                              name: `Top Tracks - ${username.username}`,
                              url: `https://www.last.fm/user/${fmusername}`,
                              icon_url: avatar
                            },
                            description: response_two,
                          
                            footer: {
                              text: ` These are the top Tracks for ${period} | Page ${a} / ${pages}`,

                            },

                          },
                        })
                        response_two = ``
                      })
                  }
                  console.log(response_two)

                });

                client.on('clickButton', async (button) => {
                  if (button.id === id_2) {
                    a--
                    const request_two = `http://ws.audioscrobbler.com/2.0/?method=user.getTopTracks&user=${fmusername}&period=${period}&limit=10&page=${a}&api_key=${lfmconfig.apikey}&format=json`
                    console.log(a)
                    console.log(request_two)
                    const pages = res.data.toptracks['@attr'].totalPages
                    axios
                      .get(request_two)
                      .then((result) => {
                        const image = res.data.toptracks.track[0].image[3]['#text']
                        console.log(image)
                        for (let i = 0; i < 10; i++) {
                          const base = result.data.toptracks.track[i]


                          const items = {
                            name: base.name,
                            playcount: base.playcount,
                            rank: base['@attr'].rank,
                            artist: base.artist.name,
                            url: base.url

                          }
                          // console.log(items)
                          response_two += `${items.rank} : **[${items.name}](${items.url})** - **${items.artist}** - _${items.playcount}_\n `

                        }
                        message.edit({
                          embed: {
                            color: '36393F',
                            author: {
                              name: `Top Tracks - ${username.username}`,
                              url: `https://www.last.fm/user/${fmusername}`,
                              icon_url: avatar
                            },
                            description: response_two,
                          
                            footer: {
                              text: ` These are the top Tracks for ${period} | Page ${a} / ${pages}`,

                            },

                          },
                        })
                        response_two = ``
                      })
                  }
                  console.log(response_two)

                });

              })

          })
      })
  }
}