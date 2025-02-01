const { SlashCommandBuilder } = require('@discordjs/builders');
const { DefaultUserAgent } = require('@discordjs/rest');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('courier')
        .setDescription('Sends a letter to the specified user.')
        .addUserOption(option => option.setName('target').setDescription('the target user'))
        .addStringOption(option => option.setName('message').setDescription('the message you are sending')),
    async execute(interaction) {
        const user = interaction.options.getUser('target')
        const message = interaction.options.getString('message')
        interaction.reply("Sending message to "+user.username)
        courier(user, interaction.user.username, message)
    }
}

async function courier(user, from, message) {
    messageToSend = "I've been looking for you. Got something I'm supposed to deliver, your hands only...\n\n" + "*A letter from " + from +":*\n```" + message + "```"
    user.send(messageToSend)
    console.log("Sending to "+user.username+": "+messageToSend)
}