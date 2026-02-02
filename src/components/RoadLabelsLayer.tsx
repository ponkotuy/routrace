import { useMemo, useState, useCallback } from 'react';
import { useMapEvents } from 'react-leaflet';
import type { LatLngBounds } from 'leaflet';
import { RoadLabel, RoadType } from './RoadLabel';
import {
  extractCoordinatesFromGeoJSON,
  filterCoordinatesInBounds,
  getMiddleCoordinate,
} from '@/utils/geoUtils';
import { ROAD_LABEL_CONFIG } from '@/utils/constants';

interface RoadLabelsLayerProps {
  data: GeoJSON.FeatureCollection;
  label: string;
  roadType: RoadType;
}

export function RoadLabelsLayer({ data, label, roadType }: RoadLabelsLayerProps) {
  const [bounds, setBounds] = useState<LatLngBounds | null>(null);
  const [zoom, setZoom] = useState<number>(0);

  const updateMapState = useCallback((map: L.Map) => {
    setBounds(map.getBounds());
    setZoom(map.getZoom());
  }, []);

  const map = useMapEvents({
    moveend: () => updateMapState(map),
    zoomend: () => updateMapState(map),
    load: () => updateMapState(map),
  });

  // Initialize on first render
  useMemo(() => {
    if (!bounds) {
      updateMapState(map);
    }
  }, [bounds, map, updateMapState]);

  const allCoordinates = useMemo(
    () => extractCoordinatesFromGeoJSON(data),
    [data]
  );

  const labelPosition = useMemo(() => {
    if (!bounds || zoom < ROAD_LABEL_CONFIG.minZoom) return null;

    const coordsInBounds = filterCoordinatesInBounds(allCoordinates, bounds);
    if (coordsInBounds.length === 0) return null;

    const middlePoint = getMiddleCoordinate(coordsInBounds);
    if (!middlePoint) return null;

    // Convert [lng, lat] to [lat, lng] for Leaflet
    return [middlePoint[1], middlePoint[0]] as [number, number];
  }, [allCoordinates, bounds, zoom]);

  if (!labelPosition) return null;

  return (
    <RoadLabel
      position={labelPosition}
      label={label}
      roadType={roadType}
    />
  );
}
