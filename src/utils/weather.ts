const wIconDir = '/weather-icons';

const weatherCodes: Record<string, string> = {
  '0': 'Unknown',
  '1000': 'Clear, Sunny',
  '1001': 'Cloudy',
  '1100': 'Mostly Clear',
  '1101': 'Partly Cloudy',
  '1102': 'Mostly Cloudy',
  '2000': 'Fog',
  '2100': 'Light Fog',
  '3000': 'Light Wind',
  '3001': 'Wind',
  '3002': 'Strong Wind',
  '4000': 'Drizzle',
  '4001': 'Rain',
  '4200': 'Light Rain',
  '4201': 'Heavy Rain',
  '5000': 'Snow',
  '5001': 'Flurries',
  '5100': 'Light Snow',
  '5101': 'Heavy Snow',
  '6000': 'Freezing Drizzle',
  '6001': 'Freezing Rain',
  '6200': 'Light Freezing Rain',
  '6201': 'Heavy Freezing Rain',
  '7000': 'Ice Pellets',
  '7101': 'Heavy Ice Pellets',
  '7102': 'Light Ice Pellets',
  '8000': 'Thunderstorm',
};

const weatherIcons: Record<string, string> = {
  epa: `${wIconDir}/epa.svg`,
  humidity: `${wIconDir}/humidity.svg`,
  location: `${wIconDir}/pin.svg`,
  pressure: `${wIconDir}/pressure.svg`,
  sunrise: `${wIconDir}/sunrise.svg`,
  sunset: `${wIconDir}/sunset.svg`,
  uvindex: `${wIconDir}/uvindex.svg`,
  wind: `${wIconDir}/wind.svg`,

  moonphase0: `${wIconDir}/moonphase-0.svg`,
  moonphase1: `${wIconDir}/moonphase-1.svg`,
  moonphase2: `${wIconDir}/moonphase-2.svg`,
  moonphase3: `${wIconDir}/moonphase-3.svg`,
  moonphase4: `${wIconDir}/moonphase-4.svg`,
  moonphase5: `${wIconDir}/moonphase-5.svg`,
  moonphase6: `${wIconDir}/moonphase-6.svg`,
  moonphase7: `${wIconDir}/moonphase-7.svg`,

  '1000': `${wIconDir}/clear_day.svg`,
  '1001': `${wIconDir}/cloudy.svg`,
  '1100': `${wIconDir}/mostly_clear_day.svg`,
  '1101': `${wIconDir}/partly_cloudy_day.svg`,
  '1102': `${wIconDir}/mostly_cloudy.svg`,
  '2000': `${wIconDir}/fog.svg`,
  '2100': `${wIconDir}/fog_light.svg`,
  '3000': `${wIconDir}/wind.svg`,
  '3001': `${wIconDir}/wind.svg`,
  '3002': `${wIconDir}/wind.svg`,
  '4000': `${wIconDir}/drizzle.svg`,
  '4001': `${wIconDir}/rain.svg`,
  '4200': `${wIconDir}/rain_light.svg`,
  '4201': `${wIconDir}/rain_heavy.svg`,
  '5000': `${wIconDir}/snow.svg`,
  '5001': `${wIconDir}/flurries.svg`,
  '5100': `${wIconDir}/snow_light.svg`,
  '5101': `${wIconDir}/snow_heavy.svg`,
  '6000': `${wIconDir}/freezing_drizzle.svg`,
  '6001': `${wIconDir}/freezing_rain.svg`,
  '6200': `${wIconDir}/freezing_rain_light.svg`,
  '6201': `${wIconDir}/freezing_rain_heavy.svg`,
  '7000': `${wIconDir}/ice_pellets.svg`,
  '7101': `${wIconDir}/ice_pellets_heavy.svg`,
  '7102': `${wIconDir}/ice_pellets_light.svg`,
  '8000': `${wIconDir}/tstorm.svg`,
};

export const getWeatherIcon = (code: string) => {
  return weatherIcons[code];
};

export const getMoonIcon = (phase: string | number) => {
  return weatherIcons[`moonphase${phase}`];
};

export const getPrettyPrintWeatherCode = (code: string) => {
  return weatherCodes[code];
};

export const getEPAInfo = (index: number) => {
  if (300 < index) return 'Hazardous';
  if (201 <= index && index <= 300) return 'Very Unhealthy';
  if (151 <= index && index <= 200) return 'Unhealthy';
  if (101 <= index && index <= 150) return 'Unhealthy for Sensitive Groups';
  if (51 <= index && index <= 100) return 'Moderate';
  if (0 <= index && index <= 50) return 'Good';
  return '';
};

export const getSunTime = (time: string) => {
  return new Date(time).getHours() + ':' + new Date(time).getMinutes();
};

export const uvStyle: Record<string, { color: string; background: string }> = {
  Low: { color: '#15803d', background: '#CBF282' },
  Moderate: { color: '#7F5717', background: '#FFAA21' },
  High: { color: '#6B2A0C', background: '#FF7535' },
  'Very High': { color: '#741010', background: '#FF3939' },
  Extreme: { color: '#880430', background: '#DE5063' },
};

export const getUVInfo = (index: number) => {
  if (10 < index) return 'Extreme';
  if (8 <= index && index <= 10) return 'Very High';
  if (6 <= index && index <= 7) return 'High';
  if (3 <= index && index <= 5) return 'Moderate';
  if (0 <= index && index <= 2) return 'Low';
  return '';
};
