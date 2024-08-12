"use client"

import {Source_Sans_3} from 'next/font/google'
import './styles/globals.css'

import "@/app/layout.css";
import NavBar from "@/app/components/NavBar/NavBar";
import React, {useEffect, useRef, useState} from "react";
import {AudioContext} from "@/app/contexts/AudioContext";

const sourceSans3 = Source_Sans_3({subsets: ['latin'], weight: "variable"});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Define audio reference (used to directly control the audio element)
  const audioRef = useRef<HTMLAudioElement|null>(null);
  const [audioRefState, setAudioRefState] =
      useState<HTMLAudioElement|null>(null);

  const [lightMode, setLightMode] = useState<boolean>(true)

  useEffect(() => {
    if (!audioRef.current) return
    setAudioRefState(audioRef.current)
  }, []);

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
      <html lang="en" className={sourceSans3.className}>
        <head>
          <title>BurnFM</title>
          <meta name="description" content="Tune into BurnFM, the University of Birmingham's official radio station."/>
          <meta name="apple-mobile-web-app-title" content="BurnFM"/>
          <meta name="apple-itunes-app" content="app-id=6476577938"/>

          <link rel="apple-touch-icon" sizes="60x60" href="/icons/apple-icon1.png"/>
          <link rel="apple-touch-icon" sizes="76x76" href="/icons/apple-icon2.png"/>
          <link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-icon3.png"/>
          <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-icon4.png"/>
          <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-icon5.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon2.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon1.png"/>
          <link rel="manifest" href="/icons/site.webmanifest"/>
          <link rel="mask-icon" href="/icons/icon.svg" color="#32103f"/>

          <meta name="msapplication-TileColor" content="#32103f"/>
          <meta name="theme-color" content={lightMode? "rgb(255, 255, 255)" : "rgb(20, 20, 20)"}/>
        </head>

        <body>

          <audio ref={audioRef} id={"media"} onError={() => console.error("Error accessing audio")}>
            <source src={"https://streaming.broadcastradio.com:8572/burnfm"} type={"audio/mp3"}/>
            The broadcast has stopped, or your browser does not support the audio element.
          </audio>

          <NavBar/>

          <AudioContext.Provider value={audioRefState}>
            <main>
              {children}
            </main>
          </AudioContext.Provider>
          <footer>
            <p>Copyright © 2024 Burn FM. All rights reserved.</p>
          </footer>

        </body>
      </html>
  )
}
