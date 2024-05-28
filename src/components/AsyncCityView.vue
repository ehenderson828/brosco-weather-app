<template>
    <div class="flex flex-row flex-1 justify-center items-center h-screen gap-x-40">
      <!-- Weather Overview -->
      <div class="flex flex-col items-center text-white py-12">
        <!-- Will need to be set manually -->
        <h1 class="text-4xl mb-2">Portland</h1>
        <p class="text-sm mb-12">
          {{
            new Date(weatherData.currentTime).toLocaleDateString(
              "en-us",
              {
                weekday: "short",
                day: "2-digit",
                month: "long",
              }
            )
          }}
          {{
            new Date(weatherData.currentTime).toLocaleTimeString(
              "en-us",
              {
                timeStyle: "short",
              }
            )
          }}
        </p>
        <p class="text-8xl mb-8">
          {{ Math.round(weatherData.current.temp) }}&deg;
        </p>
        <p>
          Feels like
          {{ Math.round(weatherData.current.feels_like) }} &deg;
        </p>
        <p class="capitalize">
          {{ weatherData.current.weather[0].description }}
        </p>
        <img
          class="w-[150px] h-auto"
          :src="
            `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`
          "
          alt=""
        />
      </div>

      <div class="w-px h-96 bg-white mx-5"></div> <!-- Vertical rule -->
  
      <!-- Weekly Weather -->
      <div class="max-w-screen-md w-full py-12">
        <div class="mx-8 text-white">
          <div class="flex justify-center mb-8">
            <h1 class="text-4xl">7 Day Forecast</h1>
          </div>
          <div
            v-for="day in weatherData.daily"
            :key="day.dt"
            class="flex items-center"
          >
            <p class="flex-1">
              {{
                new Date(day.dt * 1000).toLocaleDateString(
                  "en-us",
                  {
                    weekday: "long",
                  }
                )
              }}
            </p>
            <img
              class="w-[50px] h-[50px] object-cover"
              :src="
                `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
              "
              alt="current weather"
            />
            <div class="flex gap-2 flex-1 justify-end">
              <p>H: {{ Math.round(day.temp.max) }}</p>
              <p>L: {{ Math.round(day.temp.min) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import axios from "axios";
  
  const getWeatherData = async () => {
    try {
      const weatherData = await axios.get(
        // Portland, ME coordinates punched will need to be swapped
        `https://api.openweathermap.org/data/2.5/onecall?lat=43.6615&lon=-70.2553&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
      );
  
      // cal current date & time
      const localOffset = new Date().getTimezoneOffset() * 60000;
      const utc = weatherData.data.current.dt * 1000 + localOffset;
      weatherData.data.currentTime =
        utc + 1000 * weatherData.data.timezone_offset;
  
      // cal hourly weather offset
      weatherData.data.hourly.forEach((hour) => {
        const utc = hour.dt * 1000 + localOffset;
        hour.currentTime =
          utc + 1000 * weatherData.data.timezone_offset;
      });
  
      return weatherData.data;
    } catch (err) {
      console.log(err);
    }
  };
  const weatherData = await getWeatherData();
  
  const removeCity = () => {
    const cities = JSON.parse(localStorage.getItem("savedCities"));
    const updatedCities = cities.filter(
      (city) => city.id !== route.query.id
    );
    localStorage.setItem(
      "savedCities",
      JSON.stringify(updatedCities)
    );
    router.push({
      name: "home",
    });
  };
  </script>
  