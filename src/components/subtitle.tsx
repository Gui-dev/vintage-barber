import type { ReactNode } from 'react'

interface ISubtitleProps {
  children: ReactNode
}

export const Subtitle = ({ children }: ISubtitleProps) => {
  return (
    <h2 className="mt-6 mb-2 font-bold text-gray-400 text-xs uppercase">
      {children}
    </h2>
  )
}
