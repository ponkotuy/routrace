import { useQuery } from '@tanstack/react-query';
import { fetchHighwaysIndex, fetchHighwayData } from '@/utils/api';
import { Highway } from '@/types';

export function useHighwaysIndex() {
  return useQuery({
    queryKey: ['highways-index'],
    queryFn: fetchHighwaysIndex,
    staleTime: Infinity,
  });
}

export function useHighwayData(id: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ['highway', id],
    queryFn: () => fetchHighwayData(id),
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
