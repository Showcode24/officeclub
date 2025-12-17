"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, Clock, Trash2, Loader2 } from "lucide-react"
import { useSearch } from "@/lib/hooks/use-search"
import DrinkSearchResult from "./drink-search-result"
import type { Section } from "@/lib/types"

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
  onDrinkSelect?: (drinkId: string) => void
  section: Section // Added section prop to filter search results
}

export default function SearchOverlay({ isOpen, onClose, onDrinkSelect, section }: SearchOverlayProps) {
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isLoading,
    recentSearches,
    addToRecentSearches,
    clearRecentSearches,
    popularSearchTerms,
  } = useSearch(section) // Pass section to search hook

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      addToRecentSearches(searchQuery)
    }
  }

  const handleSearchTermClick = (term: string) => {
    setSearchQuery(term)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleDrinkSelect = (drinkId: string) => {
    if (onDrinkSelect) {
      onDrinkSelect(drinkId)
    }
    addToRecentSearches(searchQuery)
    onClose()
  }

  const accentColor = section === "office" ? "text-amber-500" : "text-purple-500"
  const ringColor = section === "office" ? "focus:ring-amber-500" : "focus:ring-purple-500"

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md pt-16 overflow-hidden"
        >
          <div className="h-full flex flex-col">
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-xl font-bold ${accentColor}`}>Search</h2>
                <button
                  onClick={onClose}
                  className={`p-2 text-zinc-400 hover:${accentColor} transition-colors`}
                  aria-label="Close search"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search for drinks, ingredients, or categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 pr-10 text-white focus:outline-none focus:ring-2 ${ringColor}`}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400">
                    {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
                  </div>
                </div>
              </form>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="container mx-auto px-4 pb-6">
                {searchQuery.trim() === "" ? (
                  <>
                    {recentSearches.length > 0 && (
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm uppercase tracking-wider text-zinc-500 font-medium flex items-center">
                            <Clock size={14} className="mr-1" /> Recent searches
                          </h3>
                          <button
                            onClick={clearRecentSearches}
                            className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center"
                          >
                            <Trash2 size={12} className="mr-1" /> Clear
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map((term) => (
                            <button
                              key={term}
                              onClick={() => handleSearchTermClick(term)}
                              className="px-3 py-1.5 bg-zinc-800 rounded-full text-sm text-zinc-300 hover:bg-zinc-700 transition-colors flex items-center"
                            >
                              <Clock size={12} className="mr-1 opacity-70" /> {term}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="text-sm uppercase tracking-wider text-zinc-500 font-medium mb-2">
                        Popular searches
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {popularSearchTerms.map((term) => (
                          <button
                            key={term}
                            onClick={() => handleSearchTermClick(term)}
                            className="px-3 py-1.5 bg-zinc-800 rounded-full text-sm text-zinc-300 hover:bg-zinc-700 transition-colors"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    {isLoading ? (
                      <div className="flex justify-center py-12">
                        <Loader2 size={24} className={`animate-spin ${accentColor}`} />
                      </div>
                    ) : searchResults.length > 0 ? (
                      <>
                        <h3 className="text-sm uppercase tracking-wider text-zinc-500 font-medium mb-4">
                          {searchResults.length} {searchResults.length === 1 ? "result" : "results"} for "{searchQuery}"
                        </h3>
                        <div className="space-y-4">
                          {searchResults.map((drink) => (
                            <DrinkSearchResult
                              key={drink.id}
                              drink={drink}
                              searchTerm={searchQuery}
                              onSelect={handleDrinkSelect}
                            />
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-zinc-400 mb-2">No results found for "{searchQuery}"</p>
                        <p className="text-zinc-500 text-sm">Try a different search term or browse our categories</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
