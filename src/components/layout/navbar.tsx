"use client"

import { useState } from 'react'
import { LocalizedLink as Link } from '@/components/localized-link'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { siteConfig } from '@/config/site'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo'
import { trackWhatsapp } from '@/lib/gtag'
import { cn } from '@/lib/utils'

const navLinks = siteConfig.navigation.main

export function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const menuId = 'primary-navigation'

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }

    return pathname === href || pathname.startsWith(`${href}/`)
  }

  const closeMenu = () => setOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur-sm">
      <div className="container flex h-20 items-center justify-between gap-space-md">
        <Link href="/" className="inline-flex items-center gap-3 text-foreground" aria-label="SG Acabados">
          <span className="flex items-center justify-center">
            <Logo width={180} height={72} />
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-heading text-lg font-semibold tracking-tight text-foreground">SG Acabados</span>
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Plazos cumplidos en Peru</span>
          </span>
        </Link>

        <nav
          id={menuId}
          aria-label="Navegacion principal"
          className="hidden items-center gap-space-lg text-sm font-heading md:flex"
        >
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-full px-3 py-2 transition-colors',
                isActive(item.href)
                  ? 'bg-accent/20 text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="h-6 w-px bg-border/80" />
          <Button asChild size="sm">
            <Link href={siteConfig.hero.primaryCta.href}>{siteConfig.hero.primaryCta.label}</Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="text-sm">
            <a
              href={siteConfig.whatsapp.link}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackWhatsapp('navbar-desktop')}
            >
              WhatsApp
            </a>
          </Button>
        </nav>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? 'Cerrar menu' : 'Abrir menu'}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      {open ? (
        <div
          className="border-t border-border/60 bg-background px-6 pb-6 pt-4 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal"
        >
          <nav className="flex flex-col gap-space-sm text-sm font-medium" aria-label="Enlaces moviles">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-2xl px-4 py-2 transition-colors',
                  isActive(item.href)
                    ? 'bg-accent/20 text-foreground'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-space-md flex flex-col gap-space-sm">
            <Button asChild onClick={closeMenu}>
              <Link href={siteConfig.hero.primaryCta.href}>{siteConfig.hero.primaryCta.label}</Link>
            </Button>
            <Button asChild variant="outline">
              <a
                href={siteConfig.whatsapp.link}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  trackWhatsapp('navbar-mobile')
                  closeMenu()
                }}
              >
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  )
}
