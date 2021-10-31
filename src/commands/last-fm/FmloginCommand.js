const axios = require("axios")
const BaseCommand = require('../../utils/structures/BaseCommand');
const loginschema = require('../../db/login');
const lfmconfig = require('./lfmconfig')
const md5 = require('md5')
const disbut = require('discord.js-buttons')
const randomstring = require('randomstring')


module.exports = class FmloginCommand extends BaseCommand {
  constructor() {
    super('fmlogin', 'last-fm', []);
  }

  async run(client, message, args) {
    const _id = message.author.id
    const id = randomstring.generate(5)
    axios
      .get(lfmconfig.tokenurl)
      .then((res) => {
        const token = res.data.token
        const RequestAuthorization = `http://www.last.fm/api/auth/?api_key=${lfmconfig.apikey}&token=${token}`
     
        let button = new disbut.MessageButton()
          .setStyle('green') //default: blurple
          .setLabel('Click me after you logged in on last.fm') //default: NO_LABEL_PROVIDED
          .setID(id) //note: if you use the style "url" you must provide url using .setURL('https://example.com')
          let button2 = new disbut.MessageButton()
          .setStyle('url') //default: blurple
          .setLabel('Click me to login') //default: NO_LABEL_PROVIDED
          .setID(id) //note: if you use the style "url" you must provide url using .setURL('https://example.com')
          .setURL(RequestAuthorization)

        client.users.cache.get(message.author.id).send({
          embed: {
            color: '36393F',
            // title: `Click here to login `,
            url: RequestAuthorization,
            description: `**First please click the grey button. __After__ you logged in on the last.fm Webiste please click the green button **`,
            timestamp: Date.now()
          },
          buttons: [
            button2, button
          ]

        })
          .then(function (message) {
            
            client.on('clickButton', async (button) => {
              if (button.id === id) {
                const api_sig_query = `api_key${lfmconfig.apikey}methodauth.getSessiontoken${token}${lfmconfig.apisecret}`
                const apI_sig = md5(api_sig_query);
                axios
                  .get(`https://ws.audioscrobbler.com/2.0/?method=auth.getSession&api_key=${lfmconfig.apikey}&token=${token}&format=json&api_sig=${apI_sig}`)
                  .then(res => {
                    console.log(res.data)
                    message.edit(":white_check_mark: successfully logged you in, thank you for using BDC")
                    const loginCreds = new loginschema({
                      _id: _id,
                      sk: res.data.session.key,
                      fmusername: res.data.session.name,
                    })

                    loginCreds.save()
                      .then((res) => {
                        console.log(res)
                      })
                      .catch((err) => {
                        console.error(err);
                      })


                  })
                  .catch((err) => {
                    message.edit("something went wrong... Are you sure you FIRST pressed the grey button, logged in and THEN pressed the green button?.\n Please try again")
                  })
              }
            });

          })
      })}}