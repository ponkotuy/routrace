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

export interface AppState {
  highways: Highway[];
  selectedHighwayIds: Set<string>;
  loadedHighwayData: Map<string, GeoJSON.FeatureCollection>;
  showCoastline: boolean;
  isLoading: boolean;
  isDrawerOpen: boolean;
  isInfoModalOpen: boolean;
}
