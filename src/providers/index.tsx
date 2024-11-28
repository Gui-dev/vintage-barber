'use client'

import type { ReactNode } from 'react'
import { QueryProvider } from './query-provider'
import { SessionProvider } from './session-provider'

interface IProvidersProps {
  children: ReactNode
}

export const Providers = ({ children }: IProvidersProps) => {
  return (
    <SessionProvider>
      <QueryProvider>{children}</QueryProvider>
    </SessionProvider>
  )
}
