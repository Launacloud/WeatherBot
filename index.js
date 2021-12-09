require('dotenv').config();
const { Client, Intents } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const TOKEN = process.env.TOKEN;
const targets = ['sad', 'angry', 'unhappy', 'miserable', 'down', '!weather', '!clima'];

const { RandomQuote } = require('./commands/quote.js');
const { Weather } = require('./commands/weather.js');

bot.login(TOKEN); 

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}`);
});

bot.on('messageCreate', async (msg) => {
  if (msg.author.bot) return;
  
  const foundWord = targets.find((target) => msg.content.includes(target));
  
  if (foundWord == '!weather'||'!clima'){
    const [lang,city] = msg.content.replace(/\s+/, '\x01').split('\x01')
    if(lang == '!clima'){
      Weather(city, "pt_br").then(weather => {        
        if(weather.desc.descp=="unavailable"){
          msg.channel.send(
            "Cidade invalida"
          )
        }else{
          msg.channel.send(
            `${weather.desc.descp} em ${city} \nA temperatura é ${weather.desc.temp} mas a sensação é de ${weather.desc.feel}`
          )};
      })
  }else{
    Weather(city, "en").then(weather => {        
      if(weather.desc.descp=="unavailable"){
        msg.channel.send(
          "Invalid City"
        )
      }else{
        msg.channel.send(
          `${weather.desc.descp} in ${city} \nThe temperature is ${weather.desc.temp} but feels like ${weather.desc.feel}`
        )};
    })
  }}else {
    RandomQuote().then(quote=>{
        msg.channel.send(
        `Don't be ${foundWord}\n${quote.author} once said:\n${quote.text}`
        );
      })
    }
});