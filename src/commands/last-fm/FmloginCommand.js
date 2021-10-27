const axios = require("axios")
const BaseCommand = require('../../utils/structures/BaseCommand');
const loginschema = require('../../db/login');
const lfmconfig = require('./lfmconfig')
const md5 = require('md5')

module.exports = class FmloginCommand extends BaseCommand {
  constructor() {
    super('fmlogin', 'last-fm', []);
  }

  async run(client, message, args) {
    axios
      .get(lfmconfig.tokenurl)
      .then((res) => {
        const token = res.data.token
        const RequestAuthorization = `http://www.last.fm/api/auth/?api_key=${lfmconfig.apikey}&token=${token}`
        client.users.cache.get(message.author.id).send({
          embed: {
            color: '36393F',
            title: `Click here to login `,
            url: RequestAuthorization,
            description: `**This Link is invalid after 2 mins. It takes 2 minutes for the bot to log you in.  **`,
            timestamp: Date.now()
          }
        })
        const api_sig_query = `api_key${lfmconfig.apikey}methodauth.getSessiontoken${token}${lfmconfig.apisecret}`
        const apI_sig = md5(api_sig_query)


        setTimeout(() => {
          axios
            .get(`https://ws.audioscrobbler.com/2.0/?method=auth.getSession&api_key=${lfmconfig.apikey}&token=${token}&format=json&api_sig=${apI_sig}`)
            .then(res => {
              console.log(res.data)
              message.reply(":white_check_mark: successfully logged you in, thank you for using BDC")
              const loginCreds = new loginschema({
                _id: message.author.id,
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
        }, 50000)



      }
      )




  }
}