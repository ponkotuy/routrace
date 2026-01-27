import { useQuery } from '@tanstack/react-query';
import { loadHighwaysIndex, loadHighwayData, loadGroupsIndex } from '@/utils/dataLoader';
import { Highway } from '@/types';

export function useHighwaysIndex() {
  return useQuery({
    queryKey: ['highways-index'],
    queryFn: loadHighwaysIndex,
    staleTime: Infinity,
  });
}

export function useGroupsIndex() {
  return useQuery({
    queryKey: ['groups-index'],
    queryFn: loadGroupsIndex,
    staleTime: Infinity,
  });
}

export function useHighwayData(id: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ['highway', id],
    queryFn: () => loadHighwayData(id),
    enabled,
    staleTime: Infinity,
  });
}

export function useMultipleHighwayData(highways: Highway[], selectedIds: Set<string>) {
  const selectedHighways = highways.filter(h => selectedIds.has(h.id));
  
  const queries = selectedHighways.map(highway => ({
    id: highway.id,
    query: useHighwayData(highway.id, true),
    color: highway.color,
    name: highway.name,
  }));
  
  return queries;
}
