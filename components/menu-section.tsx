"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import DrinkCard from "./drink-card"
import type { Drink, Section } from "@/lib/types"

export default function MenuSection({ drinks, section }: { drinks: Drink[]; section: Section }) {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 })

  const titleColor = "text-amber-400"

  return (
    <section id="menu" ref={ref} className="py-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className={`text-3xl md:text-4xl font-bold mb-12 text-center ${titleColor}`}
      >
        Our Menu
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {drinks.map((drink, index) => (
          <motion.div
            key={drink.id}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          >
            <DrinkCard drink={drink} index={index} />
          </motion.div>
        ))}
      </div>

      {drinks.length === 0 && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-zinc-400 py-12">
          No items found in this category for this section.
        </motion.p>
      )}
    </section>
  )
}
