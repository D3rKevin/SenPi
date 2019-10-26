// Adds the Dependencies
const Discord = require ('discord.js')
const colors = require ('colors')
const opusscript = require ('opusscript')
const fs = require ('fs')
const Embeds = require ('./embed')
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'))
const client = new Discord.Client()
const ytdl = require ('ytdl-core')
const queue = new Map();


// Commandtree + Commands

var cmdmap = {
    test: cmd_test,
    kick: cmd_kick,
    ban: cmd_ban,
    baka: cmd_baka,
    help: cmd_help,
    role: cmd_role
//  help: cmd_help
}

// Testcommand to try things out
function cmd_test(msg){
    Embeds.help(msg)
}
// Kicks the Member in first Argument
function cmd_kick(msg, args){
    if (msg.mentions.members.first()){
       if (msg.member.hasPermission('KICK_MEMBERS')){
        if(msg.mentions.members.first().kickable){
            var member = msg.mentions.members.first()
            var user = msg.mentions.users.first()
            member.kick()
            msg.channel.send(`Kicked Member ${user.tag}`)
            .then(console.log(`Kicked Member `, user.tag , 'with the User ID:', member.id))
            }
        else{
            msg.channel.send(`Could not kick \'${args[0]}\', please make sure that the mentioned Memeber is kickable!`)
            .then(console.log('Error 2'))
            }
        }
        else {
        msg.reply('You don\'t have the permission to kick Members!')
        .then(console.log('Error 1'))
        } 
    }
    else {
        msg.reply('Please Mention a Memeber to kick!')
    }
    
}
// Bans the User in first Argument
function cmd_ban(msg, args){
    if(msg.mentions.members.first() != null) {
        if(msg.member.hasPermission('BAN_MEMBERS')){
            if(msg.mentions.members.first().bannable){
            var member = msg.mentions.members.first()
                user   = msg.mentions.users.first()
                member.ban()
                msg.channel.send(`Banned Member ${user.tag}`)
                .then(console.log(`Banned Member `, user.tag , 'with the User ID:', member.id))
            }
            else {
            msg.channel.send(`Could not ban ${args[0]}, please make sure that you mentioned a Member you are allowed to ban!`)
            .then(console.log("Error 4"))
            }
        }
        else {
        msg.reply('You don\'t have the permission to ban Members!')
        .then(console.log("Error 1"))
        }
    }
    else {
        msg.reply('Please Mention a Memeber to ban!')
    }
    
}
// Fun Command
function cmd_baka(msg, args){
    if(args[0] != null){
        msg.channel.send(`${args.join(' ')} ist ein Baka! >.<`)
    }
    else {
        msg.reply('du bist ein Baka!')
        .then(console.log("Error 8"))
    }
}

// Help Embed
function cmd_help(msg, args){
        Embeds.help(msg)
}


function cmd_role(msg, args){
    switch(args[0]){
        case "help":
            Embeds.roleshelp(msg)
            break;
        case "add":
            if (args[1] != null){
        
                    if(args[1].toLowerCase() in config.selfroles){
                        msg.member.addRole(config.selfroles[`${args[1]}`.toLowerCase()].id)
                        msg.reply(`you have been given the "${config.selfroles[`${args[1]}`.toLowerCase()].name}" Role! :3`)
                    }
                    else{
                        msg.reply(`${args[1]} is not a valid role!`)   
                    }
            }
            else {
                    msg.reply('Please choose a Role!')
            }
            break;
        case "remove":
            if(args[1]){
                if(args[1].toLowerCase() in config.selfroles){
                    msg.member.removeRole(config.selfroles[`${args[1]}`.toLowerCase()].id)
                    msg.reply(`removed Role "${config.selfroles[`${args[1]}`.toLowerCase()].name}"! UwU`)
                }
            }
            else{
                msg.reply("I can't remove you from nothing, baka!")
            }
            break;
        case "list":
            Embeds.selfroles(msg)
            break;
        
        default:
            msg.reply("You seem confused, use ',role help' to know more about this command.")
            break;
    }
}


// Events

// Ready Event, returns confirmation in console
client.on('ready', () => {
  console.log(`Eingeloggt als ${client.user.username}.`)
})

// Message Event, checks for User, then Prefix
client.on('message', (msg) => {

    var cont = msg.content,
        author = msg.member,
        chan = msg.channel,
        guild = msg.guild

    if ((author.id == config.owner || config.private != "1") && author.id != client.user.id) {
        if (cont.startsWith(config.prefix)){
            var invoke = cont.split(' ')[0].substr(config.prefix.length),
                args   = cont.split(' ').slice(1)
            if (invoke in cmdmap){
                cmdmap[invoke](msg, args)
            }
        }
        else if (cont.toLowerCase().startsWith("awoo")) {
            chan.send("<:awoo:530865156637327360>")
        }
        
        if (cont.toLowerCase().startsWith("i'm")){
            chan.send("Hello")
        }
        
    }
}
)


// Token Login
client.login(config.token)