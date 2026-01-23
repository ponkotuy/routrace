export interface Highway {
  id: string;
  refDisplay: string;
  name: string;
  nameEn: string;
  group?: string;
}

export interface HighwayIndex {
  highways: Highway[];
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
