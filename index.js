require('dotenv').config();
const { Client, Intents } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const TOKEN = process.env.TOKEN;
const targets = ['!weather', '!clima'];

const { Weather } = require('./commands/weather.js');

bot.login(TOKEN); 

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}`);
});

bot.on('messageCreate', async (msg) => {
  if (msg.author.bot) return;
  
  const foundWord = targets.find((target) => msg.content.includes(target));
  
  if (foundWord && ('!weather'||'!clima')){

    const [lang,city] = msg.content.replace(/\s+/, '\x01').split('\x01')
    
    if(lang == '!clima'){
      if(city == "info"){
        msg.channel.send(
          "Comando válido: \"!clima [cidade]\"\n[cidade] deve ser substituida por uma cidade válida sem acento"
        )
      }else{
        Weather(city, "pt_br").then(weather => {        
          if(weather.desc.descp=="unavailable"){
            msg.channel.send(
              "Cidade invalida\nDigite \"!clima info\" para mais informações"
            )
          }else{
            msg.channel.send(
              `${weather.desc.descp} em ${city} \nA temperatura é ${weather.desc.temp} mas a sensação é de ${weather.desc.feel}`
            )};
        })
      }
    }else if(lang == '!weather'){
      if(city == "info"){
        msg.channel.send(
          "Valid command: \"!weather [city]\"\n[city] must be a valid city"
        )
      }else{
        Weather(city, "en").then(weather => {        
          if(weather.desc.descp=="unavailable"){
            msg.channel.send(
              "Invalid City\nType \"!weather info\" for more information"
            )
          }else{
            msg.channel.send(
              `${weather.desc.descp} in ${city} \nThe temperature is ${weather.desc.temp} but feels like ${weather.desc.feel}`
            )};
        })
      }
    }
  }
});