// ── WMO Weather Interpretation Codes ─────────────────────────────────────
export const WMO_CODES = {
  0:  { label: 'Clear Sky',     icon: '☀️' },
  1:  { label: 'Mainly Clear',  icon: '🌤️' },
  2:  { label: 'Partly Cloudy', icon: '⛅' },
  3:  { label: 'Overcast',      icon: '☁️' },
  45: { label: 'Foggy',         icon: '🌫️' },
  48: { label: 'Icy Fog',       icon: '🌫️' },
  51: { label: 'Light Drizzle', icon: '🌦️' },
  53: { label: 'Drizzle',       icon: '🌦️' },
  55: { label: 'Heavy Drizzle', icon: '🌧️' },
  61: { label: 'Light Rain',    icon: '🌧️' },
  63: { label: 'Rain',          icon: '🌧️' },
  65: { label: 'Heavy Rain',    icon: '🌧️' },
  71: { label: 'Light Snow',    icon: '🌨️' },
  73: { label: 'Snow',          icon: '❄️' },
  75: { label: 'Heavy Snow',    icon: '❄️' },
  80: { label: 'Rain Showers',  icon: '🌦️' },
  81: { label: 'Showers',       icon: '🌧️' },
  82: { label: 'Heavy Showers', icon: '⛈️' },
  95: { label: 'Thunderstorm',  icon: '⛈️' },
  99: { label: 'Heavy Thunder', icon: '⛈️' },
}

/** @param {number} code @returns {{ label: string, icon: string }} */
export const getWmo = (code) => WMO_CODES[code] ?? { label: 'Unknown', icon: '🌡️' }

// ── Date helpers ──────────────────────────────────────────────────────────
const DAYS   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

/** @param {string} isoDate e.g. "2025-06-12" */
export const formatDay = (isoDate) => {
  const d = new Date(isoDate + 'T12:00:00')
  return DAYS[d.getDay()]
}

