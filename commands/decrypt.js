const { SlashCommandBuilder } = require('@discordjs/builders');
var AES = require("crypto-js/aes");
var CryptoJS = require("crypto-js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('decrypt')
        .setDescription('Decrypt a string with a given key using AES')
        .addStringOption(option => option.setName('key').setDescription('the encryption key'))
        .addStringOption(option => option.setName('ciphertext').setDescription('the string you are decrypting')),
    async execute(interaction) {
        let key = interaction.options.getString('key')
        let ciphertext = interaction.options.getString('ciphertext')
        if (key == null) {
            interaction.reply("You did not enter a key")
        } else if (ciphertext == null) {
            interaction.reply("You did not enter a plaintext")
        } else {
            var plaintext = AES.decrypt(ciphertext, key);
            messageText = "Your Decrypted Plaintext is: "+plaintext.toString(CryptoJS.enc.Utf8);
            interaction.reply({content: messageText, ephemeral: true});
        }
    }
}