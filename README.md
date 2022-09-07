# discordBot-JimmerJosephSmith
a discord bot I made for the purposes of teaching myself how to code discord bots

Features password generator code written in JavaScript, alongside other various features.

## Getting Started
index.js is the main command-running file. to deploy this on a server, you will need to set up a discord bot account. Once you have done so and put it on a server with appropriate permissions, clone the repo. You will need to create a file called config.json in the root folder of the cloned repo, following the convention listed below. After you npm install the repo, you can then run the command 'node index.js' to run the bot.

### config.json format:
```json
{
  "token":"your Bot Token goes here",
  "clientId":"the id of the bot account goes here",
  "guildId":"the id of the server goes here",
  "admins":["server admin id 1", "server admin id 2"]
}
```
