import { GeoJSON } from 'react-leaflet';
import { COASTLINE_STYLE } from '@/utils/constants';

interface CoastlineLayerProps {
  data: GeoJSON.FeatureCollection | undefined;
  show: boolean;
}

export function CoastlineLayer({ data, show }: CoastlineLayerProps) {
  if (!show || !data) return null;

  return (
    <GeoJSON
      key="coastline"
      data={data}
      style={COASTLINE_STYLE}
    />
  );
}
