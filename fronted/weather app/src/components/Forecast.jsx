function WeatherCard({ item }) {
  return (
    <div className="forecast-card">
      <p className="forecast-card__day">{item.day}</p>
      <div className="forecast-card__icon" aria-label={item.condition}>
        {item.icon}
      </div>
      <p className="forecast-card__condition">{item.condition}</p>
      <div className="forecast-card__temps">
        <span>{item.tempHigh}°</span>
        <span>{item.tempLow}°</span>
      </div>
    </div>
  )
}

function Forecast({ forecast }) {
  return (
    <section className="forecast card">
      <h2>5-day forecast</h2>
      <div className="forecast-grid">
        {forecast.map((day) => (
          <WeatherCard key={day.day} item={day} />
        ))}
      </div>
    </section>
  )
}

export default Forecast
