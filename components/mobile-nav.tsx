"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Search, ChevronDown } from "lucide-react"
import type { DrinkCategory } from "@/lib/types"
import { drinks } from "@/lib/data"
import Image from "next/image"

interface MobileNavProps {
  categories: DrinkCategory[]
  selectedCategory: DrinkCategory | null
  setSelectedCategory: (category: DrinkCategory) => void
  onOpenSearch: () => void
  categoryDisplayNames: Record<string, string>
  isMenuOpen: boolean
  setIsMenuOpen: (open: boolean) => void
}

export default function MobileNav({
  categories,
  selectedCategory,
  setSelectedCategory,
  onOpenSearch,
  categoryDisplayNames,
  isMenuOpen,
  setIsMenuOpen,
}: MobileNavProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleCategorySelect = (category: DrinkCategory) => {
    setSelectedCategory(category)
    setIsMenuOpen(false)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? "bg-black/90 backdrop-blur-md shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between py-2 sm:py-0 sm:h-16 gap-1 sm:gap-4">
            {/* Styling the brand tagline to be white, smaller, and cleaner for better UI/UX */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm lg:text-base font-medium tracking-[0.15em] uppercase text-center sm:text-left whitespace-nowrap order-1 sm:order-1"
            >
              <span className="text-amber-500">FOURWINDS LAGOS</span>
              <span className="text-white/60"> | GRILL HOUSE | SPORT BAR | NIGHT CLUB</span>
            </motion.h1>

            <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0 order-2 sm:order-2">
              <div className="relative w-28 h-20 xs:w-32 xs:h-32 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
                <Image src="/images/fourwinds logo.png" alt="FOURWINDS Logo" fill className="object-contain" priority />
              </div>
              <button
                onClick={onOpenSearch}
                className="search-bar p-2 text-zinc-400 hover:text-amber-500 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </button>
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 text-zinc-400 hover:text-amber-500 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6 sm:w-6 sm:h-6 md:w-7 md:h-7" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed top-24 sm:top-16 left-0 right-0 z-30 transition-all duration-300 ${
          isScrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        } bg-gradient-to-b from-zinc-900 to-zinc-900/95 backdrop-blur-lg shadow-lg border-b border-amber-500/20`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Selected category indicator on desktop */}
            <div className="hidden lg:flex items-center space-x-2">
              <span className="text-xs uppercase tracking-wider text-zinc-500 font-medium">Browsing:</span>
              <span className="text-amber-500 font-semibold text-sm">
                {selectedCategory ? categoryDisplayNames[selectedCategory] : "All Categories"}
              </span>
            </div>

            {/* Category menu */}
            <div className="category-menu flex-1 flex overflow-x-auto scrollbar-hide gap-2 pb-1 -mb-1">
              {/* <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-all flex-shrink-0 ${
                  selectedCategory === null
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-lg shadow-amber-500/30"
                    : "bg-zinc-800/80 text-zinc-400 hover:bg-zinc-700 hover:text-amber-500"
                }`}
              >
                <span>All</span>
              </button> */}
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-all flex-shrink-0 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-lg shadow-amber-500/30"
                      : "bg-zinc-800/80 text-zinc-400 hover:bg-zinc-700 hover:text-amber-500"
                  }`}
                >
                  {categoryDisplayNames[category] || category}
                </button>
              ))}
            </div>

            {/* View all categories button on desktop */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="hidden lg:flex items-center space-x-1 px-4 py-2 rounded-lg bg-zinc-800/80 text-zinc-400 hover:bg-zinc-700 hover:text-amber-500 transition-all text-sm font-medium"
            >
              <span>View All</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md"
          >
            <div className="container mx-auto px-4 py-8 h-full flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-amber-500">Menu</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-zinc-400 hover:text-amber-500 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm uppercase tracking-wider text-zinc-500 font-medium">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => handleCategorySelect(category)}
                          className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                            selectedCategory === category
                              ? "bg-amber-500/20 text-amber-500 font-medium"
                              : "text-white hover:bg-zinc-800"
                          }`}
                        >
                          {categoryDisplayNames[category] || category}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm uppercase tracking-wider text-zinc-500 font-medium">Popular Drinks</h3>
                    <div className="space-y-2">
                      {drinks
                        .filter((drink) => drink.popular)
                        .slice(0, 5)
                        .map((drink) => (
                          <button
                            key={drink.id}
                            onClick={() => setIsMenuOpen(false)}
                            className="block w-full text-left px-4 py-3 rounded-lg text-white hover:bg-zinc-800 transition-colors"
                          >
                            {drink.name}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-zinc-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-zinc-400">Open today</p>
                    <p className="text-white font-medium">6:00 PM - 2:00 AM</p>
                  </div>
                  <a href="tel:+15551234567" className="px-4 py-2 bg-amber-500 text-black rounded-lg font-medium">
                    Call Us
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
