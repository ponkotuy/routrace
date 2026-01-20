import { MapContainer, ZoomControl } from 'react-leaflet';
import { useQueries } from '@tanstack/react-query';
import { Highway } from '@/types';
import { CoastlineLayer } from './CoastlineLayer';
import { HighwayLayer } from './HighwayLayer';
import { MAP_CONFIG } from '@/utils/constants';
import { fetchHighwayData } from '@/utils/api';
import 'leaflet/dist/leaflet.css';

interface MapViewProps {
  coastlineData: GeoJSON.FeatureCollection | undefined;
  showCoastline: boolean;
  highways: Highway[];
  selectedIds: Set<string>;
}

export function MapView({ 
  coastlineData, 
  showCoastline, 
  highways,
  selectedIds,
}: MapViewProps) {
  const selectedHighways = highways.filter(h => selectedIds.has(h.id));
  
  const highwayQueries = useQueries({
    queries: selectedHighways.map(highway => ({
      queryKey: ['highway', highway.id],
      queryFn: () => fetchHighwayData(highway.id),
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
              color={highway.color}
              name={highway.name}
            />
          );
        })}
      </MapContainer>
    </div>
  );
}
