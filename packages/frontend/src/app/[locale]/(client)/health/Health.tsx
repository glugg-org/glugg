'use client';

import { getHealth } from '@/lib/api/health/getHealth';
import { useQuery } from '@tanstack/react-query';

export function Health() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['health'],
    queryFn: getHealth,
  });

  if (isLoading) return <>Loading...</>;
  if (error) return <>Error</>;
  if (!data) {
    return <>Unhealthy</>;
  } else {
    return 'Healthy';
  }
}
