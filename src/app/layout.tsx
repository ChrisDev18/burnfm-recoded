import {Source_Sans_3} from 'next/font/google'
import './styles/globals.css'

import "@/app/layout.css";
import NavBar from "@/app/components/NavBar/NavBar";
import React from "react";
import NextTopLoader from "nextjs-toploader";
import {MediaProvider} from "@/contexts/MediaContext";
import MediaPlayer from "@/app/components/MediaPlayer";
import {Metadata} from "next";

const sourceSans3 = Source_Sans_3({subsets: ['latin'], weight: "variable", variable: "--font-source-sans"});

export const metadata: Metadata = {
  title: 'Burn FM',
  description: 'Tune into Burn FM, the University of Birmingham\'s official radio station.',
  appleWebApp: {
    capable: true,
    title: "Burn FM",
  },
  itunes: {
    appId: "6476577938",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const [lightMode, setLightMode] = useState<boolean>(true)
  //
  // // Add listeners to changing light/dark mode
  // useEffect(() => {
  //   if (!window) return;
  //
  //   const theme = matchMedia('(prefers-color-scheme: light)')
  //   setLightMode(theme.matches)
  //
  //   const updateTheme = (evt: MediaQueryListEvent) => setLightMode(evt.matches)
  //
  //   theme.addEventListener('change', updateTheme);
  //
  //   return () => theme.removeEventListener('change', updateTheme);
  // }, []);

  return (
      <html lang="en" className={sourceSans3.variable}>
        <body>

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
