const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const {fetch} = require('cross-fetch')
const Discord = require("discord.js")
const config = require("../config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('retrieve weather by Zip code')
        .addStringOption(option => option.setName('zip').setDescription('zip code for weather retrieval')),
    async execute(interaction) {
        try {
            const token = config.weatherApiToken;
            const zip = interaction.options.getString('zip')
            //console.log(zip)
            const responseZip = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=${token}`)
            const jsonZip = await responseZip.json()
            //console.log(jsonZip)
            var lat = jsonZip.lat
            var lon = jsonZip.lon
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${token}`)
            const json = await response.json()
            //console.log(json)
            var toSend = ""
            toSend += `**The weather for ${json.name}, ${json.sys.country}:**\n`
            toSend += `Temperature: ${json.main.temp}F\n`
            toSend += `Description: ${json.weather[0].description}\n`
            const attachment = new Discord.MessageAttachment(`https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`)
            await interaction.reply({content: toSend, files: [attachment]})
        } catch (error) {
            console.log(error)
            interaction.reply("problems occurred. you probably didn't include a correct zip code")
        }
    }
}