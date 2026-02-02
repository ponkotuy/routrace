export const API_BASE_URL = 'https://ponkotuy.github.io/routrace-data';
export const LOCAL_DATA_PATH = '/data';

export const ENDPOINTS = {
  coastline: `${API_BASE_URL}/coastline.json`,
  highwaysIndex: `${API_BASE_URL}/highways/index.json`,
  groupsIndex: `${API_BASE_URL}/highways/group.json`,
  highway: (id: string) => `${API_BASE_URL}/highways/${id}.json`,
  metadata: `${API_BASE_URL}/metadata.json`,
  nationalRoutesIndex: `${API_BASE_URL}/national-roads/index.json`,
  nationalRouteGroupsIndex: `${API_BASE_URL}/national-roads/group.json`,
  nationalRoute: (id: string) => `${API_BASE_URL}/national-roads/${id}.json`,
} as const;

export const LOCAL_ENDPOINTS = {
  coastline: `${LOCAL_DATA_PATH}/coastline.json`,
  highwaysIndex: `${LOCAL_DATA_PATH}/highways/index.json`,
  groupsIndex: `${LOCAL_DATA_PATH}/highways/group.json`,
  highway: (id: string) => `${LOCAL_DATA_PATH}/highways/${id}.json`,
  metadata: `${LOCAL_DATA_PATH}/metadata.json`,
  nationalRoutesIndex: `${LOCAL_DATA_PATH}/national-roads/index.json`,
  nationalRouteGroupsIndex: `${LOCAL_DATA_PATH}/national-roads/group.json`,
  nationalRoute: (id: string) => `${LOCAL_DATA_PATH}/national-roads/${id}.json`,
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

export const DEFAULT_HIGHWAY_COLOR = '#42b883';
export const DEFAULT_NATIONAL_ROUTE_COLOR = '#f2c94c';
export const HIGHWAY_COLOR_OPTIONS = [
  '#4a90d9',
  '#e24a4a',
  '#f08c2e',
  '#f2c94c',
  '#42b883',
  '#2aa7b8',
  '#6c63ff',
  '#b45bd6',
] as const;

export const HIGHWAY_STYLE = {
  weight: 2,
  opacity: 1,
} as const;

export const HIGHWAY_HOVER_STYLE = {
  weight: 3,
} as const;

export const ROAD_LABEL_CONFIG = {
  minZoom: 7,
} as const;
