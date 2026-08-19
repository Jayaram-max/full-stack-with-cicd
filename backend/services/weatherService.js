const axios = require('axios')

const OPEN_WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather'

const mapWeatherResponse = (data) => ({
  city: data.name,
  country: data.sys?.country || 'Unknown',
  temperature: Math.round(data.main.temp),
  feelsLike: Math.round(data.main.feels_like),
  condition: data.weather?.[0]?.main || 'Clear',
  humidity: data.main?.humidity ?? 0,
  windSpeed: data.wind?.speed ?? 0,
  high: Math.round(data.main.temp_max),
  low: Math.round(data.main.temp_min),
  weatherIcon: data.weather?.[0]?.icon || '01d',
})

const getWeatherByCity = async (city) => {
  const apiKey = process.env.WEATHER_API_KEY

  if (!apiKey || apiKey === 'your_api_key') {
    throw {
      statusCode: 500,
      message: 'Weather API key is missing. Add WEATHER_API_KEY in the .env file.',
    }
  }

  try {
    const response = await axios.get(OPEN_WEATHER_API_URL, {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric',
      },
    })

    return mapWeatherResponse(response.data)
  } catch (error) {
    if (error.response?.status === 404) {
      throw {
        statusCode: 404,
        message: 'City not found. Please enter a valid city name.',
      }
    }

    throw {
      statusCode: 500,
      message: 'Failed to fetch weather data from the weather provider.',
    }
  }
}

const getWeatherByCoordinates = async (lat, lon) => {
  const apiKey = process.env.WEATHER_API_KEY

  if (!apiKey || apiKey === 'your_api_key') {
    throw {
      statusCode: 500,
      message: 'Weather API key is missing. Add WEATHER_API_KEY in the .env file.',
    }
  }

  try {
    const response = await axios.get(OPEN_WEATHER_API_URL, {
      params: {
        lat,
        lon,
        appid: apiKey,
        units: 'metric',
      },
    })

    return mapWeatherResponse(response.data)
  } catch (error) {
    throw {
      statusCode: 500,
      message: 'Failed to fetch weather data by coordinates.',
    }
  }
}

module.exports = {
  getWeatherByCity,
  getWeatherByCoordinates,
}
