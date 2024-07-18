const { Telegraf } = require("telegraf")
const bot = new Telegraf(process.env.TELEGRAM_BOT_API_TOKEN);

bot.start(ctx => {
  console.log("Received /start command")
  try {
    return ctx.reply("Hi")
  } catch (e) {
    console.error("error in start action:", e)
    return ctx.reply("Error occured")
  }
})

// AWS event handler syntax (https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html)
exports.handler = async event => {
  try {
    await bot.handleUpdate(JSON.parse(event.body))
    return { statusCode: 200, body: "" }
  } catch (e) {
    console.error("error in handler:", e)
    return { statusCode: 400, body: "This endpoint is meant for bot and telegram communication" }
  }
}

//const axios = require('axios');
//const { Telegraf } = require('telegraf');
//require('dotenv').config({ path: '.env' }); // Load .env file correctly
//
//const botapiToken = process.env.TELEGRAM_BOT_API_TOKEN; // Access the environment variable
//const bot = new Telegraf(botapiToken);
//
//bot.start((ctx) => ctx.reply('💀💀💀 Welcome to skull price bot 💀💀'));
//
//bot.command('price', async (ctx) => {
//  const url = "https://backend.unicorn.meme/market/price/factory%2Funicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty%2Fuskull?frame=1h";
//  try {
//    const response = await axios.get(url);
//    const responseData = response.data;
//    let price = parseFloat(responseData); 
//    ctx.reply(`💀 ${price.toFixed(4)}`);
//  } catch (err) {
//    console.error(err);
//    ctx.reply('Failed to retrieve price data.');
//  }
//});
//
//// AWS event handler syntax (https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html)
//exports.handler = async event => {
//  try {
//    await bot.handleUpdate(JSON.parse(event.body))
//    return { statusCode: 200, body: "" }
//  } catch (e) {
//    console.error("error in handler:", e)
//    return { statusCode: 400, body: "This endpoint is meant for bot and telegram communication" }
//  }
//}