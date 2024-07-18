const axios = require('axios');
const { telegraf } = require('telegraf');
require('dotenv').config({ path: '.env' });

const botapiToken = process.env.TELEGRAM_BOT_API_TOKEN;

const bot = new telegraf(botapiToken);

bot.start((ctx) => ctx.reply('Welcome to skull 💀 price bot'));

bot.command('price', async (ctx) => {
  const url = "https://backend.unicorn.meme/market/price/factory%2Funicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty%2Fuskull?frame=1h";
  try {
    const response = await axios.get(url);
    const responseData = response.data;
    let price = parseFloat(responseData); 
    ctx.reply(`💀 ${price.toFixed(4)}`);
  } catch (err) {
    console.error(err);
    ctx.reply('Failed to retrieve price data.');
  }
});

bot.launch();

module.exports = async (event, context) => {
  const { message } = JSON.parse(event.body);

  await bot.handleUpdate(message.update_id, message.message); // Handle incoming messages

  return {
    statusCode: 200,
    body: JSON.stringify({
      result: 'Message processed successfully',
    }),
  };
};