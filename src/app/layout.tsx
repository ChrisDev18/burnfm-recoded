import type {Metadata, Viewport} from 'next'
import { Source_Sans_3 } from 'next/font/google'
import './globals.css'

import "@/app/layout.css";
import NavBar from "@/app/ui/NavBar";
import React from "react";


const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BurnFM',
  description: "Tune into BurnFM, University of Birmingham's official radio station.",
  appleWebApp: {title: "BurnFM"},
  itunes: {appId: "6476577938"},

  // These don't seem to work right now, but will keep as it is useful
  // icons: [
  //   {rel: "icon", type: "image/png", url: "/app-icons/favicon-32x32.png?v=2"},
  //   {rel: "icon", type: "image/png", url: "/app-icons/favicon-16x16.png?v=2"},
  //   {rel: "mask-icon", type: "image/png", url: "/app-icons/safari-pinned-tab.svg?v=2", color:"#32103f"},
  //   {rel: "shortcut icon", url: "/app-icons/favicon.ico?v=2"},
  //   {rel: "manifest", url: "/app-icons/site.webmanifest?v=2"},
  //   {rel: "apple-icon", sizes: "60x60", url: "/app-icons/apple-touch-icon-60x60.png?v=3"},
  //   {rel: "apple-icon", sizes: "76x76", url: "/app-icons/apple-touch-icon-76x76.png?v=3"},
  //   {rel: "apple-icon", sizes: "120x120", url: "/app-icons/apple-touch-icon-120x120.png?v=3"},
  //   {rel: "apple-icon", sizes: "152x152", url: "/app-icons/apple-touch-icon-152x152.png?v=3"},
  //   {rel: "apple-icon", sizes: "180x180", url: "/app-icons/apple-touch-icon-180x180.png?v=2"},
  // ]
    // <link rel="apple-touch-icon" sizes="60x60" href="/app-icons/apple-touch-icon-60x60.png?v=2"/>
    // <link rel="apple-touch-icon" sizes="76x76" href="/app-icons/apple-touch-icon-76x76.png?v=2"/>
    // <link rel="apple-touch-icon" sizes="120x120" href="/app-icons/apple-touch-icon-120x120.png?v=2"/>
    // <link rel="apple-touch-icon" sizes="152x152" href="/app-icons/apple-touch-icon-152x152.png?v=2"/>
    // <link rel="apple-touch-icon" sizes="180x180" href="/app-icons/apple-touch-icon-180x180.png?v=2"/>
    // <link rel="icon" type="image/png" sizes="32x32" href="/app-icons/favicon-32x32.png?v=2"/>
    // <link rel="icon" type="image/png" sizes="16x16" href="/app-icons/favicon-16x16.png?v=2"/>
    // <link rel="manifest" href="/app-icons/site.webmanifest?v=2"/>
    // <link rel="mask-icon" href="/app-icons/safari-pinned-tab.svg?v=2" color="#32103f"/>
    // <link rel="shortcut icon" href="/app-icons/favicon.ico?v=2"/>
    // <meta name="msapplication-TileColor" content="#32103f"/>
    // <meta name="theme-color" content="#5d1f74"/>
}

let theme_colour = "rgb(20, 20, 20)";

// if (matchMedia('(prefers-color-scheme: light)').matches) {
//   theme_colour = "rgb(255, 255, 255)";
// }

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
      <NavBar/>

      {children}

      <footer>
        <p>Copyright © 2024 Burn FM. All rights reserved.</p>
      </footer>

      </body>
      </html>
  )
}
