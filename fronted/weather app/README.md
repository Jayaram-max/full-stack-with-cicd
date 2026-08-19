# Weather App Frontend

A clean and responsive weather dashboard built with React + Vite.

## Features

- Search weather by city name
- Use current location
- Show current temperature
- Show weather condition and icon
- Show feels-like temperature
- Show humidity and wind speed
- Show high and low temperature
- Show a 5-day forecast
- Dark/light mode
- Loading and error states
- Mobile responsive layout

## Tech Stack

- React
- Vite
- CSS

## Project Structure

```bash
weather app/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── services/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── README.md
├── vite.config.js
└── .gitignore
```

## Installation

1. Open the project folder:

```bash
cd "fronted/weather app"
```

2. Install dependencies:

```bash
npm install
```

3. Start the app:

```bash
npm run dev
```

4. Open the local Vite URL shown in the terminal.

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
```

## Notes

- The frontend is designed to work with a Node.js backend.
- Weather data is fetched through the backend API instead of calling the weather service directly from the browser.
- The app uses a simple and beginner-friendly component structure.

## License

This project is for learning and personal use.
