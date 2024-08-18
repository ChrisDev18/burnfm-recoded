'use client'

import styles from './page.module.css'
import buttons from '@/app/styles/buttons.module.css'

import './styles/icons.css';
import Image from "next/image";
import SpotifyIcon from "../../public/Spotify_icon.svg"
import InstagramIcon from "../../public/Instagram_icon.png"
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
            <h2>BurnFM on Instagram</h2>
            <p>
              Socials, signup sheets, and info about our new committee - it&apos;ll all be there on Instagram. Follow us
              so that you don&apos;t miss anything!
            </p>

            <div className={styles.cardButtons}>
              <Link className={buttons.Button} href={"https://www.instagram.com/burn_fm/"}>
                <Image
                    src={InstagramIcon}
                    alt={"Instagram icon"}
                    height={28}
                    width={28}
                />
                Visit our Instagram
              </Link>
            </div>
          </div>

          <Image
              className={styles.CardIcon}
              src={InstagramIcon}
              alt={"Instagram icon"}
              height={64}
              width={64}
          />
        </div>

        <div className={styles.CardWrapper}>
          <div className={styles.Card} style={{background: "#5D1F74"}}>
            <h2>Interested in joining?</h2>
            <p>
              We are UoB&apos;s official radio station. If you are interested in radio or podcasting (no matter your
              experience... seriously), this is the society for you!
              {/*Many of our members are newbies to radio and podcasting, so don&apos;t feel you need to be an expert in*/}
              {/*anything.*/}
            </p>
            <p>
              If you are looking at new societies to join during the coming year at UoB, please come see us at the societies
              fair on <u>Friday 27th September 2024</u>.
            </p>
          </div>

          <div className={styles.CardIcon}>
            <span className={"material-symbols-rounded notranslate"} style={{color: "#5D1F74"}}>
              waving_hand
            </span>
          </div>
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

            <div className={styles.cardButtons}>
              <Link href={`/schedule?day=${new Date().getDay()}`} className={buttons.Button}>
                View Schedule
              </Link>
            </div>
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

        <div className={styles.CardWrapper}>
          <div className={styles.Card} style={{background: '#5D1F74'}}>
            <h2>Burn Podcasts</h2>
            <p>
              BurnFM doesn&apos;t just do radio - we also have a large and vibrant community of podcasters.
            </p>

            {/*<div className={styles.cardButtons}>*/}
              <Link className={buttons.Button} href={"https://open.spotify.com/show/0ALexnN0yS3OX4xdiPetic"}>
                <Image
                    src={SpotifyIcon}
                    alt={"Spotify icon"}
                    height={28}
                    width={28}
                />
                Listen on Spotify
              </Link>
              <Link className={buttons.Button} href={"https://podcasts.apple.com/us/podcast/burn-fm/id1521913304"}>
                <Image
                    src={PodcastsIcon}
                    alt={"Apple Podcasts icon"}
                    height={28}
                    width={28}
                />
                Listen on Apple Podcasts
              </Link>
            {/*</div>*/}
          </div>
          <div className={styles.CardIcon}>
            <span className={"material-symbols-rounded notranslate"} style={{color: "#5D1F74"}}>
              podcasts
            </span>
          </div>
        </div>

        <div className={styles.CardWrapper}>
          <div className={styles.Card} style={{background: '#1D1D1D'}}>
            <h2>BurnFM on Spotify</h2>
            <p>
              Music and Radio go hand in hand, so we made a Spotify account!
            </p>
            <p>
              Follow us on @theburnfm to listen to our playlists,
              keep up to date with new releases, and listen back to our ball playlists!
            </p>
            <Link className={buttons.Button} href={"https://open.spotify.com/user/theburnfm"}>
              <Image
                  src={SpotifyIcon}
                  alt={"Spotify icon"}
                  height={28}
                  width={28}
              />
              Visit our Spotify profile
            </Link>
          </div>
          <Image
              className={styles.CardIcon}
              src={SpotifyIcon}
              alt={"Spotify icon"}
              height={64}
              width={64}
          />
        </div>

      </div>
    </motion.div>
  )
}
