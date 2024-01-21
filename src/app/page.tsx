// noinspection SpellCheckingInspection

'use client'


import styles from './page.module.css'

import Player from './Player';
import './icons.css';
import Image from "next/image";
import SpotifyIcon from "./assets/Spotify_icon.svg"
import PodcastsIcon from "./assets/Podcasts_icon.svg"



export default function Home() {
  return (
    <main className={styles.Main}>

      <Player/>

      <div className={styles.Cards}>
        <div className={styles.CardWrapper}>
          <div className={styles.Card}>
            <h2>Podcasts</h2>
            <p>
              BurnFM doesn&apos;t just do radio - we also have a large and vibrant community of podcasters.
            </p>
            <a className={styles.Button} href={"https://open.spotify.com/show/0ALexnN0yS3OX4xdiPetic"}>
              <Image
                src={SpotifyIcon}
                alt={"Spotify icon"}
                height={28}
                width={28}
              />
              Listen on Spotify
            </a>
            <a className={styles.Button} href={"https://podcasts.apple.com/us/podcast/burn-fm/id1521913304"}>
              <Image
                src={PodcastsIcon}
                alt={"Apple Podcasts icon"}
                height={28}
                width={28}
              />
              Listen on Apple Podcasts
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
          <div className={styles.Card}>
            <h2>Burn Weekly</h2>
            <p>
              Keep up to date with new releases with the Burn Weekly playlist,
              filled with the best music the week has to offer! New every Wednesday.
            </p>
            <a className={styles.Button} href={"https://open.spotify.com/user/theburnfm"}>
              <Image
                src={SpotifyIcon}
                alt={"Spotify icon"}
                height={28}
                width={28}
              />
              Check it out on Spotify
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
                Missed the magic? We have you covered.
                Check out our schedule to catch up on all the replays,
                or check when your favourite shows are on next.
              </p>
            </div>

            <a className={styles.Button} href={"#"}>
              Go to the Schedule
            </a>
          </div>
          <div className={styles.CardIcon}>
            <span className={"material-symbols-rounded"} style={{color: "#32103F"}}>
              overview
            </span>
          </div>
        </div>

        <div className={styles.CardWrapper}>
          <div className={styles.Card} style={{background: '#B751BB'}}>
            <h2>Our team</h2>
            <p>
              Running a radio station is no small feat. See the team who lead our station, as well as the managers of our fantastic sections.
            </p>
            <a className={styles.Button} href={"#"}>
              About us
            </a>
          </div>

          <div className={styles.CardIcon}>
            <span className={"material-symbols-rounded"} style={{color: "#B751BB"}}>
              group
            </span>
          </div>

        </div>
      </div>

    </main>
  )
}
