import { Marker } from 'react-leaflet';
import L from 'leaflet';
import type { StatusMarker } from '@/types';

export type RoadType = 'highway' | 'national';

interface RoadLabelProps {
  position: [number, number]; // [lat, lng]
  label: string;
  roadType: RoadType;
  showLabel: boolean;
  statusMarker: StatusMarker;
}

function createHighwayLabelHtml(label: string): string {
  return `<div class="highway-sign">${label}</div>`;
}

function createNationalRouteLabelHtml(label: string): string {
  return `
    <svg width="40" height="38" viewBox="0 0 40 38" xmlns="http://www.w3.org/2000/svg">
      <path d="M20,36 C22.3,36 24.4,35.1 26.1,33.6 C32.5,27.1 37.2,19 39.6,10.1 C39.9,9.3 40,8.3 40,7.3 C40,3.1 37.1,0 33,0 C28.7,0 24.4,0 20,0 C15.6,0 11.3,0 7,0 C2.9,0 0,3.1 0,7.3 C0,8.3 0.1,9.3 0.4,10.1 C2.8,19 7.5,27.1 13.9,33.6 C15.6,35.1 17.7,36 20,36 Z"
            fill="#0033a0"
            stroke="white"
            stroke-width="2"
            stroke-linejoin="round"/>
      <text x="20" y="20" text-anchor="middle"
            fill="white"
            font-size="14"
            font-weight="bold"
            font-family="Arial, sans-serif">${label}</text>
    </svg>`;
}

function createStatusMarkerHtml(marker: StatusMarker): string {
  if (marker === 'circle') {
    return '<div class="status-marker">○</div>';
  }
  if (marker === 'cross') {
    return '<div class="status-marker">×</div>';
  }
  return '';
}

function createIcon(
  label: string,
  roadType: RoadType,
  showLabel: boolean,
  statusMarker: StatusMarker
): L.DivIcon {
  let labelHtml = '';
  if (showLabel) {
    if (roadType === 'highway') {
      labelHtml = createHighwayLabelHtml(label);
    } else {
      labelHtml = `<div class="national-route-sign">${createNationalRouteLabelHtml(label)}</div>`;
    }
  }

  const markerHtml = statusMarker !== 'none' ? createStatusMarkerHtml(statusMarker) : '';

  return L.divIcon({
    className: 'road-label road-marker-container',
    html: `<div class="road-marker-wrapper">${labelHtml}${markerHtml}</div>`,
  });
}

export function RoadLabel({ position, label, roadType, showLabel, statusMarker }: RoadLabelProps) {
  if (!showLabel && statusMarker === 'none') {
    return null;
  }

  const icon = createIcon(label, roadType, showLabel, statusMarker);

  return (
    <Marker
      position={position}
      icon={icon}
      interactive={false}
    />
  );
}
