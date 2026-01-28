import { useQuery } from '@tanstack/react-query';
import { loadHighwaysIndex, loadHighwayData, loadGroupsIndex } from '@/utils/dataLoader';

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
