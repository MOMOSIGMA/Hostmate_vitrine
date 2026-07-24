import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

// Révélation au scroll — anciennement un simple fade+slide en CSS pur ;
// passé à framer-motion pour un mouvement plus riche (léger flou qui se
// dissipe + montée douce), tout en gardant la même API (children, delay,
// className) pour ne pas casser les appels existants dans HomePage.
export default function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
