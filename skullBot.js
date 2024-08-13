const axios = require('axios');
const { Telegraf } = require('telegraf');
require('dotenv').config({ path: '.env' }); // Load .env file correctly
const botapiToken = process.env.TELEGRAM_BOT_API_TOKEN; // Access the environment variable

// Create a Telegram bot instance
const bot = new Telegraf(botapiToken);

// Handle '/start' command
bot.start((ctx) => ctx.reply('💀💀💀 Welcome to skull price bot 💀💀💀'));

// Handle '/price' command
bot.command('price', async (ctx) => {
  const url = "https://backend.unicorn.meme/market/price/factory%2Funicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty%2Fuskull";
  try {
    const response = await axios.get(url);
    const responseData = response.data;
    // Assuming responseData is a string
    let price = parseFloat(responseData); 
    ctx.reply(`💀 ${price.toFixed(4)}`);
  } catch (err) {
    console.error(err);
    ctx.reply('Failed to retrieve price data.');
  }
});

// Launch the Telegram bot
bot.launch();
