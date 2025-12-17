"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Info, X } from "lucide-react"
import type { Drink } from "@/lib/types"
import { preloadImage } from "@/lib/utils/image-preloader"

export default function DrinkCard({
  drink,
  index,
  isSelected = false,
}: {
  drink: Drink
  index: number
  isSelected?: boolean
}) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isSelected && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
      const element = cardRef.current
      element.classList.add("ring-4", "ring-amber-500", "ring-opacity-70", "scale-105")
      const timer = setTimeout(() => {
        element.classList.remove("ring-4", "ring-amber-500", "ring-opacity-70", "scale-105")
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isSelected])

  useEffect(() => {
    if (inView && drink.image) {
      preloadImage(drink.image)
        .then(() => setIsImageLoaded(true))
        .catch(() => setIsImageLoaded(true))
    }
  }, [inView, drink.image])

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <>
      <motion.div
        ref={(node) => {
          if (node) {
            cardRef.current = node
            ref(node)
          }
        }}
        custom={index}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={variants}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsDetailsOpen(true)}
        className={`drink-card bg-zinc-900/80 backdrop-blur-sm rounded-2xl overflow-hidden h-full flex flex-col shadow-lg border border-zinc-800 active:shadow-inner transition-all duration-300 ${
          isSelected ? "z-10 scale-[1.02] transition-all duration-500" : ""
        }`}
        id={`drink-${drink.id}`}
      >
        <div className="relative h-48 sm:h-56 bg-gradient-to-b from-amber-900/20 to-black/40">
          {inView && (
            <Image
              src={drink.image || "/placeholder.svg?height=400&width=600"}
              alt={drink.name}
              fill
              className={`object-cover transition-opacity duration-500 ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 6}
              onLoad={() => setIsImageLoaded(true)}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>

          <div className="absolute top-3 right-3 bg-amber-500 text-black font-bold px-3 py-1 rounded-full text-sm">
            {formatPrice(drink.price)}
          </div>

          {drink.popular && (
            <div className="absolute top-3 left-3 bg-zinc-900/80 text-amber-500 font-medium px-3 py-1 rounded-full text-xs backdrop-blur-sm border border-zinc-800">
              Popular
            </div>
          )}
        </div>

        <div className="p-4 flex-grow flex flex-col">
          <h3 className="text-lg font-bold mb-1 text-white">{drink.name}</h3>
          <p className="text-zinc-400 text-sm line-clamp-2 mb-3">{drink.description}</p>

          <div className="mt-auto flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-amber-500/80 font-medium">{drink.category}</span>

            <button className="text-zinc-400 hover:text-amber-500 transition-colors" aria-label="View details">
              <Info size={18} />
            </button>
          </div>
        </div>
      </motion.div>

      {isDetailsOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-zinc-900 rounded-2xl overflow-hidden relative">
            <button
              onClick={() => setIsDetailsOpen(false)}
              className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full"
              aria-label="Close details"
            >
              <X size={20} />
            </button>

            <div className="relative h-64">
              <Image
                src={drink.image || "/placeholder.svg?height=400&width=600"}
                alt={drink.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent"></div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-white">{drink.name}</h2>
                <span className="bg-amber-500 text-black font-bold px-3 py-1 rounded-full text-sm">
                  {formatPrice(drink.price)}
                </span>
              </div>

              <p className="text-zinc-300 mb-6">{drink.description}</p>

              {drink.ingredients && (
                <div className="mb-6">
                  <h3 className="text-sm uppercase tracking-wider text-zinc-500 font-medium mb-2">Ingredients</h3>
                  <ul className="space-y-1">
                    {drink.ingredients.map((ingredient, i) => (
                      <li key={i} className="text-zinc-300 text-sm flex items-center">
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></span>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {drink.tags && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {drink.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <button
                onClick={() => setIsDetailsOpen(false)}
                className="w-full py-3 bg-amber-500 text-black font-medium rounded-lg hover:bg-amber-400 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
