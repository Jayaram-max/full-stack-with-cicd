function WeatherDetails({ weather }) {
  const details = [
    { label: 'Feels like', value: `${weather.current.feelsLike}°C` },
    { label: 'Humidity', value: `${weather.current.humidity}%` },
    { label: 'Wind', value: `${weather.current.windSpeed} km/h` },
    { label: 'Condition', value: weather.current.condition },
  ]

  return (
    <section className="weather-details card">
      <h2>Weather details</h2>
      <div className="weather-details__grid">
        {details.map((detail) => (
          <div key={detail.label} className="detail-item">
            <span>{detail.label}</span>
            <strong>{detail.value}</strong>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WeatherDetails
