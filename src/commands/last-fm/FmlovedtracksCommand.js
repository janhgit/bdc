const axios = require('axios');
const loginschema = require('../../db/login');
const lfmconfig = require('./lfmconfig')
const emoteschema = require('../../db/emote')
const BaseCommand = require('../../utils/structures/BaseCommand');
module.exports = class FmlovedtracksCommand extends BaseCommand {
  constructor() {
    super('fmlovedtracks', 'last-fm', []);
  }

  async run(client, message, args) {
    loginschema.findById(username.id)
    .then(res => {
      if(!res){
        return message.channel.send({embed :{
          title: "looks like you are not logged in ",
          description: "please run ,fmlogin to login"
        }})
      }
      
    })
  }
}