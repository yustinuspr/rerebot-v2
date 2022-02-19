require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { Client, Intents } = require('discord.js');

const { coinFlip } = require('./commands');

const { APPLICATION_ID, CLIENT_TOKEN, GUILD_ID } = process.env;

const commands = [
  {
    name: 'rereping',
    description: 'Replies with RerePong!',
  },
  {
    name: 'coinflip',
    description: 'Flip a coin',
  },
];

const rest = new REST({ version: '10' }).setToken(CLIENT_TOKEN);

(async () => {try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(
    Routes.applicationGuildCommands(APPLICATION_ID, GUILD_ID),
    { body: commands },
  ).then(() => {
    console.log('Successfully reloaded application (/) commands.');
  });
} catch (error) {
  console.error(error);
}})();

const client = new Client({intents: [Intents.FLAGS.GUILDS]});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  switch(interaction.commandName) {
    case 'rereping':
      await interaction.reply('RerePong!');
      break;

    case 'coinflip':
      await interaction.reply(coinFlip());
      break;
  }
});

client.login('ODA0NzI1MzE0MzIzNzQyNzUx.YBQg2g.xcjRG6uiP-PvpocstBmNVoN1TuQ');