'use client'

import { SessionProvider as SessionProviderNext } from 'next-auth/react'
import type { ReactNode } from 'react'

interface ISessionProviderProps {
  children: ReactNode
}

export const SessionProvider = ({ children }: ISessionProviderProps) => {
  return <SessionProviderNext>{children}</SessionProviderNext>
}
