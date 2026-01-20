import { useQuery } from '@tanstack/react-query';
import { fetchCoastline } from '@/utils/api';

export function useCoastline() {
  return useQuery({
    queryKey: ['coastline'],
    queryFn: fetchCoastline,
    staleTime: Infinity,
  });
}
