'use client'

import Image from 'next/image'

interface LogoProps {
  width?: number
  height?: number
  className?: string
}

export function Logo({ width = 180, height = 72, className }: LogoProps) {
  return (
    <Image
      src="/logos/logo-sg.png"
      alt="Logo SG Acabados"
      width={width}
      height={height}
      priority
      className={className}
    />
  )
}
