// this code is from discordjs.guide and registers created commands with the discord server.

const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
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

console.log(commands)

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);