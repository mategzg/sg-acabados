'use client'

export function Marquee({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="overflow-hidden border-y border-border/60 bg-white">
      <div className="flex animate-[marquee_18s_linear_infinite] whitespace-nowrap">
        {[...items, ...items].map((item, idx) => (
          <div key={`${item.label}-${idx}`} className="flex items-center gap-3 px-8 py-4">
            <span className="font-heading text-xl font-semibold text-foreground">{item.value}</span>
            <span className="text-sm text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}


