// API : https://openweathermap.org/api

// Clé api
const API_KEY = "4081444b7b90198136fefe6ed4ccf35b";
// Url API
const API_URL = "https://api.openweathermap.org/data/2.5/weather";
// Base source icon
const API_URL_ICON = "http://openweathermap.org/img/wn/";
const API_URL_FORECAST = "https://api.openweathermap.org/data/2.5/forecast/daily";

class API_WEATHER{
  constructor(city){
    // Si la ville n'est pas définit alors la ville par défault est Paris
    if(city === ""){
      city = "Paris";
    }
    this.city = city;
  }

  // Faire la requete à l'API openweathermap
  // Retourne une promise
  fetchTodayForecast(){
    console.log(JSON.stringify(`${API_URL}?q=${this.city}&units=metric&appid=${API_KEY}`));
    return axios
    .get(`${API_URL}?q=${this.city}&units=metric&appid=${API_KEY}`, {
      crossdomain: true
    })
  }
  
  getThreeDayForecast() {

    console.log(JSON.stringify(`${API_URL_FORECAST}?q=${this.city}&units=metric&cnt=3&appid=${API_KEY}`));

    return axios
        .get(`${API_URL_FORECAST}?q=${this.city}&units=metric&cnt=3&appid=${API_KEY}`, {

            crossdomain: true
        });
}
  
  // Retourne l'element de l'icon qui symbolise la méteo
  getHTMLElementFromIcon(icon){
    return `<img src=${API_URL_ICON}${icon}@2x.png class="weather-icon"/>`
  }
}