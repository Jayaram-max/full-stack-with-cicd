function CurrentWeather({ weather }) {
  return (
    <section className="current-weather card">
      <div className="current-weather__top">
        <div>
          <p className="eyebrow">Current weather</p>
          <h1>{weather.city}</h1>
          <p className="location-name">{weather.country}</p>
        </div>

        <div className="current-weather__icon" aria-label={weather.current.condition}>
          {weather.current.icon}
        </div>
      </div>

      <div className="current-weather__temp-row">
        <div className="temp-block">
          <span className="temperature">{weather.current.temperature}°</span>
          <span className="condition">{weather.current.condition}</span>
        </div>

        <div className="temp-range">
          <span>H {weather.current.high}°</span>
          <span>L {weather.current.low}°</span>
        </div>
      </div>

      <p className="description">{weather.current.description}</p>
    </section>
  )
}

export default CurrentWeather
