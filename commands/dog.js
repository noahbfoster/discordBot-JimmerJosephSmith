const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const {fetch} = require('cross-fetch')
const Discord = require("discord.js")
const config = require("../config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dog')
        .setDescription('get a random dog picture and post it'),
    async execute(interaction) {
        try {
            const response = await fetch(`https://dog.ceo/api/breeds/image/random`)
            const json = await response.json()
            // //console.log(json)
            // var toSend = ""
            // toSend += `**The weather for ${json.name}, ${json.sys.country}:**\n`
            // toSend += `Temperature: ${json.main.temp}F\n`
            // toSend += `Description: ${json.weather[0].description}\n`
            const attachment = new Discord.MessageAttachment(json.message)
            //await interaction.reply({content: toSend, files: [attachment]})
            await interaction.reply({files: [attachment]})
        } catch (error) {
            console.log(error)
            interaction.reply("problems occurred.")
        }
    }
}