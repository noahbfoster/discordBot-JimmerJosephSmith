var CryptoJS = require("crypto-js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hash')
        .setDescription('Hash a string with SHA-256')
        .addStringOption(option => option.setName('plaintext').setDescription('the string you are hashing')),
    async execute(interaction) {
        let plaintext = interaction.options.getString('plaintext')
        if (plaintext == null) {
            interaction.reply("You did not enter a plaintext")
        } else {
            var hash = CryptoJS.SHA256(plaintext);
            messageText = "The SHA256 hash of your plaintext is: "+hash;
            interaction.reply({content: messageText, ephemeral: true});
        }
    }
}