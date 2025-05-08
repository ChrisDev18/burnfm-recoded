"use client"

import {Source_Sans_3} from 'next/font/google'
import './styles/globals.css'

import "@/app/layout.css";
import NavBar from "@/app/components/NavBar/NavBar";
import React, {useEffect, useRef, useState} from "react";
import NextTopLoader from "nextjs-toploader";
import {MediaProvider} from "@/contexts/MediaContext";
import MediaPlayer from "@/app/components/MediaPlayer";

const sourceSans3 = Source_Sans_3({subsets: ['latin'], weight: "variable", variable: "--font-source-sans"});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [lightMode, setLightMode] = useState<boolean>(true)

  // Add listeners to changing light/dark mode
  useEffect(() => {
    if (!window) return;

    const theme = matchMedia('(prefers-color-scheme: light)')
    setLightMode(theme.matches)

    const updateTheme = (evt: MediaQueryListEvent) => setLightMode(evt.matches)

    theme.addEventListener('change', updateTheme);

    return () => theme.removeEventListener('change', updateTheme);
  }, []);

  return (
      <html lang="en" className={sourceSans3.variable}>
      <head>
        <title>Burn FM</title>
        {/*<meta property="og:title" content="Burn FM" key="title" />*/}
        <meta name="description" content="Tune into Burn FM, the University of Birmingham's official radio station."/>

        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-title" content="Burn FM"/>
        <meta name="apple-itunes-app" content="app-id=6476577938"/>

        <link rel="apple-touch-icon" sizes="58x58" href="/icons/apple-58.png"/>
        <link rel="apple-touch-icon" sizes="76x76" href="/icons/apple-76.png"/>
        <link rel="apple-touch-icon" sizes="80x80" href="/icons/apple-80.png"/>
        <link rel="apple-touch-icon" sizes="87x87" href="/icons/apple-87.png"/>
        <link rel="apple-touch-icon" sizes="114x114" href="/icons/apple-114.png"/>
        <link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-120.png"/>
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-152.png"/>
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/apple-167.png"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-180.png"/>

        <link rel="icon" href="/icons/favicon.ico"/>
        <link rel="icon" type="image/svg+xml" href="/icons/favicon.svg"/>

        <meta name="msapplication-TileColor" content="#32103f"/>
        <meta name="theme-color" content={lightMode ? "rgb(255, 255, 255)" : "rgb(20, 20, 20)"}/>
      </head>

      <body>

          {/*<audio ref={audioRef} id={"media"} onError={() => console.error("Error accessing audio")}>*/}
          {/*  <source src={"https://stream.aiir.com/xz12nsvoppluv"} type={"audio/mpeg"}/>*/}
          {/*  The broadcast has stopped, or your browser does not support the audio element.*/}
          {/*</audio>*/}

          <NavBar/>

          <NextTopLoader
              color="#d192f0"
              height={4}
              shadow={"0 0 10px #d192f0,0 0 5px #d192f0"}
              showSpinner={false}
              easing={"ease-in-out"}
              speed={400}
          />

          <MediaProvider>
            <main>
              {children}
            </main>



          <footer>
            <p>Copyright © 2025 Burn FM. All rights reserved.</p>
          </footer>

          <MediaPlayer />
          </MediaProvider>

        </body>
      </html>
  )
}
