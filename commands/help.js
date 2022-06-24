const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('node:fs');
const path = require('node:path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('send a commands list to your DMs'),
    async execute(interaction) {
        const commands = [];
        // const commandsPath = path.join(__dirname, 'commands');
        const commandsPath = path.join(__dirname, '');
        //const commandsPath = './commands'
        console.log("Commands Path: "+commandsPath)
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            console.log(file)
            const filePath = path.join(commandsPath, file);
            //console.log(filePath)
            const command = require(filePath);
            //console.log(command)
            commands.push(command.data.toJSON());
            //console.log(commands)
        }
        //console.log(commands)
        var toSend = "The list of available commands is as follows :\n```"
        commands.forEach(command => {
            toSend = toSend + "/" + command.name + ": " + command.description+"\n";
        });
        toSend = toSend + "```"
        interaction.member.user.send(toSend)
        interaction.reply("Commands list was send to your DMs")
    }
}