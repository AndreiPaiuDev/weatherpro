🌦️ WeatherPro — Modern Weather Dashboard
WeatherPro is a sleek, responsive, and theme‑adaptive weather dashboard built with React.js and JavaScript. It provides real‑time weather data, hourly and daily forecasts, cloud‑cover visualization, and a customizable interface that automatically adapts to the user’s system theme.

This project focuses on clean UI, modular components, and a smooth user experience powered by modern frontend practices.

<p align="center"> 
    <img src="./public/01.png" width="30%" /> 
    <img src="./public/02.png" width="30%" /> 
    <img src="./public/03.png" width="30%" /> 
</p>

✨ Features
🌤️ Real‑Time Weather Data
Current temperature, conditions, humidity, wind speed, UV index

Hourly forecast with dynamic icons

5‑day forecast with detailed summaries

🗺️ Interactive Cloud Cover Map
Cloud‑cover animation for the next 5 hours

Region‑aware map centered on the selected location

🎨 Theme & Unit Customization
Light Glass, Dark Glass, or System theme

Temperature units: Celsius / Fahrenheit

Wind speed units: km/h, mph, m/s

🔍 Smart Search
Search by city, airport code, or coordinates

“Use Current Location” support

Search history with quick access and “Clear All”

🧩 Modular Architecture
Component‑based structure

CSS Modules for scoped styling

Reusable hooks for data fetching and formatting

🛠️ Tech Stack
Category	Technologies
Frontend	React.js, JavaScript, Vite
Styling	CSS Modules, custom themes
APIs	Weather & geolocation APIs
Build Tools	Vite, ESLint

📁 Project Structure
<pre>
Code
src/
 ├── assets/
 ├── components/
 │    ├── DailyForecast/
 │    ├── HourlyForecast/
 │    ├── SearchBar/
 │    ├── SettingsModal/
 │    ├── Sidebar/
 │    ├── StatCards/
 │    ├── WeatherHero/
 │    └── WeatherMap/
 ├── hooks/
 ├── styles/
 ├── utils/
 ├── App.jsx
 ├── App.module.css
 ├── main.jsx
 └── index.css
 
 </pre>

Each component folder contains:
Component.jsx
Component.module.css
index.js

🚀 Getting Started
1. Clone the repository
<pre>
bash
git clone https://github.com/your-username/weatherpro.git
cd weatherpro
</pre>
2. Install dependencies
<pre>
bash
npm install
</pre>
3. Start the development server
<pre>
bash
npm run dev
</pre>
4. Build for production
<pre>
bash
npm run build
</pre>