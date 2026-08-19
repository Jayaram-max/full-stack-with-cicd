const express = require('express')
const { getWeatherByCity, getWeatherByCoordinates } = require('../controllers/weatherController')

const router = express.Router()

router.get('/', getWeatherByCity)
router.get('/coordinates', getWeatherByCoordinates)

module.exports = router
