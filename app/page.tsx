"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import MobileNav from "@/components/mobile-nav"
import Hero from "@/components/hero"
import MenuSection from "@/components/menu-section"
import Footer from "@/components/footer"
import OnboardingTour from "@/components/onboarding-tour"
import SearchOverlay from "@/components/search-overlay"
import LoadingScreen from "@/components/loading-screen"
import SectionIndicator from "@/components/section-indicator"
import { drinks, categoryDisplayNames } from "@/lib/data"
import type { DrinkCategory, Section } from "@/lib/types"
import { getActiveSection, filterMenuBySection, getCategoriesForSection } from "@/lib/utils/section-helpers"

function HomeContent() {
  const searchParams = useSearchParams()
  const section: Section = getActiveSection(searchParams?.toString() || "")

  const [selectedCategory, setSelectedCategory] = useState<DrinkCategory | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const sectionDrinks = filterMenuBySection(drinks, section)

  const availableCategories = getCategoriesForSection(drinks, section)
  const categories: DrinkCategory[] = availableCategories as DrinkCategory[]

  useEffect(() => {
    if (!selectedCategory && categories.length > 0) {
      setSelectedCategory(categories[0])
    }
  }, [categories, selectedCategory])

  const filteredDrinks = selectedCategory ? sectionDrinks.filter((d) => d.category === selectedCategory) : []

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory(categories[0])
    }
  }, [section])

  const handleOpenSearch = () => {
    setIsSearchOpen(true)
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  const sectionClassName = section === "office" ? "section-office" : "section-club"

  return (
    <main className={`min-h-screen bg-black text-white ${sectionClassName}`}>
      <MobileNav
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onOpenSearch={handleOpenSearch}
        categoryDisplayNames={categoryDisplayNames}
      />

      <SectionIndicator section={section} />

      <Hero section={section} />

      <div className="container mx-auto px-4">
        <MenuSection drinks={filteredDrinks} section={section} />
      </div>

      <Footer />

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} section={section} />

      <OnboardingTour />
    </main>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <HomeContent />
    </Suspense>
  )
}
