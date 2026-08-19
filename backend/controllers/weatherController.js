const weatherService = require('../services/weatherService')

const getWeatherByCity = async (req, res) => {
  const { city } = req.query

  if (!city || !city.trim()) {
    return res.status(400).json({ message: 'City name is required.' })
  }

  try {
    const weatherData = await weatherService.getWeatherByCity(city)
    return res.json(weatherData)
  } catch (error) {
    const statusCode = error.statusCode || 500
    return res.status(statusCode).json({ message: error.message })
  }
}

const getWeatherByCoordinates = async (req, res) => {
  const { lat, lon } = req.query

  if (!lat || !lon) {
    return res.status(400).json({ message: 'Latitude and longitude are required.' })
  }

  const parsedLat = Number(lat)
  const parsedLon = Number(lon)

  if (Number.isNaN(parsedLat) || Number.isNaN(parsedLon)) {
    return res.status(400).json({ message: 'Latitude and longitude must be valid numbers.' })
  }

  try {
    const weatherData = await weatherService.getWeatherByCoordinates(parsedLat, parsedLon)
    return res.json(weatherData)
  } catch (error) {
    const statusCode = error.statusCode || 500
    return res.status(statusCode).json({ message: error.message })
  }
}

module.exports = {
  getWeatherByCity,
  getWeatherByCoordinates,
}
