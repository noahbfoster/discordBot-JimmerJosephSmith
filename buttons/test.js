const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('test button'),
    async execute(interaction) {
        console.log(interaction)
        interaction.reply("test button")
    }
}