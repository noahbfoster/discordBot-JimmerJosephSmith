const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('defer')
        .setDescription('it makes the bot think'),
    async execute(interaction) {
        interaction.deferReply();
    }
}
