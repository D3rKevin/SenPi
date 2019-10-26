const { RichEmbed } = require ("discord.js")
const fs = require ('fs')
// const desc = JSON.parse(fs.readFileSync('embeddesc.json', 'utf8'))

const COLORS = {
    green: 0x2ecc71,
    blue: 0x3498db,
    darkblue: 0x2980b9,
    purple: 0x8e44ad,
    red: 0xc0392b,
    orange: 0xe67e22,
    white: 0xecf0f1,
    gray: 0x7f8c8d,
    yellow: 0xf1c40f,
    helpyellow: 0xFDD835
 }

module.exports = {

    error(msg, cont){
        var emb = new RichEmbed()
            .setColor(COLORS.red)
            .setDescription(cont)
            .setTitle('Oh no! That shouldn\'t have happened!')
        
        msg.channel.send('', emb)
    },

    help(msg){
        var emb = new RichEmbed()
            .setColor(COLORS.helpyellow)
            .setTitle('Awooo Command List')
            .setDescription()

        msg.reply('', emb)
    },
    succsess(msg, cont, title){
        var emb = new RichEmbed()
            .setColor(COLORS.green)
            .setDescription(cont)
        if(title){
            emb.setTitle(title)
        }
        
    },
    selfroles(msg){
        var emb = new RichEmbed()
            .setColor(COLORS.white)
            .setDescription("Following Roles are available to you:\nWeeb\nLeagueOfLegends\nOverwatch\n\nUse ,role add <rolename> to add yourself into that role")
            .setTitle("Available Roles")
        
        msg.reply('', emb)
    },
    roleshelp(msg){
        var emb = new RichEmbed()
            .setColor(COLORS.blue)
            .setDescription("Following Commands are available:\n\nadd - Adds you into a Role\nremove - Use this if you want to remove a Role\nlist - Lists all available Roles to you")
            .setTitle("Roles Help")

        msg.reply('', emb)
    }
 }