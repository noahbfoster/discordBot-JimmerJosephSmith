const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const { setEnvironmentData } = require('worker_threads');
//const vote = require('../storage/vote.json');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('setupvote')
        .setDescription('Command for setting up votes')
        .addStringOption(option => option.setName('prompt').setDescription('What are users voting about?'))
        .addStringOption(option => option.setName('choices').setDescription('Vote choices (separate by vertical lines)')),
    async execute(interaction) {
        var vote;
        let setVote = async function() {
            try {
                vote = require('../storage/vote.json')
            } catch {
                var voteObject = {"ongoing":false,"currentVote":[],"voteResults":[],"alreadyVoted":{}}
                var voteString = JSON.stringify(voteObject)
                await fs.writeFileSync('./storage/vote.json', voteString, {flag: "w"})
                // setVote2();
                vote = require('../storage/vote.json')
            }
        }
        await setVote()
        if (vote.ongoing) {
            interaction.reply("A Vote is currently ongoing")
        } else {
            var currentVote = []
            currentVote.push(interaction.options.getString('prompt'))
            var choices = interaction.options.getString('choices').split("|")
            currentVote = currentVote.concat(choices)
            var voteObject = {"ongoing":true,"currentVote":currentVote,"voteResults":[],"alreadyVoted":{}}
            var voteString = JSON.stringify(voteObject)
            await fs.writeFileSync('./storage/vote.json', voteString, {flag: "w"})
            let toSend = ""
            toSend+="A new vote has begun! Use '/vote' to vote for your option number choice."
            toSend+=("\nPrompt: "+currentVote[0])
            i=1
            while (i<(currentVote.length)) {
                toSend+=("\nOption "+i+": "+currentVote[i])
                i++
            }
            interaction.channel.send(toSend)
        }
        
    }
}