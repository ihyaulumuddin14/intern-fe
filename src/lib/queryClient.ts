import { QueryClient, defaultShouldDehydrateQuery } from '@tanstack/react-query';

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        /**
         * With SSR, must to set some default staleTime
         * above 0 to avoid refetching immediately on the client
         * cuz of the "stale" data by client
        */
       staleTime: 60 * 1000
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
      },
    }
  })
}