const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  
  try {
    await fetch('https://matera.app.n8n.cloud/webhook-test/discord-matera', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: message.content,
        author_id: message.author.id,
        author_username: message.author.username,
        channel_id: message.channelId,
        message_id: message.id,
        is_thread: message.channel.isThread()
      })
    });
  } catch (err) {
    console.error('Erreur webhook:', err);
  }
});

client.login(process.env.DISCORD_TOKEN);
