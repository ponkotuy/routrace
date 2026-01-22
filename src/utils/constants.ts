export const API_BASE_URL = 'https://ponkotuy.github.io/routrace-data';
export const LOCAL_DATA_PATH = '/data';

export const ENDPOINTS = {
  coastline: `${API_BASE_URL}/coastline.json`,
  highwaysIndex: `${API_BASE_URL}/highways/index.json`,
  highway: (id: string) => `${API_BASE_URL}/highways/${id}.json`,
  metadata: `${API_BASE_URL}/metadata.json`,
} as const;

export const LOCAL_ENDPOINTS = {
  coastline: `${LOCAL_DATA_PATH}/coastline.json`,
  highwaysIndex: `${LOCAL_DATA_PATH}/highways/index.json`,
  highway: (id: string) => `${LOCAL_DATA_PATH}/highways/${id}.json`,
  metadata: `${LOCAL_DATA_PATH}/metadata.json`,
} as const;

export const MAP_CONFIG = {
  center: [36.5, 138.0] as [number, number],
  initialZoom: 5,
  minZoom: 4,
  maxZoom: 12,
} as const;

export const COASTLINE_STYLE = {
  color: '#d0d0d0',
  weight: 1,
  opacity: 0.8,
  fillOpacity: 0,
} as const;

export const DEFAULT_HIGHWAY_COLOR = '#4a90d9';

export const HIGHWAY_STYLE = {
  weight: 2,
  opacity: 1,
} as const;

export const HIGHWAY_HOVER_STYLE = {
  weight: 3,
} as const;
