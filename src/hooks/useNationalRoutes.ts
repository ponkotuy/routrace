import { useQuery } from '@tanstack/react-query';
import { loadNationalRoutesIndex, loadNationalRouteGroupsIndex, loadNationalRouteData } from '@/utils/dataLoader';

export function useNationalRoutesIndex() {
  return useQuery({
    queryKey: ['national-routes-index'],
    queryFn: loadNationalRoutesIndex,
    staleTime: Infinity,
  });
}

export function useNationalRouteGroupsIndex() {
  return useQuery({
    queryKey: ['national-route-groups-index'],
    queryFn: loadNationalRouteGroupsIndex,
    staleTime: Infinity,
  });
}

export function useNationalRouteData(id: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ['national-route', id],
    queryFn: () => loadNationalRouteData(id),
    enabled,
    staleTime: Infinity,
  });
}
