// Grille technique (lignes, pas points) — plus graphique que DotGrid, pour
// les sections qui ont besoin de plus de présence visuelle. `dark` inverse
// les lignes en blanc pour les fonds anthracite. Toujours l'encre de la
// charte, jamais de nouvelle couleur.
export default function GridLines({ className = '', dark = false }: { className?: string; dark?: boolean }) {
  const lineColor = dark ? 'rgba(255,255,255,0.08)' : 'rgba(28,28,46,0.06)'
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage: `linear-gradient(${lineColor} 1px, transparent 1px), linear-gradient(90deg, ${lineColor} 1px, transparent 1px)`,
        backgroundSize: '64px 64px',
        maskImage: 'linear-gradient(to bottom, black, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
      }}
    />
  )
}
