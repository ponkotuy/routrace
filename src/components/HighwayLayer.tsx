import { GeoJSON, Tooltip } from 'react-leaflet';
import { HIGHWAY_STYLE, HIGHWAY_HOVER_STYLE } from '@/utils/constants';
import type { PathOptions, LeafletMouseEvent } from 'leaflet';

interface HighwayLayerProps {
  id: string;
  data: GeoJSON.FeatureCollection;
  color: string;
  name: string;
}

export function HighwayLayer({ id, data, color, name }: HighwayLayerProps) {
  const style: PathOptions = {
    ...HIGHWAY_STYLE,
    color,
  };

  const onEachFeature = (feature: GeoJSON.Feature, layer: L.Layer) => {
    layer.bindTooltip(name, {
      sticky: true,
      direction: 'top',
      offset: [0, -10],
    });

    layer.on({
      mouseover: (e: LeafletMouseEvent) => {
        const target = e.target;
        target.setStyle({
          ...HIGHWAY_HOVER_STYLE,
          color: adjustBrightness(color, 20),
        });
        target.bringToFront();
      },
      mouseout: (e: LeafletMouseEvent) => {
        const target = e.target;
        target.setStyle(style);
      },
    });
  };

  return (
    <GeoJSON
      key={id}
      data={data}
      style={style}
      onEachFeature={onEachFeature}
    />
  );
}

function adjustBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, ((num >> 8) & 0x00ff) + amt);
  const B = Math.min(255, (num & 0x0000ff) + amt);
  return `#${((1 << 24) | (R << 16) | (G << 8) | B).toString(16).slice(1)}`;
}
