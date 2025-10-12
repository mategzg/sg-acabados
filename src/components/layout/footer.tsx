"use client"

import { LocalizedLink as Link } from '@/components/localized-link'

import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { trackCatalogDownload, trackWhatsapp } from '@/lib/gtag'

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-secondary/30 text-sm">
      <div className="container grid gap-space-xl py-space-3xl md:grid-cols-[1.4fr,1fr,1fr]">
        <div className="space-y-space-sm">
          <Link href="/" className="inline-flex items-center gap-3" aria-label="SG Acabados">
            <span className="flex items-center justify-center">
              <Logo width={180} height={72} />
            </span>
            <span className="font-heading text-lg font-semibold tracking-tight text-foreground">SG Acabados</span>
          </Link>
          <p className="max-w-sm text-muted-foreground">{siteConfig.description}</p>
          <div className="flex flex-wrap items-center gap-space-sm">
            <Button asChild size="sm">
              <Link href={siteConfig.hero.primaryCta.href}>{siteConfig.hero.primaryCta.label}</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="text-sm">
              <a
                href={siteConfig.whatsapp.link}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackWhatsapp('footer-whatsapp')}
              >
                Hablar por WhatsApp
              </a>
            </Button>
          </div>
        </div>
        <div className="space-y-space-sm">
          <h4 className="font-heading text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Sedes</h4>
          <ul className="space-y-2 text-muted-foreground">
            {siteConfig.offices.map((office) => (
              <li key={office.city}>
                <span className="font-semibold text-foreground">{office.city}:</span> {office.address}
              </li>
            ))}
          </ul>
          <div className="space-y-2 text-muted-foreground">
            <p className="font-semibold text-foreground">Contacto</p>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="block text-primary underline-offset-4 hover:text-primary/80"
            >
              {siteConfig.contact.email}
            </a>
            <a
              href={siteConfig.whatsapp.link}
              target="_blank"
              rel="noreferrer"
              className="block text-primary underline-offset-4 hover:text-primary/80"
              onClick={() => trackWhatsapp('footer-contact')}
            >
              {siteConfig.whatsapp.number}
            </a>
          </div>
        </div>
        <div className="space-y-space-sm">
          <h4 className="font-heading text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Recursos</h4>
          <ul className="space-y-2 text-muted-foreground">
            {siteConfig.navigation.footer.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noreferrer' : undefined}
                  className="transition hover:text-foreground"
                  onClick={() => {
                    if (item.href.includes('CATALOGO')) {
                      trackCatalogDownload('footer')
                    }
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 bg-white/70 py-space-sm">
        <div className="container flex flex-col gap-space-xs text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span>
            {siteConfig.legalName} | RUC 20605249648
          </span>
          <span>Copyright {new Date().getFullYear()} SG Acabados S.A.C. Todos los derechos reservados.</span>
        </div>
      </div>
    </footer>
  )
}


