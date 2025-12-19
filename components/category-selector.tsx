"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import type { DrinkCategory } from "@/lib/types"

interface CategorySelectorProps {
  isOpen: boolean
  onClose: () => void
  categories: DrinkCategory[]
  onSelectCategory: (category: DrinkCategory) => void
  categoryDisplayNames: Record<string, string>
}

export default function CategorySelector({
  isOpen,
  onClose,
  categories,
  onSelectCategory,
  categoryDisplayNames,
}: CategorySelectorProps) {
  const handleCategoryClick = (category: DrinkCategory) => {
    onSelectCategory(category)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 overflow-hidden"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            className="w-full max-w-3xl bg-zinc-900 rounded-3xl overflow-hidden relative max-h-[85vh] shadow-2xl shadow-amber-500/10 border border-zinc-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-900/95 px-8 py-6 flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-amber-500 tracking-tight">Browse Menu</h2>
                <p className="text-sm text-zinc-400 mt-1">Select a category to explore</p>
              </div>
              <button
                onClick={onClose}
                className="p-2.5 text-zinc-400 hover:text-amber-500 transition-colors rounded-xl hover:bg-zinc-800/80"
                aria-label="Close category selector"
              >
                <X size={24} />
              </button>
            </div>

            <div className="px-8 py-6 overflow-y-auto" style={{ maxHeight: "calc(85vh - 180px)" }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {categories.map((category, index) => (
                  <motion.button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="group relative p-5 rounded-2xl bg-gradient-to-br from-zinc-800/60 to-zinc-800/30 hover:from-amber-500/20 hover:to-amber-600/10 border border-zinc-700/50 hover:border-amber-500/50 transition-all text-left shadow-lg hover:shadow-amber-500/20"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-base font-semibold text-white group-hover:text-amber-500 transition-colors leading-tight">
                        {categoryDisplayNames[category] || category}
                      </span>
                      <div className="w-2 h-2 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg shadow-amber-500/50" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="sticky bottom-0 bg-gradient-to-t from-zinc-900 via-zinc-900 to-zinc-900/95 px-8 py-5">
              <p className="text-sm text-zinc-500 text-center font-medium">Tap any category to view available items</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
