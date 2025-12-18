import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FOURWINDS LAGOS | GRILL HOUSE | SPORT BAR | NIGHT CLUB - Premium Cocktail Experience",
  description: "Calm and cozy bar with premium drinks and exclusive membership",
  generator: "byte technologies",
  icons: {
    icon: [
      {
        url: "/image/fourwinds logo.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/image/fourwinds logo.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/image/fourwinds logo.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/image/fourwinds logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
