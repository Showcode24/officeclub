"use client"

import { useState, useEffect, useMemo } from "react"
import { drinks } from "@/lib/data"
import { filterMenuBySection } from "@/lib/utils/section-helpers"
import type { Section } from "@/lib/types"

export function useSearch(section?: Section) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("recentSearches")
    if (stored) {
      setRecentSearches(JSON.parse(stored))
    }
  }, [])

  const sectionDrinks = useMemo(() => {
    return section ? filterMenuBySection(drinks, section) : drinks
  }, [section])

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []

    setIsLoading(true)
    const query = searchQuery.toLowerCase()

    const results = sectionDrinks.filter((drink) => {
      return (
        drink.name.toLowerCase().includes(query) ||
        drink.description.toLowerCase().includes(query) ||
        drink.category.toLowerCase().includes(query) ||
        drink.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
        drink.ingredients?.some((ing) => ing.toLowerCase().includes(query))
      )
    })

    setTimeout(() => setIsLoading(false), 300)
    return results
  }, [searchQuery, sectionDrinks])

  const addToRecentSearches = (term: string) => {
    if (!term.trim()) return

    const updated = [term, ...recentSearches.filter((t) => t !== term)].slice(0, 5)
    setRecentSearches(updated)
    localStorage.setItem("recentSearches", JSON.stringify(updated))
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem("recentSearches")
  }

  const popularSearchTerms = ["Guinness", "Mojito", "Hennessy", "Cocktails", "Non-alcoholic"]

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isLoading,
    recentSearches,
    addToRecentSearches,
    clearRecentSearches,
    popularSearchTerms,
  }
}
