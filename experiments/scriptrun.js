const { SlashCommandBuilder } = require('@discordjs/builders');
const { spawn } = require('node:child_process');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('scriptrun')
		.setDescription('Wouldn\'t you like to know, Weather boy'),
	async execute(interaction) {
        const bat = spawn('cmd.exe', ['/c', 'my.bat']);
		bat.stdout.on('data', (data) => {
            console.log(data.toString());
        })

        bat.stderr.on('data', (data) => {
            console.log(data.toString());
        })

        bat.on('exit', (code) => {
            console.log(`child exited with code ${code}`);
        })
        
        interaction.reply("huh.")
	},
};