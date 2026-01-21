import { HighwayIndex } from '@/types';
import { LOCAL_ENDPOINTS } from './constants';
import { fetchCoastline, fetchHighwayData, fetchHighwaysIndex } from './api';

const isDev = import.meta.env.DEV;

async function tryLocalFirst<T>(
  localUrl: string,
  remoteFetcher: () => Promise<T>
): Promise<T> {
  if (isDev) {
    try {
      const localResponse = await fetch(localUrl);
      if (localResponse.status === 200 && !localResponse.headers.get("content-type")?.includes("text/html")) {
        console.log(`[Dev] Loaded from local: ${localUrl}`);
        return localResponse.json();
      }
    } catch {
      // Local file not found, fall through to remote
    }
    console.log(`[Dev] Local not found, fetching from remote`);
  }

  return remoteFetcher();
}

export async function loadHighwaysIndex(): Promise<HighwayIndex> {
  return tryLocalFirst(LOCAL_ENDPOINTS.highwaysIndex, fetchHighwaysIndex);
}

export async function loadHighwayData(id: string): Promise<GeoJSON.FeatureCollection> {
  return tryLocalFirst(LOCAL_ENDPOINTS.highway(id), () => fetchHighwayData(id));
}

export async function loadCoastline(): Promise<GeoJSON.FeatureCollection> {
  return tryLocalFirst(LOCAL_ENDPOINTS.coastline, fetchCoastline);
}
