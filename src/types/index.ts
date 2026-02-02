export interface Highway {
  id: string;
  refDisplay: string;
  name: string;
  nameEn: string;
  group: string;
}

export interface HighwayIndex {
  highways: Highway[];
}

export type GroupType = '都市高速' | '一般高速';

export interface Group {
  name: string;
  type: GroupType;
  order: number;
}

export interface GroupIndex {
  groups: Group[];
}

export interface NationalRoute {
  id: string;
  name: string;
  nameEn: string;
  ref: string;
  fileSize: number;
  updatedAt: string;
  group: string;
}

export interface NationalRouteIndex {
  nationalRoutes: NationalRoute[];
}

export interface NationalRouteGroup {
  name: string;
  order: number;
}

export interface NationalRouteGroupIndex {
  groups: NationalRouteGroup[];
}

export type StatusMarker = 'none' | 'circle' | 'cross';

export interface AppState {
  highways: Highway[];
  selectedHighwayIds: Set<string>;
  loadedHighwayData: Map<string, GeoJSON.FeatureCollection>;
  showCoastline: boolean;
  isLoading: boolean;
  isDrawerOpen: boolean;
  isInfoModalOpen: boolean;
}
