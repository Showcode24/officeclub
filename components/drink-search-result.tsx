"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import type { Drink } from "@/lib/types"

interface DrinkSearchResultProps {
  drink: Drink
  searchTerm: string
  onSelect: (drinkId: string) => void
}

export default function DrinkSearchResult({ drink, searchTerm, onSelect }: DrinkSearchResultProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const highlightMatch = (text: string, term: string) => {
    if (!term.trim()) return text

    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-amber-500/20 text-amber-500">
          {part}
        </span>
      ) : (
        part
      ),
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(drink.id)}
      className="bg-zinc-900/80 backdrop-blur-sm rounded-lg overflow-hidden flex items-center border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer"
    >
      <div className="w-20 h-20 relative flex-shrink-0">
        <Image
          src={drink.image || "/placeholder.svg?height=80&width=80"}
          alt={drink.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      <div className="p-3 flex-1">
        <h4 className="font-medium text-white mb-1">{highlightMatch(drink.name, searchTerm)}</h4>

        <p className="text-zinc-400 text-sm line-clamp-1">{drink.description}</p>

        <div className="flex items-center mt-1">
          <span className="text-xs uppercase tracking-wider text-amber-500/80 font-medium mr-2">{drink.category}</span>

          <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">{formatPrice(drink.price)}</span>
        </div>
      </div>
    </motion.div>
  )
}
