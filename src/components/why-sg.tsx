import { CheckCircle2, Layers3, ShieldCheck, Recycle } from 'lucide-react'

const pillars = [
  {
    icon: CheckCircle2,
    title: 'Plazos cumplidos',
    description: 'Planificacion Last Planner y seguimiento diario con reportes ejecutivos.'
  },
  {
    icon: Layers3,
    title: 'Soluciones integrales',
    description: 'Coordinamos pisos, iluminacion, mobiliario y sistemas con un unico responsable.'
  },
  {
    icon: ShieldCheck,
    title: 'Seguridad y sostenibilidad',
    description: 'Protocolos HSE, materiales certificados y trazabilidad de residuos.'
  },
  {
    icon: Recycle,
    title: 'Adaptabilidad',
    description: 'Fast-track, operaciones en sitio y ajustes de alcance sin perder control.'
  }
]

export function WhySG() {
  return (
    <section className="bg-white py-16">
      <div className="container space-y-8">
        <div className="space-y-4 text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Por que SG</p>
          <h2 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            Experiencia comprobada en proyectos criticos
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-3xl border border-border bg-white/95 p-6 shadow-soft transition-transform hover:-translate-y-1"
            >
              <pillar.icon className="h-8 w-8 text-accent" />
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">{pillar.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
