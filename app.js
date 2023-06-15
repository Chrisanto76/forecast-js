const loader = document.querySelector(".loader-container");
const errorInformation = document.querySelector(".error-information");

async function getWeatherData(){
  try {
    const response = await fetch(
      "http://api.airvisual.com/v2/nearest_city?key=db5d9e1c-51c7-410b-be99-f5f0bc0d720c"
    )

    if(!response.ok) {
      throw new Error(`Error ${response.status}, ${response.statusText}`)
    }

    const responseData = await response.json();
    
    const sortedData = {
      city: responseData.data.city,
      country: responseData.data.country,
      iconId: responseData.data.current.weather.ic,
      temperature: responseData.data.current.weather.tp,
    }

    populateUI(sortedData)
  }
  catch (error) {
    loader.classList.remove("active");
    errorInformation.textContent = error.message;
  }
}
getWeatherData()


const temperature = document.querySelector(".temperature");
const infoIcon = document.querySelector(".info-icon");

function populateUI(data){
  temperature.textContent = `${data.temperature}°`;
  infoIcon.src = `ressources/icons/${data.iconId}.svg`;
  infoIcon.style.width = "110px";
  loader.classList.remove("active");
}