/** @param {string} isoDate */
export const formatFullDate = (isoDate) => {
  const d = new Date(isoDate + 'T12:00:00')
  return `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

// ── Unit converters ───────────────────────────────────────────────────────
/** @param {number} c Celsius */
export const toFahrenheit = (c) => Math.round(c * 9 / 5 + 32)

/** @param {number} c @param {boolean} celsius */
export const displayTemp = (c, celsius) =>
  celsius ? Math.round(c) : toFahrenheit(c)

/** @param {number} kmh @param {'kmh'|'mph'|'ms'} unit */
export const displayWind = (kmh, unit) => {
  if (unit === 'mph') return `${Math.round(kmh * 0.621371)} mph`
  if (unit === 'ms')  return `${Math.round(kmh / 3.6)} m/s`
  return `${Math.round(kmh)} km/h`
}

// ── Mock city profiles (API fallback) ────────────────────────────────────
const MOCK_PROFILES = {
  london:     { cn: 'London',    co: 'United Kingdom', lat: 51.51, lon: -0.13,  t: 24, wc: 2,  w: 12, h: 65, uv: 2, p: 1012, v: 10000, d: 14, mx: [24,26,22,19,23,25], mn: [16,18,15,12,14,17], wcs: [2,0,3,61,2,0]       },
  'new york': { cn: 'New York',  co: 'United States',  lat: 40.71, lon: -74.01, t: 18, wc: 0,  w: 20, h: 55, uv: 4, p: 1018, v: 16000, d: 9,  mx: [18,20,17,15,19,21], mn: [10,11,8,7,10,12],  wcs: [0,1,2,3,0,1]       },
  tokyo:      { cn: 'Tokyo',     co: 'Japan',          lat: 35.68, lon: 139.65, t: 15, wc: 61, w: 25, h: 80, uv: 1, p: 1009, v: 8000,  d: 12, mx: [15,14,16,13,17,18], mn: [8,7,9,6,8,10],    wcs: [61,63,3,2,1,0]     },
  paris:      { cn: 'Paris',     co: 'France',         lat: 48.86, lon: 2.35,   t: 20, wc: 1,  w: 15, h: 60, uv: 3, p: 1015, v: 12000, d: 11, mx: [20,22,19,17,21,23], mn: [12,13,11,10,12,14], wcs: [1,0,2,1,0,1]     },
  sydney:     { cn: 'Sydney',    co: 'Australia',      lat: -33.87, lon: 151.21, t: 28, wc: 0,  w: 18, h: 50, uv: 6, p: 1020, v: 20000, d: 16, mx: [28,30,26,25,29,31], mn: [19,20,18,17,19,21], wcs: [0,0,1,2,0,0]     },
  dubai:      { cn: 'Dubai',     co: 'UAE',            lat: 25.20, lon: 55.27,  t: 38, wc: 0,  w: 10, h: 30, uv: 9, p: 1006, v: 15000, d: 18, mx: [38,39,37,40,38,36], mn: [28,29,27,30,28,26], wcs: [0,0,0,0,1,0]     },
  berlin:     { cn: 'Berlin',    co: 'Germany',        lat: 52.52, lon: 13.41,  t: 12, wc: 3,  w: 22, h: 75, uv: 1, p: 1008, v: 9000,  d: 8,  mx: [12,10,13,11,14,15], mn: [5,4,6,3,5,7],    wcs: [3,61,3,2,1,2]      },
  mumbai:     { cn: 'Mumbai',    co: 'India',          lat: 19.08, lon: 72.88,  t: 33, wc: 80, w: 30, h: 85, uv: 5, p: 1010, v: 5000,  d: 25, mx: [33,32,34,31,33,34], mn: [26,25,27,24,26,27], wcs: [80,82,63,80,81,63]},
  singapore:  { cn: 'Singapore', co: 'Singapore',      lat: 1.35,  lon: 103.82, t: 32, wc: 80, w: 15, h: 88, uv: 7, p: 1011, v: 6000,  d: 26, mx: [32,31,33,30,32,33], mn: [25,24,26,23,25,25], wcs: [80,63,80,82,80,63]},
  amsterdam:  { cn: 'Amsterdam', co: 'Netherlands',    lat: 52.37, lon: 4.90,   t: 13, wc: 3,  w: 28, h: 78, uv: 1, p: 1007, v: 8000,  d: 9,  mx: [13,11,14,12,15,13], mn: [6,5,7,4,6,5],    wcs: [3,61,3,2,3,1]      },
}

/** Build a realistic mock weather payload for a city key */
export function buildMockWeather(city) {
  const key = city.toLowerCase().replace(/,.*$/, '').trim()
  const p = MOCK_PROFILES[key]
  if (!p) return null

  const today = new Date()
  const times = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() + i)
    return d.toISOString().split('T')[0]
  })

  const hourlyTemps = Array.from({ length: 24 }, (_, h) =>
    Math.round(p.t - 5 + 8 * Math.sin((h - 6) * Math.PI / 12))
  )
  const hourlyWC = Array.from({ length: 24 }, (_, h) => (h < 6 ? 3 : p.wc))
  const hourlyCloud = Array.from({ length: 24 }, (_, h) =>
    Math.max(0, Math.min(100, Math.round(40 + 30 * Math.sin((h - 4) * Math.PI / 12) + (p.h - 50) * 0.5)))
  )

  return {
    cityName:  p.cn,
    country:   p.co,
    latitude:  p.lat,
    longitude: p.lon,
    current: {
      temperature_2m:      p.t,
      weathercode:         p.wc,
      windspeed_10m:       p.w,
      relativehumidity_2m: p.h,
      uv_index:            p.uv,
      surface_pressure:    p.p,
      visibility:          p.v,
      dewpoint_2m:         p.d,
    },
    daily: {
      time:                times,
      weathercode:         p.wcs,
      temperature_2m_max:  p.mx,
      temperature_2m_min:  p.mn,
      sunrise:             [`${times[0]}T06:42`],
      sunset:              [`${times[0]}T18:15`],
    },
    hourly: {
      time:            Array.from({ length: 24 }, (_, i) => `${times[0]}T${String(i).padStart(2, '0')}:00`),
      temperature_2m:  hourlyTemps,
      weathercode:     hourlyWC,
      cloud_cover:     hourlyCloud,
    },
  }
}
