import type React from "react"
import type { Metadata } from "next"
import { Orbitron, Space_Mono } from "next/font/google"
import  { Analytics } from "@vercel/analytics/react"
import "./globals.css"

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700", "900"] })
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] })

export const metadata: Metadata = {
  title: "時間機械 | Time Machine - Mood Board",
  description: "A retro-futuristic mood time machine from the year 2000",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${orbitron.className} bg-black text-white overflow-hidden antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
