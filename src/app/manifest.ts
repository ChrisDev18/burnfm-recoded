import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Burn FM',
    short_name: 'Burn FM',
    description: 'Tune into Burn FM, the University of Birmingham\'s official radio station.',
    start_url: '../',
    display: 'standalone',
    theme_color: "#5d1f74",
    background_color: "#5d1f74",
    orientation: 'portrait',
    icons: [
      {
        // Android maskable icon
        src: "/icons/android-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg",
      },
      {
        src: "/icons/apple-1024.png",
        sizes: "1024x1024",
        type: "image/png",
      },
      {
        src: "/icons/apple-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/apple-256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/icons/apple-128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: "/icons/apple-64.png",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "/icons/apple-32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/icons/apple-16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
  }
}

