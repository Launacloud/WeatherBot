const axios = require('axios');

const wApiKey = process.env.WEATHER_API_KEY;

const weather = {
    Weather : async function(cityName){
    
        var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${wApiKey}&units=metric`;
        var req = axios.get(url);
        var res = await req;
    
        const desc = {
            descp: res.data.weather[0].description,
            temp: res.data.main.temp,
            feel: res.data.main.feels_like
        }
    
        return {desc: desc}
    }
}

module.exports = weather;