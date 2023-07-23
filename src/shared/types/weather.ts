export interface GeoLocationType {
  lat: string;
  lon: string;
}

export interface WeatherIntervalType {
  startTime: string;
  values: {
    // 'cloudBase',
    // 'cloudCeiling',
    // 'cloudCover',
    // 'precipitationIntensity',
    // 'precipitationType',
    // 'windDirection',
    // 'windGust',
    temperature: number;
    temperatureApparent: number;
    weatherCode: number;
    windSpeed: number;
  };
}

export interface WeatherTimelineType {
  timestep: string | string[];
  startTime: string;
  endTime: string;
  intervals: WeatherIntervalType[];
}

export interface WeatherDataType {
  timelines: WeatherTimelineType[];
}

export interface WeatherStoreType {
  isFetch: boolean;
  loading: boolean;
  data: WeatherDataType;
  location: GeoLocationType;
}
