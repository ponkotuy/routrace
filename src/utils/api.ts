import { HighwayIndex, GroupIndex, NationalRouteIndex, NationalRouteGroupIndex } from '@/types';
import { ENDPOINTS } from './constants';

export async function fetchHighwaysIndex(): Promise<HighwayIndex> {
  const response = await fetch(ENDPOINTS.highwaysIndex);
  if (!response.ok) {
    throw new Error('Failed to fetch highways index');
  }
  return response.json();
}

export async function fetchGroupsIndex(): Promise<GroupIndex> {
  const response = await fetch(ENDPOINTS.groupsIndex);
  if (!response.ok) {
    throw new Error('Failed to fetch groups index');
  }
  return response.json();
}

export async function fetchHighwayData(id: string): Promise<GeoJSON.FeatureCollection> {
  const response = await fetch(ENDPOINTS.highway(id));
  if (!response.ok) {
    throw new Error(`Failed to fetch highway data for ${id}`);
  }
  return response.json();
}

export async function fetchCoastline(): Promise<GeoJSON.FeatureCollection> {
  const response = await fetch(ENDPOINTS.coastline);
  if (!response.ok) {
    throw new Error('Failed to fetch coastline data');
  }
  return response.json();
}

export async function fetchNationalRoutesIndex(): Promise<NationalRouteIndex> {
  const response = await fetch(ENDPOINTS.nationalRoutesIndex);
  if (!response.ok) {
    throw new Error('Failed to fetch national routes index');
  }
  return response.json();
}

export async function fetchNationalRouteGroupsIndex(): Promise<NationalRouteGroupIndex> {
  const response = await fetch(ENDPOINTS.nationalRouteGroupsIndex);
  if (!response.ok) {
    throw new Error('Failed to fetch national route groups index');
  }
  return response.json();
}

export async function fetchNationalRouteData(id: string): Promise<GeoJSON.FeatureCollection> {
  const response = await fetch(ENDPOINTS.nationalRoute(id));
  if (!response.ok) {
    throw new Error(`Failed to fetch national route data for ${id}`);
  }
  return response.json();
}
