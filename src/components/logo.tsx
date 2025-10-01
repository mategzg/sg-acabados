'use client'

import Image from 'next/image'

export function Logo({ width = 180, height = 72 }: { width?: number; height?: number }) {
  return <Image src="/logos/logo-sg.png" alt="Logo SG Acabados" width={width} height={height} priority />
}
