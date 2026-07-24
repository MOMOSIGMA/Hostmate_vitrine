import { motion } from 'framer-motion'

// Cadre de téléphone dessiné en CSS — nécessaire car les captures d'écran
// disponibles sont de simples screenshots bruts basse résolution (375×666px),
// pas des mockups déjà mis en scène. Les afficher à taille native dans un
// vrai cadre règle à la fois le flou (plus d'agrandissement excessif) et le
// côté "image plate" (la bordure + encoche suffit à vendre l'illusion 3D
// sans avoir besoin d'un rendu externe). Lift au survol, pas de rotation —
// une simple image sans relief déforme trop mal sous un effet de bascule.
export default function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="relative mx-auto w-full"
      style={{ maxWidth: 300 }}
    >
      <div className="relative rounded-[2.75rem] border-[10px] border-hostmate-ink bg-hostmate-ink shadow-[0_40px_80px_-24px_rgba(28,28,46,0.45)]">
        {/* Encoche */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-hostmate-ink rounded-b-2xl z-10" />
        <div className="overflow-hidden rounded-[2.1rem]">
          <img src={src} alt={alt} className="block w-full h-auto" style={{ imageRendering: 'auto' }} />
        </div>
      </div>
      {/* Ombre de contact au sol, renforce l'ancrage "objet posé" */}
      <div
        aria-hidden
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-40 h-8 rounded-full bg-hostmate-ink/15 blur-xl"
      />
    </motion.div>
  )
}
