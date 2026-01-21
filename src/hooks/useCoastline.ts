import { useQuery } from '@tanstack/react-query';
import { loadCoastline } from '@/utils/dataLoader';

export function useCoastline() {
  return useQuery({
    queryKey: ['coastline'],
    queryFn: loadCoastline,
    staleTime: Infinity,
  });
}
