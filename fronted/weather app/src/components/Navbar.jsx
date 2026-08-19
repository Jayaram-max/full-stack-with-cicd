function Navbar({ darkMode, onToggleTheme }) {
  return (
    <header className="navbar">
      <div className="navbar__brand">
        <span className="navbar__logo">☁️</span>
        <span>SkyCast</span>
      </div>

      <button
        type="button"
        className="theme-toggle"
        onClick={onToggleTheme}
        aria-label="Toggle color theme"
      >
        {darkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
    </header>
  )
}

export default Navbar
