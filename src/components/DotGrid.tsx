// Texture de fond discrète — grille de points en SVG répété, très faible
// opacité. Donne du "caractère" sans ajouter de couleur (juste l'encre de
// la charte, à 4% d'opacité) — le genre de détail qui fait la différence
// entre un fond "vide" et un fond "sobre mais habité", à la Linear/Stripe.
export default function DotGrid({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage:
          'radial-gradient(circle, rgba(28,28,46,0.14) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 100%)',
      }}
    />
  )
}
