const { Client, GatewayIntentBits  } = require('discord.js');
const fs = require('fs');
const rawdata = fs.readFileSync('config.json');
const config = JSON.parse(rawdata);

// Function to read the flirty lines from the JSON file
function readFlirtyLines() {
    try {
        const data = fs.readFileSync('flirty-lines.json');
        const flirtyLinesData = JSON.parse(data);
        return flirtyLinesData.lines;
    } catch (error) {
        console.error('Error reading flirty lines:', error);
        return [];
    }
}

const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
] });

let flirtyLines = [];

// Event listener for when the bot is ready
client.once('ready', () => {
    console.log('Bot is ready!');
    flirtyLines = readFlirtyLines(); // Read the flirty lines from the JSON file when the bot starts up
});

client.once('ready', async () => {
    try {
        await client.application.commands.set([
            {
                name: 'flirt',
                description: 'Flirt with someone using a random flirty line.'
            }
        ]);
        console.log('Slash command registered successfully!');
    } catch (error) {
        console.error('Error registering slash command:', error);
    }
});

// Event listener for when the bot receives a slash command
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand() || interaction.commandName !== 'flirt') return;

    const flirtMessage = flirtyLines[Math.floor(Math.random() * flirtyLines.length)];
    await interaction.reply(flirtMessage);
});


client.login(config.token);