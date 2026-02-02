import { Marker } from 'react-leaflet';
import L from 'leaflet';

export type RoadType = 'highway' | 'national';

interface RoadLabelProps {
  position: [number, number]; // [lat, lng]
  label: string;
  roadType: RoadType;
}

function createHighwayIcon(label: string): L.DivIcon {
  return L.divIcon({
    className: 'road-label highway-sign-wrapper',
    html: `<div class="highway-sign">${label}</div>`,
  });
}

function createNationalRouteIcon(label: string): L.DivIcon {
  // Based on Japan National Route Sign Unit Drawing from Wikimedia Commons
  // Original path scaled down and centered for icon use
  const svg = `
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
  return L.divIcon({
    className: 'road-label',
    html: `<div class="national-route-sign">${svg}</div>`,
    iconSize: [40, 38],
    iconAnchor: [20, 19],
  });
}

export function RoadLabel({ position, label, roadType }: RoadLabelProps) {
  const icon =
    roadType === 'highway'
      ? createHighwayIcon(label)
      : createNationalRouteIcon(label);

  return (
    <Marker
      position={position}
      icon={icon}
      interactive={false}
    />
  );
}
