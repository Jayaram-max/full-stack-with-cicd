function SearchBar({ cityInput, onCityChange, onSubmit, onUseMyLocation, isLocationLoading }) {
  return (
    <form className="search-bar" onSubmit={onSubmit}>
      <input
        type="text"
        value={cityInput}
        onChange={(event) => onCityChange(event.target.value)}
        placeholder="Search city"
        aria-label="Search a city"
      />

      <button type="submit" className="primary-btn">
        Search
      </button>

      <button
        type="button"
        className="secondary-btn"
        onClick={onUseMyLocation}
        disabled={isLocationLoading}
      >
        {isLocationLoading ? 'Loading...' : 'Use My Location'}
      </button>
    </form>
  )
}

export default SearchBar
