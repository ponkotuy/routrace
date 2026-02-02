import { MapContainer, ZoomControl } from 'react-leaflet';
import { useQueries } from '@tanstack/react-query';
import { Highway, NationalRoute, StatusMarker } from '@/types';
import { CoastlineLayer } from './CoastlineLayer';
import { HighwayLayer } from './HighwayLayer';
import { MAP_CONFIG, DEFAULT_HIGHWAY_COLOR, DEFAULT_NATIONAL_ROUTE_COLOR } from '@/utils/constants';
import { loadHighwayData, loadNationalRouteData } from '@/utils/dataLoader';
import 'leaflet/dist/leaflet.css';

interface MapViewProps {
  coastlineData: GeoJSON.FeatureCollection | undefined;
  showCoastline: boolean;
  highways: Highway[];
  selectedHighwayIds: Set<string>;
  highwayColors: Record<string, string>;
  highwayShowLabels: Record<string, boolean>;
  highwayStatusMarkers: Record<string, StatusMarker>;
  nationalRoutes: NationalRoute[];
  selectedNationalRouteIds: Set<string>;
  nationalRouteColors: Record<string, string>;
  nationalRouteShowLabels: Record<string, boolean>;
  nationalRouteStatusMarkers: Record<string, StatusMarker>;
}

export function MapView({
  coastlineData,
  showCoastline,
  highways,
  selectedHighwayIds,
  highwayColors,
  highwayShowLabels,
  highwayStatusMarkers,
  nationalRoutes,
  selectedNationalRouteIds,
  nationalRouteColors,
  nationalRouteShowLabels,
  nationalRouteStatusMarkers,
}: MapViewProps) {
  const selectedHighways = highways.filter(h => selectedHighwayIds.has(h.id));
  const selectedNationalRoutes = nationalRoutes.filter(r => selectedNationalRouteIds.has(r.id));

  const highwayQueries = useQueries({
    queries: selectedHighways.map(highway => ({
      queryKey: ['highway', highway.id],
      queryFn: () => loadHighwayData(highway.id),
      staleTime: Infinity,
    })),
  });

  const nationalRouteQueries = useQueries({
    queries: selectedNationalRoutes.map(route => ({
      queryKey: ['national-route', route.id],
      queryFn: () => loadNationalRouteData(route.id),
      staleTime: Infinity,
    })),
  });

  return (
    <div id="map-container" className="flex-1 relative">
      <MapContainer
        center={MAP_CONFIG.center}
        zoom={MAP_CONFIG.initialZoom}
        minZoom={MAP_CONFIG.minZoom}
        maxZoom={MAP_CONFIG.maxZoom}
        zoomControl={false}
        className="w-full h-full"
        style={{ background: '#ffffff' }}
      >
        <ZoomControl position="bottomright" />

        <CoastlineLayer
          data={coastlineData}
          show={showCoastline}
        />

        {selectedHighways.map((highway, index) => {
          const query = highwayQueries[index];
          if (!query.data) return null;

          return (
            <HighwayLayer
              key={highway.id}
              id={highway.id}
              data={query.data}
              name={`${highway.refDisplay} ${highway.name}`}
              color={highwayColors[highway.id] ?? DEFAULT_HIGHWAY_COLOR}
              label={highway.refDisplay}
              roadType="highway"
              showLabel={highwayShowLabels[highway.id] ?? true}
              statusMarker={highwayStatusMarkers[highway.id] ?? 'none'}
            />
          );
        })}

        {selectedNationalRoutes.map((route, index) => {
          const query = nationalRouteQueries[index];
          if (!query.data) return null;

          return (
            <HighwayLayer
              key={route.id}
              id={route.id}
              data={query.data}
              name={route.name}
              color={nationalRouteColors[route.id] ?? DEFAULT_NATIONAL_ROUTE_COLOR}
              label={route.ref}
              roadType="national"
              showLabel={nationalRouteShowLabels[route.id] ?? true}
              statusMarker={nationalRouteStatusMarkers[route.id] ?? 'none'}
            />
          );
        })}
      </MapContainer>
      <div className="absolute bottom-0 left-0 bg-white/80 text-xs px-1 z-[1000]">
        © OpenStreetMap contributors | dataofjapan/land
      </div>
    </div>
  );
}
