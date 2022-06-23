const { SlashCommandBuilder } = require('@discordjs/builders');
const PasswordMaker = require("../passwordMaker.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('generate')
        .setDescription('Generates several passwords and sends them to your DMs'),
    async execute(interaction) {
      interaction.member.send("Random Pronounceable Password: " + PasswordMaker.wordoidPasswordGenerator())
      interaction.member.send("Random Password: " + PasswordMaker.getRandomPassword(12))
      interaction.member.send("Random English Word based Password: " + PasswordMaker.dictionaryPasswordGenerator(8))
      interaction.reply("Passwords Generated. Check your DMs.")
    }
}