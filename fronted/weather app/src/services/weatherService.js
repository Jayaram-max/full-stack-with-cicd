const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://backend-wgz7.onrender.com'

const iconMap = {
  '01d': '☀️',
  '01n': '🌙',
  '02d': '⛅',
  '02n': '☁️',
  '03d': '☁️',
  '03n': '☁️',
  '04d': '☁️',
  '04n': '☁️',
  '09d': '🌧️',
  '09n': '🌧️',
  '10d': '🌦️',
  '10n': '🌧️',
  '11d': '⛈️',
  '11n': '⛈️',
  '13d': '❄️',
  '13n': '❄️',
  '50d': '🌫️',
  '50n': '🌫️',
}

const getWeatherIcon = (code) => iconMap[code] || '☀️'

const buildForecast = (condition, temperature) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

  return days.map((day, index) => {
    const high = temperature + (index % 2 === 0 ? 2 : 3)
    const low = Math.max(temperature - 5, 10)

    return {
      day,
      icon: condition.includes('Rain') ? '🌧️' : condition.includes('Cloud') ? '⛅' : '☀️',
      condition: condition || 'Clear',
      tempHigh: high,
      tempLow: low,
    }
  })
}

const normalizeWeatherData = (data) => ({
  city: data.city,
  country: data.country,
  current: {
    temperature: data.temperature,
    feelsLike: data.feelsLike,
    humidity: data.humidity,
    windSpeed: data.windSpeed,
    condition: data.condition,
    icon: getWeatherIcon(data.weatherIcon),
    high: data.high,
    low: data.low,
    description: `${data.condition} in ${data.city}.`,
  },
  forecast: buildForecast(data.condition, data.temperature),
})

const request = async (url, errorMessage) => {
  const response = await fetch(url)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || errorMessage)
  }

  return response.json()
}

export const getWeatherByCity = async (city) => {
  const data = await request(
    `${API_BASE_URL}/api/weather?city=${encodeURIComponent(city)}`,
    'Unable to fetch weather data for that city.',
  )

  return normalizeWeatherData(data)
}

export const getWeatherByLocation = async (lat, lon) => {
  if (typeof lat !== 'number' || typeof lon !== 'number') {
    throw new Error('Location coordinates are invalid.')
  }

  const data = await request(
    `${API_BASE_URL}/api/weather/coordinates?lat=${lat}&lon=${lon}`,
    'Unable to fetch weather data for your location.',
  )

  return normalizeWeatherData(data)
}
