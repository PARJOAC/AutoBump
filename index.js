const { Client } = require('discord.js-selfbot-v13');

const client = new Client({ checkUpdate: false });
require('dotenv').config();

const TOKEN = process.env.TOKEN;
const GUILD_ID = process.env.GUILD_ID;
const CHANNEL_ID = process.env.CHANNEL_ID;
const TARGET_BOT_ID = process.env.TARGET_BOT_ID;

const COMMAND_NAME = 'bump';

client.on('ready', async () => {
    console.log(`[✔] Sesión iniciada correctamente como: ${client.user.tag}`);

    const sendSlashCommand = async () => {
        try {
            console.log(`[${new Date().toLocaleString()}] Ejecutando comando /${COMMAND_NAME}...`);

            const guild = await client.guilds.fetch(GUILD_ID);
            const channel = await guild.channels.fetch(CHANNEL_ID);
            await channel.sendSlash(TARGET_BOT_ID, COMMAND_NAME);

            console.log(`[${new Date().toLocaleString()}] [✔] Comando /${COMMAND_NAME} enviado con éxito en el canal: ${channel.name}`);
        } catch (error) {
            console.error(`[${new Date().toLocaleString()}] [❌] Error al enviar el slash command:`, error.message);
        }
    };

    await sendSlashCommand();

    // Configurar repetición cada 2 horas y 1 minuto
    // (2 horas = 43200000ms) + (1 minuto = 60000ms) = 7260000ms
    const INTERVALO_TIEMPO = 7260000;

    setInterval(sendSlashCommand, INTERVALO_TIEMPO);
});

client.login(TOKEN);
