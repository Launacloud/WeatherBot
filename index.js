require('dotenv').config();
const { Client, Intents } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const TOKEN = process.env.TOKEN;
const targets = ['!weather'];

const { Weather } = require('./commands/weather.js');

bot.login(TOKEN); 

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}`);
});

bot.on('messageCreate', async (msg) => {
  if (msg.author.bot) return;
  
  const foundWord = targets.find((target) => msg.content.includes(target));
  
  if (foundWord == '!weather'){
    const [,city] = msg.content.replace(/\s+/, '\x01').split('\x01')
    Weather(city).then(weather => {        
      msg.channel.send(
      `Now it is ${weather.desc.descp} in ${city} \nThe temperature is ${weather.desc.temp} but feels like ${weather.desc.feel}`
      );})
  }
});