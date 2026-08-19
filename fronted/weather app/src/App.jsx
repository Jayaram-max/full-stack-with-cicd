import { useEffect, useMemo, useState } from 'react'
import './App.css'
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/Forecast'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import WeatherDetails from './components/WeatherDetails'
import { getWeatherByCity, getWeatherByLocation } from './services/weatherService'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [cityInput, setCityInput] = useState('New York')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [locationLoading, setLocationLoading] = useState(false)

  const pageTheme = useMemo(
    () => ({
      className: darkMode ? 'theme-dark' : 'theme-light',
    }),
    [darkMode],
  )

  const loadWeather = async (city) => {
    setLoading(true)
    setError('')

    try {
      const data = await getWeatherByCity(city)
      setWeather(data)
      setCityInput(data.city)
    } catch (loadError) {
      setError(loadError.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!cityInput.trim()) {
      setError('Please enter a city name.')
      return
    }

    await loadWeather(cityInput)
  }

  const handleUseMyLocation = async () => {
    setLocationLoading(true)
    setError('')

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.')
      setLocationLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const data = await getWeatherByLocation(
            position.coords.latitude,
            position.coords.longitude,
          )
          setWeather(data)
          setCityInput(data.city)
        } catch (locationError) {
          setError(locationError.message)
        } finally {
          setLocationLoading(false)
        }
      },
      () => {
        setError('Unable to get your current location.')
        setLocationLoading(false)
      },
    )
  }

  useEffect(() => {
    loadWeather('New York')
  }, [])

  return (
    <div className={`app-shell ${pageTheme.className}`}>
      <div className="app-container">
        <Navbar
          darkMode={darkMode}
          onToggleTheme={() => setDarkMode((value) => !value)}
        />

        <SearchBar
          cityInput={cityInput}
          onCityChange={setCityInput}
          onSubmit={handleSubmit}
          onUseMyLocation={handleUseMyLocation}
          isLocationLoading={locationLoading}
        />

        {error && <div className="status-message error">{error}</div>}

        {loading && !weather && (
          <div className="status-message loading">Loading weather data...</div>
        )}

        {weather && (
          <>
            <CurrentWeather weather={weather} />
            <WeatherDetails weather={weather} />
            <Forecast forecast={weather.forecast} />
          </>
        )}
      </div>
    </div>
  )
}

export default App
