import { HighwayIndex, GroupIndex } from '@/types';
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
