export type Section = "office" | "club"

/**
 * Extracts the section from URL search params
 * @param searchParams - URL search params
 * @returns "office" or "club", defaults to "office" if invalid/missing
 */
export function getActiveSection(searchParams: URLSearchParams | string): Section {
  const params = typeof searchParams === "string" ? new URLSearchParams(searchParams) : searchParams
  const section = params.get("section")?.toLowerCase()

  if (section === "club") return "club"
  return "office" // default to office
}

/**
 * Filters menu items by section
 * @param items - Array of items with availableIn property
 * @param section - The active section
 * @returns Filtered items available in the specified section
 */
export function filterMenuBySection<T extends { availableIn: Section[] }>(items: T[], section: Section): T[] {
  return items.filter((item) => item.availableIn.includes(section))
}

/**
 * Gets all unique categories available in a section
 * @param items - Array of items with category and availableIn properties
 * @param section - The active section
 * @returns Array of unique category names
 */
export function getCategoriesForSection<T extends { category: string; availableIn: Section[] }>(
  items: T[],
  section: Section,
): string[] {
  const categories = new Set<string>()
  items.forEach((item) => {
    if (item.availableIn.includes(section)) {
      categories.add(item.category)
    }
  })
  return Array.from(categories)
}
