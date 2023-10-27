const { SlashCommandBuilder } = require('@discordjs/builders');
const helpers = require('../helpers.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('adminlist')
        .setDescription('reply with a list of admins'),
    async execute(interaction) {
        const admins = await helpers.returnAdmins(interaction)
        var message = "Admins are: "
        var adminsString = ""
        admins.forEach(e => {
            adminsString = adminsString + ", " + e
        });
        adminsString = adminsString.slice(2)
        message = message+adminsString
        interaction.reply({content: message, ephemeral: true})
    }
}