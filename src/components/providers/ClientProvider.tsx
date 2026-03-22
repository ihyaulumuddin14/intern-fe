'use client'

import { getQueryClient } from "@/lib/queryClient";
import {
  QueryClientProvider
} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';

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
