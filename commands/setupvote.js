const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const helpers = require('../helpers.js')
//const vote = require('../storage/vote.json');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('setupvote')
        .setDescription('(Admin only) Command for setting up votes')
        .addStringOption(option => option.setName('prompt').setDescription('What are users voting about?'))
        .addStringOption(option => option.setName('choices').setDescription('Vote choices (separate by vertical lines)')),
    async execute(interaction) {
        var vote;

        if (helpers.isAdmin(interaction.member)!=true) {
            interaction.reply("Only admins can start votes. do /adminlist to see the list of admins")
            return
        }
        try {
            //vote = require('../storage/vote.json')
            let voteData = await fs.readFileSync('./storage/vote.json')
            vote = JSON.parse(voteData)
        } catch {
            var voteObject = {"ongoing":false,"currentVote":[],"voteResults":[],"alreadyVoted":{}}
            var voteString = JSON.stringify(voteObject)
            await fs.writeFileSync('./storage/vote.json', voteString, {flag: "w"})
            //vote = require('../storage/vote.json')
            let voteData = await fs.readFileSync('./storage/vote.json')
            vote = JSON.parse(voteData)
        }
        //await setVote()
        if (vote.ongoing==true) {
            interaction.reply("A Vote is currently ongoing")
        } else {
            var currentVote = []
            currentVote.push(interaction.options.getString('prompt'))
            var choices = interaction.options.getString('choices').split("|")
            currentVote = currentVote.concat(choices)
            var voteResults = []
            let i = 0
            while (i<(currentVote.length-1)) {
                voteResults.push(0)
                i++
            }
            var voteObject = {"ongoing":true,"currentVote":currentVote,"voteResults":voteResults,"alreadyVoted":{}}
            var voteString = JSON.stringify(voteObject)
            await fs.writeFileSync('./storage/vote.json', voteString, {flag: "w"})
            let toSend = ""
            //toSend+="A new vote has begun! Use '/vote' to vote for your option number choice.\n"
            toSend+=("Prompt: "+currentVote[0])
            i=1
            while (i<(currentVote.length)) {
                toSend+=("\nOption "+i+": "+currentVote[i])
                i++
            }
            interaction.channel.send(toSend)
            interaction.reply("A new vote has begun! Use '/vote' to vote for your option number choice.")
        }
        
    }
}