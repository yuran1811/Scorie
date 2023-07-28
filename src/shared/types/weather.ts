export interface GeoLocationType {
  lat: string;
  lon: string;
}

export interface WeatherIntervalType {
  startTime: string;
  values: {
    epaIndex: number;
    humidity: number;
    moonPhase: number;
    pressureSurfaceLevel: number;
    sunriseTime: string;
    sunsetTime: string;
    temperature: number;
    temperatureApparent: number;
    uvIndex: number;
    weatherCode: number;
    weatherCodeFullDay: number;
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
