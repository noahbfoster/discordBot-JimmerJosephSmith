const { SlashCommandBuilder } = require('@discordjs/builders');
var AES = require("crypto-js/aes");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('encrypt')
        .setDescription('Encrypt a string with a given key using AES')
        .addStringOption(option => option.setName('key').setDescription('the encryption key'))
        .addStringOption(option => option.setName('plaintext').setDescription('the string you are encrypting')),
    async execute(interaction) {
        let key = interaction.options.getString('key')
        let plaintext = interaction.options.getString('plaintext')
        if (key == null) {
            interaction.reply("You did not enter a key")
        } else if (plaintext == null) {
            interaction.reply("You did not enter a plaintext")
        } else {
            var ciphertext = AES.encrypt(plaintext, key);
            messageText = "Your Ciphertext is: "+ciphertext;
            interaction.reply({content: messageText, ephemeral: true});
        }
    }
}