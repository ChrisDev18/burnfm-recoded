'use client'

import styles from './page.module.css'
import buttons from '@/app/styles/buttons.module.css'

import './styles/icons.css';
import Image from "next/image";
import SpotifyIcon from "../../public/Spotify_icon.svg"
import PodcastsIcon from "../../public/Podcasts_icon.svg"
import Link from "next/link";
import React from "react";
import RadioPlayer from "@/app/components/RadioPlayer/RadioPlayer";
import { motion } from 'framer-motion';


export default function Home() {

  const isJavaScriptEnabled = typeof window !== 'undefined'

  return (
    <motion.div className={styles.Root}
                transition={{ duration: 0.2, type: "tween", delay: 0.2}}
                initial={isJavaScriptEnabled? {opacity: 0}: {opacity: 1}}
                animate={{opacity: 1}}>
      <RadioPlayer/>

      <div className={styles.Cards}>
        <div className={styles.CardWrapper}>
          <div className={styles.Card} style={{background: "#32103F"}}>
            <h2>Podcasts</h2>
            <p>
              BurnFM doesn&apos;t just do radio - we also have a large and vibrant community of podcasters.
            </p>
            <a className={buttons.Button} href={"https://open.spotify.com/show/0ALexnN0yS3OX4xdiPetic"}>
              <Image
                src={SpotifyIcon}
                alt={"Spotify icon"}
                height={28}
                width={28}
              />
              Listen on Spotify
            </a>
            <a className={buttons.Button} href={"https://podcasts.apple.com/us/podcast/burn-fm/id1521913304"}>
              <Image
                src={PodcastsIcon}
                alt={"Apple Podcasts icon"}
                height={28}
                width={28}
              />
              Listen on Apple Podcasts
            </a>
          </div>
          <div className={styles.CardIcon}>
            <span className={"material-symbols-rounded notranslate"} style={{color: "#5D1F74"}}>
              podcasts
            </span>
          </div>
        </div>

        <div className={styles.CardWrapper}>
          <div className={styles.Card}>
            <h2>BurnFM on Spotify</h2>
            <p>
              Music and Radio go hand in hand, so we made a Spotify account!
            </p>
            <p>
              Follow us on @theburnfm to listen to our playlists,
              keep up to date with new releases, and listen back to our ball playlists!
            </p>
            <a className={buttons.Button} href={"https://open.spotify.com/user/theburnfm"}>
              <Image
                src={SpotifyIcon}
                alt={"Spotify icon"}
                height={28}
                width={28}
              />
              Go to our Spotify profile
            </a>
          </div>
          <Image
            className={styles.CardIcon}
            src={SpotifyIcon}
            alt={"Spotify icon"}
            height={64}
            width={64}
          />
        </div>

        <div className={styles.CardWrapper}>
          <div className={styles.Card} style={{background: "#32103F"}}>
            <h2>See what’s on</h2>
            <div className={styles.pWrapper}>
              <p>
                Have a particular show in mind? Don&apos;t want to miss your friend on air?
                Check out our schedule to see when all your favourite shows are on.
              </p>
            </div>

            <Link href={`/schedule?day=${new Date().getDay()}`} className={buttons.Button}>
              View Schedule
            </Link>
          </div>
          <div className={styles.CardIcon}>
            <span className={"material-symbols-rounded notranslate"} style={{color: "#32103F"}}>
              overview
            </span>
          </div>
        </div>

        <div className={styles.CardWrapper}>
          <div className={styles.Card} style={{background: '#B751BB'}}>
            <h2>Our team</h2>
            <p>
              Running a radio station is no small feat. See the team who lead our station, as well as the managers of
              our fantastic sections.
            </p>
            <Link href={'/about'} className={buttons.Button}>
              More about us
            </Link>
          </div>

          <div className={styles.CardIcon}>
            <span className={"material-symbols-rounded notranslate"} style={{color: "#B751BB"}}>
              group
            </span>
          </div>

        </div>
      </div>
    </motion.div>
  )
}
