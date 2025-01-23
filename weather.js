
const apiKey = "4914a1568672404348989b7a4fbe2a4e"; // Replace with your OpenWeatherMap API key

async function fetchWeather() {
  const city = document.getElementById("city-input").value.trim();
  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("City not found!");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    alert(error.message);
    document.getElementById("weather-result").style.display = "none";
  }
}

function displayWeather(data) {
  const { name, main, weather, timezone } = data;
  const weatherCondition = weather[0].main; // e.g., "Clear", "Clouds", "Rain", etc.
  const weatherImage = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  // Correctly calculate local time using timezone offset
  const localDateTime = getLocalDateTime(timezone);

  // Change the background image based on the weather condition
  updateBackground(weatherCondition);

  const weatherHTML = `
    <div class="weather-card">
      <h2>${name}</h2>
      <img src="${weatherImage}" alt="${weather[0].description}">
      <p><strong>Temperature:</strong> ${main.temp}°C</p>
      <p><strong>Condition:</strong> ${weather[0].description}</p>
      <p><strong>Humidity:</strong> ${main.humidity}%</p>
      <p><strong>Local Time:</strong> ${localDateTime}</p>
    </div>
  `;

  const weatherResult = document.getElementById("weather-result");
  weatherResult.innerHTML = weatherHTML;
  weatherResult.style.display = "block";
}

function updateBackground(weatherCondition) {
  // Define a mapping of weather conditions to image URLs
  const backgroundImages = {
    Clear: "url('img/weather bg.jpg')",
    Clouds: "url('img/thunder.gif')",
    Rain: "url('img/Rainy.gif')",
    Snow: "url('img/s.gif')",
    Thunderstorm: "url('img/lightning.gif')",
    Drizzle: "url('img/Rainy.gif')",
    Mist: "url('img/mist.gif')",
  };

  // Get the matching background image or a default image
  const backgroundImage = backgroundImages[weatherCondition] || "url('img/weather bg.jpg')";

  // Update the background style
  document.body.style.backgroundImage = backgroundImage;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";
  if (backgroundImage === "url('img/thunder.gif')") {
     document.body.style.color = "white"; } 
     else { document.body.style.color = "black"; } 
}



function getLocalDateTime(timezone) {
  // Get the current time in UTC
  const now = new Date();
  const utcTime = now.getTime() + now.getTimezoneOffset() * 60000; 

  // Calculate the local time using the timezone offset
  const localTime = new Date(utcTime + timezone * 1000);

  // Format the local time
  return localTime.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
