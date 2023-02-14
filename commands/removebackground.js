const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const config = require("../config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removebackground')
        .setDescription('removes image background')
        .addAttachmentOption(option => option.setName('image').setDescription('image to remove the background from')),
    async execute(interaction) {
        

        try {
            let image = interaction.options.getAttachment('image')
            let toSend = "Background Removed!"
            const token = config.removeBGApiToken;

            const formData = new FormData();
            formData.append('size', 'auto');
            formData.append('image_url', image.proxyURL);

            axios({
                method: 'post',
                url: 'https://api.remove.bg/v1.0/removebg',
                data: formData,
                responseType: 'arraybuffer',
                headers: {
                  ...formData.getHeaders(),
                  'X-Api-Key': token,
                },
                encoding: null
              })
              .then((response) => {
                if(response.status != 200) return console.error('Error:', response.status, response.statusText);
                fs.writeFileSync("no-bg.png", response.data);
                const attachment = new Discord.MessageAttachment("no-bg.png")
                interaction.reply({content: toSend, files: [attachment]})
              })
              .catch((error) => {
                console.error('Request failed:', error);
                interaction.reply("There was an error!")
              });
        } catch (error) {
            console.log(error)
            interaction.reply("There was an error!")
        }



    }
}