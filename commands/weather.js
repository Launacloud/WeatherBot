const axios = require('axios');

const wApiKey = process.env.WEATHER_API_KEY;

const weather = {
    Weather : async function(cityName, lang){
        try{
            //var req = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=${lang}&appid=${wApiKey}&units=metric`)
            var res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=${lang}&appid=${wApiKey}&units=metric`)
        
            const desc = {
                descp: res.data.weather[0].description,
                temp: res.data.main.temp,
                feel: res.data.main.feels_like
            }
        
            return {desc: desc}
        } catch( error ){
            //console.log('BAD QUERRY', error)
            const desc = {
                descp: "unavailable",
                temp: "unavailable",
                feel: "unavailable"
            }
            
            return {desc: desc}
        }
    }
}

module.exports = weather;