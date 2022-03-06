require('dotenv').config();
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v10');
const {Client, Intents} = require('discord.js');
const {SlashCommandBuilder} = require('@discordjs/builders');

const { choose, coinFlip } = require('./commands');
const { getCurrentQuarter, getDaysToEndQuarter } = require('./quarterly');

const { APPLICATION_ID, CLIENT_TOKEN } = process.env;

const commands = [
  new SlashCommandBuilder().setName('rereping').setDescription('Replies with RerePong!'),
  new SlashCommandBuilder().setName('coinflip').setDescription('Flip a coin'),
  new SlashCommandBuilder()
    .setName('choose')
    .setDescription('Choose from one of the inputs')
    .addStringOption(option =>
      option.setName('options')
        .setDescription('Input the option separated by space')
        .setRequired(true)
    ),
];

const rest = new REST({version: '10'}).setToken(CLIENT_TOKEN);

const client = new Client({intents: [Intents.FLAGS.GUILDS]});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  switch (interaction.commandName) {
    case 'rereping':
      await interaction.reply('RerePong!');
      break;

    case 'coinflip':
      await interaction.reply(coinFlip());
      break;

    case 'choose':
      const [option] = interaction.options.data;
      const optionArray = option.value.toString().trim().split(' ') || [];
      const result = choose(optionArray);

      await interaction.reply(result);
      break;

    case 'quarterly':
      const { channelId } = interaction;
      const currentQuarter = getCurrentQuarter();
      await cron.schedule('0 10 * * *', async () => {
        const channel = await client.channels.fetch(channelId);
        await channel.send(`${getDaysToEndQuarter()} to end of Q${currentQuarter}`);
      }, {
        scheduled: true,
        timezone: "Asia/Jakarta"
      });
      await interaction.reply('Cron scheduled');
  }
});

client.on('guildCreate', async (guild) => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(APPLICATION_ID, guild.id),
      { body: commands },
    ).then(() => {
      console.log('Successfully reloaded application (/) commands.');
    });
  } catch (error) {
    console.error(error);
  }
});

client.login(CLIENT_TOKEN);
