import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

// ─── Carte QR code — 100% code, aucune photo externe ───────────────────────
// Reconstruit en HTML/CSS le concept "plaque QR code au mur" au lieu
// d'utiliser une photo composite générée — c'est le pattern Stripe : les
// éléments visuels de la page sont de vrais éléments d'interface, pas des
// images externes qui se détachent du reste. Le motif QR est un vrai
// quadrillage figé (pas aléatoire à chaque rendu), avec les 3 marqueurs de
// coin typiques d'un QR code pour qu'il se lise immédiatement comme tel.

// Motif 21×21 fixe (grille type QR) — décoratif, pas un vrai code scannable.
const SIZE = 21
function buildPattern(): boolean[][] {
  const grid: boolean[][] = Array.from({ length: SIZE }, () => Array(SIZE).fill(false))
  // Pseudo-motif déterministe (pas Math.random — doit rendre pareil à chaque fois).
  let seed = 42
  const next = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      grid[y][x] = next() > 0.56
    }
  }
  // 3 marqueurs de coin (motif carré emboîté, comme un vrai QR code).
  const marker = (ox: number, oy: number) => {
    for (let y = 0; y < 7; y++) {
      for (let x = 0; x < 7; x++) {
        const border = x === 0 || x === 6 || y === 0 || y === 6
        const inner = x >= 2 && x <= 4 && y >= 2 && y <= 4
        grid[oy + y][ox + x] = border || inner
      }
    }
  }
  marker(0, 0)
  marker(SIZE - 7, 0)
  marker(0, SIZE - 7)
  return grid
}

const PATTERN = buildPattern()

const QR_CAPTION: Record<'fr' | 'en' | 'es' | 'it', string> = {
  fr: 'Scannez pour accéder à votre guide',
  en: 'Scan to access your guide',
  es: 'Escanea para acceder a tu manual',
  it: 'Scansiona per accedere alla tua guida',
}

export default function QRCard({ lang }: { lang: 'fr' | 'en' | 'es' | 'it' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, rotate: -1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
      whileHover={{ rotate: 0, scale: 1.02 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-[14rem] rounded-2xl border border-hostmate-ink/10 bg-white p-5 shadow-[0_24px_50px_-20px_rgba(28,28,46,0.3)]"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-md bg-hostmate-primary flex items-center justify-center">
          <CheckCircle2 size={14} className="text-white" />
        </div>
        <span className="text-xs font-semibold text-hostmate-ink">HostMate AI</span>
      </div>

      <div
        className="grid gap-[1px] bg-hostmate-ink rounded-lg p-2.5"
        style={{ gridTemplateColumns: `repeat(${SIZE}, 1fr)` }}
      >
        {PATTERN.flatMap((row, y) =>
          row.map((filled, x) => (
            <div
              key={`${x}-${y}`}
              className={filled ? 'bg-hostmate-ink' : 'bg-white'}
              style={{ aspectRatio: '1 / 1' }}
            />
          )),
        )}
      </div>

      <p className="mt-4 text-[11px] text-center text-hostmate-textGrey leading-snug">
        {QR_CAPTION[lang]}
      </p>
    </motion.div>
  )
}
