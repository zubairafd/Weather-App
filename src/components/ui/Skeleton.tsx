import React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      className={twMerge(
        clsx(
          'animate-pulse rounded-2xl bg-white/10 backdrop-blur-md border border-white/5',
          className
        )
      )}
      {...props}
    />
  )
}
