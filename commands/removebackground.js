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
        .addAttachmentOption(option => option.setName('image').setDescription('image to remove background from')),
    async execute(interaction) {
        

        try {
            let image = interaction.options.getAttachment('image')
            let toSend = "test"
            const token = config.removeBGApiToken;
            // console.log(image.proxyURL)
            // interaction.reply(image.proxyURL)

            const inputPath = image.proxyURL;
            const formData = new FormData();
            formData.append('size', 'auto');
            formData.append('image_file', inputPath);//fs.createReadStream(inputPath), path.basename(inputPath));

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
                console.log(error)
                interaction.reply("There was an error!")
                //return console.error('Request failed:', error);
            });

            // const attachment = new Discord.MessageAttachment("no-bg.png")
            // await interaction.reply({content: toSend, files: [attachment]})
        } catch (error) {
            console.log(error)
            interaction.reply("There was an error!")
        }



    }
}