"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Instagram, Facebook, Twitter } from "lucide-react"

export default function Footer() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <footer ref={ref} className="bg-zinc-950 py-12 border-t border-zinc-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-8"
        >
          <h2 className="text-2xl font-bold text-amber-500 mb-2">FOURWINDS LAGOS | GRILL HOUSE | SPORT BAR | NIGHT CLUB</h2>
          <p className="text-zinc-400">Premium Cocktail Experience</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center space-x-6 mb-8"
        >
          <a href="#" className="text-zinc-400 hover:text-amber-500 transition-colors">
            <Instagram size={20} />
            <span className="sr-only">Instagram</span>
          </a>
          <a href="#" className="text-zinc-400 hover:text-amber-500 transition-colors">
            <Facebook size={20} />
            <span className="sr-only">Facebook</span>
          </a>
          <a href="#" className="text-zinc-400 hover:text-amber-500 transition-colors">
            <Twitter size={20} />
            <span className="sr-only">Twitter</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-8"
        >
          <p className="text-zinc-300 mb-1">10A Adetokunbo Ademola Street, Victoria Island, Lagos</p>
          <p className="text-zinc-400 mb-2">Open 6PM - 2AM</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-zinc-500 text-sm border-t border-zinc-900 pt-8"
        >
          <p>© {new Date().getFullYear()} FOURWINDS LAGOS | GRILL HOUSE | SPORT BAR | NIGHT CLUB. All rights reserved.</p>
          <p className="mt-2 text-xs">Please drink responsibly.</p>
        </motion.div>
      </div>
    </footer>
  )
}
