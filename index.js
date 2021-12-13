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

    const [lang, citiesList] = msg.content.replace(/\s+/, '\x01').split('\x01')
    const cities = citiesList.split(', ')
    for ( const index in cities){
      if(lang == '!clima'){
        if(cities[index] == "info"){
          msg.channel.send(
            "Comando válido: \"!clima [cidade]\"\n[cidade] deve ser substituida por uma cidade válida sem acento\n"
          )
        }else{
          Weather(cities[index], "pt_br").then(weather => {        
            if(weather.desc.descp=="unavailable"){
              msg.channel.send(
                "Cidade invalida\nDigite \"!clima info\" para mais informações\n"
              )
            }else{
              msg.channel.send(
                `${weather.desc.descp} em ${cities[index]} \nA temperatura é ${weather.desc.temp} mas a sensação é de ${weather.desc.feel}\n`
              )};
          })
        }
      }else if(lang == '!weather'){
        if(cities[index] == "info"){
          msg.channel.send(
            "Valid command: \"!weather [city]\"\n[city] must be a valid city\n"
          )
        }else{
          Weather(cities[index], "en").then(weather => {        
            if(weather.desc.descp=="unavailable"){
              msg.channel.send(
                "Invalid City\nType \"!weather info\" for more information\n"
              )
            }else{
              msg.channel.send(
                `${weather.desc.descp} in ${cities[index]} \nThe temperature is ${weather.desc.temp} but feels like ${weather.desc.feel}\n`
              )};
          })
        }
      }
    }
  }
});