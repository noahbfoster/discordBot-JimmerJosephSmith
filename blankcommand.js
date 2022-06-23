const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('')
        .setDescription(''),
    async execute(interaction) {
        
    }
}

/* command with a target:
module.exports = {
    data: new SlashCommandBuilder()
        .setName('')
        .setDescription('')
        .addUserOption(option => option.setName('target').setDescription('the target user')),
    async execute(interaction) {
        
    }
} */