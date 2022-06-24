const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vote')
        .setDescription('submit your choice in an ongoing vote!')
        .addIntegerOption(option => option.setName('choice').setDescription('a number representing your vote choice')),
    async execute(interaction) {
        var vote;
        try {
            //vote = await require('../storage/vote.json')
            let voteData = fs.readFileSync('./storage/vote.json')
            vote = JSON.parse(voteData)
        } catch {
            interaction.reply("no vote was ongoing or it was erased.")
            return
        }
        if(vote.ongoing==false) {
            interaction.reply("No ongoing vote!")
            return
        }
        if (vote.alreadyVoted[''+interaction.member.id]) {
            interaction.reply("You already voted on this matter.")
            return
        }
        let num = interaction.options.getInteger('choice')
        if (num>vote.voteResults.length || num===null) {
            interaction.reply("Please enter a valid choice of vote number.")
            return
        }
        // interaction.reply("test "+num)
        var voteResults = vote.voteResults
        var alreadyVoted = vote.alreadyVoted
        voteResults[num-1] = voteResults[num-1]+1;
        alreadyVoted[''+interaction.member.id] = true
        console.log("someone voted for "+num)
        var voteObject = {"ongoing":vote.ongoing, "currentVote":vote.currentVote, "voteResults": voteResults, "alreadyVoted": alreadyVoted}
        var voteString = JSON.stringify(voteObject)
        await fs.writeFileSync('./storage/vote.json', voteString, {flag: "w"})
        // interaction.member.send(toSend)
        interaction.reply("Thanks for voting, "+interaction.member.user.username)
    }
}
