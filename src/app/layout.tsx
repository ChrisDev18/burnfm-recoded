import type {Metadata, Viewport} from 'next'
import { Source_Sans_3 } from 'next/font/google'
import './globals.css'

import "@/app/layout.css";
import NavBar from "@/app/NavBar";
import React from "react";


const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BurnFM',
  description: "Tune into BurnFM, University of Birmingham's official radio station.",
  appleWebApp: {title: "BurnFM"},
  itunes: {appId: "1532721548"},
}

let theme_colour = "rgb(20, 20, 20)";

if (typeof window !== "undefined" && window.matchMedia('(prefers-color-scheme: light)')) {
  theme_colour = "rgb(255, 255, 255)";
}

// noinspection JSUnusedGlobalSymbols
export const viewport: Viewport = {
  themeColor: theme_colour,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
      <html lang="en">

      <body className={sourceSans3.className}>
      <NavBar />

      {children}

      <footer>
        <p>Copyright © 2024 Burn FM. All rights reserved.</p>
      </footer>

      </body>
      </html>
  )
}
