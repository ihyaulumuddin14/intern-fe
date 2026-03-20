import { QueryClient, defaultShouldDehydrateQuery, isServer } from '@tanstack/react-query';

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

let browserQueryClient: QueryClient | undefined = undefined

export function getQueryClient() {
  if (isServer) {
    /**
     * Server: always make a new query client
     */
    return makeQueryClient()
  } else {
    /**
     * In order to not re-make a new client if React
     * suspends has resolved after during the initial render
     */
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}