
// Fonction appelée lors du click du bouton
function start(object = "") {
  // Création de l'objet apiWeather
  const apiWeather = new API_WEATHER(object);
  // Appel de la fonction fetchTodayForecast

  apiWeather.fetchTodayForecast().then(function(response) {
      // Récupère la donnée d'une API
      const data = response.data;

      // On récupère l'information principal
      const main = data.weather[0].main;
      const description = data.weather[0].description;
      const temp = data.main.temp;
      const icon = apiWeather.getHTMLElementFromIcon(data.weather[0].icon);
      const city = data.name; 
      // Modifier le DOM
      document.getElementById('today-forecast-main').innerHTML = main;
      document.getElementById('today-forecast-more-info').innerHTML = description;
      document.getElementById('icon-weather-container').innerHTML = icon;
      document.getElementById('today-forecast-temp').innerHTML = `${temp}°C`;
      document.getElementById('cityDisplay').innerHTML = `Maintenant --> ${city}`;
    })
    .catch(function(error) {
      // Affiche une erreur
      console.error(error);
    });

    apiWeather.getThreeDayForecast().then(function (response) {

            let data = response.data;

            for (let i = 1; i <= 3; i++) {
                data.list[i - 1]['Index'] = i - 1;
                const main = data.list[i - 1].weather[0].main;
                const description = data.list[i - 1].weather[0].description;
                const temp = data.list[i - 1].temp.day;

                document.getElementById(`today-forecast-main-d${i}`).innerHTML = main;
                document.getElementById(`today-forecast-more-info-d${i}`).innerHTML = description;
                document.getElementById(`icon-weather-${i}`).className = getAnimation(main);
                document.getElementById(`today-forecast-temp-d${i}`).innerHTML = `${temp}°C`;
            }
            console.log(data);
            // Filtrer
            let array = data.list;
            const Cloud = array.filter(cloudy);
            console.log(Cloud);
            for (let i = 0; i < toCloudify.length; i++)
                document.getElementById(`today-forecast-main-d${Cloud[i].Index + 1}`).style.color = "grey";
            const Sun = array.filter(sunny);
            for (let i = 0; i < Sun.length; i++)
                document.getElementById(`today-forecast-main-d${Sun[i].Index + 1}`).style.color = "yellow";
            const Rain = array.filter(rainy);
            for (let i = 0; i < Rain.length; i++)
                document.getElementById(`today-forecast-main-d${Rain[i].Index + 1}`).style.color = "blue";
            //Map
            /*let array = data.list;
            const mapArrayCloud = array.map(cloudy);
            const mapArraySun = array.map(sunny);
            const mapArrayRain = array.map(rainy);
            console.log(mapArrayCloud);
            *///Sort 
            /*const months = ['Jan', 'Feb', 'March', 'April', 'May','June','July','August','Sep','October','Nov','Dec'];
            months.sort();
            console.log(months);
            const arrayMonths = [20, 20, 30, 30,40,40,50,50,60,60,70,70];
            arrayMonths.sort();
            console.log(arrayMonths);
*/
        });


    return apiWeather;
}

function  CityChoice() {

  let city = "";
  if (document.getElementById('city-input').value !== null)
      city = document.getElementById('city-input').value;

  return start(city);
}

function sunny(array) {
  return array.weather[0].main === "Clear";
}

function rainy(array) {
  return array.weather[0].main === "Rain";
}

function cloudy(array) {
  return array.weather[0].main === "Clouds";
}

function getAnimation(desc) {
    switch (desc) {
        case "Drizzle":
        case "Rain":
            return "rainy";
        case "Thunderstorm":
            return "stormy";
        case "Snow":
            return "snowy";
        case "Clear":
            return "sunny";
        case "Clouds" :
            return "cloudy";
        default:
            break;
    }
}

