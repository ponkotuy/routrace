export interface Highway {
  id: string;
  name: string;
  nameEn: string;
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
