const { SlashCommandBuilder } = require('@discordjs/builders');
const { DefaultUserAgent } = require('@discordjs/rest');
var catFacts = require('../cat-facts.json');
const helpers = require('../helpers.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('annoy')
        .setDescription('(Admin only) Annoys a target user by sending random cat facts to them over a period of time.')
        .addUserOption(option => option.setName('target').setDescription('the target user')),
    async execute(interaction) {
        const user = interaction.options.getUser('target')
        if (helpers.isAdmin(interaction.member)) { 
            interaction.reply("Annoying "+user.username)
            annoy(user, 0, 10)
        } else {
            interaction.reply("You Aren't an Admin, Chief")
        }
    }
}

async function annoy(user, i, numMessages) { // every 10-40 seconds, send a random cat fact from the cat facts list using the helper, then send them to the targeted user, repeating numMessages times. // recursive function lol
    if (i<numMessages) {
      sleep(Math.floor(10000+Math.random()*30000)).then(()=>{
        message = catFacts[Math.floor(Math.random()*catFacts.length)]
        console.log("Sending to "+user.username+": "+message)
        //message = randomWords()+" is to "+randomWords()+" as "+randomWords()+" is to "+randomWords(); // old code to generate annoyances using random-words.js
        user.send(message)
        annoy(user, i+1, numMessages) // lul recursivity is fun
      })
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}