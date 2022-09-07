const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('askdm')
        .setDescription('gives one of the classic DM responses'),
    async execute(interaction) {
        let responses = ['That could work.','Do you try it? Roll a dexterity saving throw',"I'm gonna need more dice","Remind me, what's your passive perception score?","What's your AC?","Ok. Make a wisdom saving throw.","You can certainly try.","Are you sure you want to do that?", "What's your HP again? No, your HP maximum.", "Nothing Happens", "This is going to hurt.", "Read this note. Don't tell anyone else about it.", "Hang on, I have to look this up.", "Roll a Constitution saving throw, if you would.", "Roll a History Check.", "I'm not even going to have you roll for it.", "Rocks fall, everyone dies.", "Could you give me an idea of the marching order?", "Where exactly are you standing?", "Are you wearing anything flammable?"]
        let choice = responses[Math.floor(Math.random()*responses.length)]
        interaction.reply(choice)
    }
}