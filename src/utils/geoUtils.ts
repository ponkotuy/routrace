import type { LatLngBounds } from 'leaflet';

type Coordinate = [number, number]; // [lng, lat]

export function extractCoordinatesFromGeoJSON(
  geojson: GeoJSON.FeatureCollection
): Coordinate[] {
  const coordinates: Coordinate[] = [];

  for (const feature of geojson.features) {
    if (!feature.geometry) continue;
    extractFromGeometry(feature.geometry, coordinates);
  }

  return coordinates;
}

function extractFromGeometry(
  geometry: GeoJSON.Geometry,
  result: Coordinate[]
): void {
  switch (geometry.type) {
    case 'Point':
      result.push(geometry.coordinates as Coordinate);
      break;
    case 'LineString':
      for (const coord of geometry.coordinates) {
        result.push(coord as Coordinate);
      }
      break;
    case 'Polygon':
      for (const ring of geometry.coordinates) {
        for (const coord of ring) {
          result.push(coord as Coordinate);
        }
      }
      break;
    case 'MultiPoint':
      for (const coord of geometry.coordinates) {
        result.push(coord as Coordinate);
      }
      break;
    case 'MultiLineString':
      for (const line of geometry.coordinates) {
        for (const coord of line) {
          result.push(coord as Coordinate);
        }
      }
      break;
    case 'MultiPolygon':
      for (const polygon of geometry.coordinates) {
        for (const ring of polygon) {
          for (const coord of ring) {
            result.push(coord as Coordinate);
          }
        }
      }
      break;
    case 'GeometryCollection':
      for (const geom of geometry.geometries) {
        extractFromGeometry(geom, result);
      }
      break;
  }
}

export function filterCoordinatesInBounds(
  coordinates: Coordinate[],
  bounds: LatLngBounds
): Coordinate[] {
  return coordinates.filter(([lng, lat]) => {
    return bounds.contains([lat, lng]);
  });
}

export function getCenterOfCoordinates(
  coordinates: Coordinate[]
): Coordinate | null {
  if (coordinates.length === 0) return null;

  let totalLng = 0;
  let totalLat = 0;

  for (const [lng, lat] of coordinates) {
    totalLng += lng;
    totalLat += lat;
  }

  return [totalLng / coordinates.length, totalLat / coordinates.length];
}

export function getMiddleCoordinate(
  coordinates: Coordinate[]
): Coordinate | null {
  if (coordinates.length === 0) return null;

  const middleIndex = Math.floor(coordinates.length / 2);
  return coordinates[middleIndex];
}
