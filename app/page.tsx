"use client"

import { useState } from "react"
import Hero from "@/components/hero"
import CategorySelector from "@/components/category-selector"
import MobileNav from "@/components/mobile-nav"
import MenuSection from "@/components/menu-section"
import { drinks, categoryDisplayNames } from "@/lib/data"
import type { Section, DrinkCategory } from "@/lib/types"

export default function Page() {
  const [section] = useState<Section>("office")
  const [selectedCategory, setSelectedCategory] = useState<DrinkCategory | null>(null)
  const [isCategorySelectorOpen, setIsCategorySelectorOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const categories = Object.keys(categoryDisplayNames) as DrinkCategory[]

  // Filter drinks by section and optionally by category
  const filteredDrinks = drinks.filter((drink) => {
    if (!drink.availableIn.includes(section)) return false
    if (selectedCategory && drink.category !== selectedCategory) return false
    return true
  })

  const handleOpenCategorySelector = () => {
    setIsCategorySelectorOpen(true)
  }

  const handleSelectCategory = (category: DrinkCategory) => {
    setSelectedCategory(category)
    // Scroll to menu section after a short delay
    setTimeout(() => {
      document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })
    }, 300)
  }

  const handleOpenSearch = () => {
    setIsSearchOpen(true)
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="pt-32 sm:pt-0">
        <MobileNav
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onOpenSearch={handleOpenSearch}
          categoryDisplayNames={categoryDisplayNames}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />

        <Hero section={section} onOpenCategorySelector={handleOpenCategorySelector} />
      </div>

      <CategorySelector
        isOpen={isCategorySelectorOpen}
        onClose={() => setIsCategorySelectorOpen(false)}
        categories={categories}
        onSelectCategory={handleSelectCategory}
        categoryDisplayNames={categoryDisplayNames}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <MenuSection drinks={filteredDrinks} section={section} />
      </div>
    </main>
  )
}
