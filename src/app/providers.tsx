'use client'

import { makeQueryClient } from "@/lib/queryClient";
import {
  isServer,
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import { ReactNode } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
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


export default function ClientProvider({
  children
}: {
  children: ReactNode
}) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      { children }
      {/* <ReactQueryDevtools position="right" initialIsOpen={true} /> */}
    </QueryClientProvider>
  )
}
