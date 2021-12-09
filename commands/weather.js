const axios = require('axios');

const wApiKey = process.env.WEATHER_API_KEY;

const weather = {
    Weather : async function(cityName, lang){
    
        try{
        var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=${lang}&appid=${wApiKey}&units=metric`;
        var req = axios.get(url);
        var res = await req;
    
        const desc = {
            descp: res.data.weather[0].description,
            temp: res.data.main.temp,
            feel: res.data.main.feels_like
        }
        return {desc: desc}
    } catch( error ){
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