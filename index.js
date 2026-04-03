const { Client } = require('discord.js-selfbot-v13');

const client = new Client({
    checkUpdate: false, // Desactiva las alertas de actualización
});
require('dotenv').config();

// ================= CONFIGURACIÓN =================
const TOKEN = process.env.TOKEN;
const GUILD_ID = process.env.GUILD_ID;
const CHANNEL_ID = process.env.CHANNEL_ID;
const TARGET_BOT_ID = process.env.TARGET_BOT_ID;

// Nombre del comando (en tu caso 'bump')
const COMMAND_NAME = 'bump';
// =================================================

client.on('ready', async () => {
    console.log(`[✔] Sesión iniciada correctamente como: ${client.user.tag}`);
    console.log(`[⏳] Configurando el automatizador de /${COMMAND_NAME} cada 12 horas...`);

    const sendSlashCommand = async () => {
        try {
            console.log(`[${new Date().toLocaleString()}] Ejecutando comando /${COMMAND_NAME}...`);

            // Obtener el objeto del servidor y luego el canal
            const guild = await client.guilds.fetch(GUILD_ID);
            const channel = await guild.channels.fetch(CHANNEL_ID);

            // sendSlash busca automáticamente el ID del comando entre los disponibles
            // y ejecuta el slash command. Requiere el ID del bot y el nombre del comando.
            await channel.sendSlash(TARGET_BOT_ID, COMMAND_NAME);

            console.log(`[${new Date().toLocaleString()}] [✔] Comando /${COMMAND_NAME} enviado con éxito en el canal: ${channel.name}`);
        } catch (error) {
            console.error(`[${new Date().toLocaleString()}] [❌] Error al enviar el slash command:`, error.message);
        }
    };

    // Ejecutar el primer comando al iniciar el script
    await sendSlashCommand();

    // Configurar repetición cada 12 horas y 1 minuto
    // (12 horas = 43200000ms) + (1 minuto = 60000ms) = 43260000ms
    const INTERVALO_TIEMPO = 43260000;

    setInterval(sendSlashCommand, INTERVALO_TIEMPO);
});

// Iniciar sesión con el token proporcionado
client.login(TOKEN);
