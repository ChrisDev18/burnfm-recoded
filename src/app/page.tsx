'use client'

import styles from './page.module.css'
import buttons from '@/app/styles/buttons.module.css'

import './styles/icons.css';
import Image from "next/image";
import SpotifyIcon from "../../public/Spotify_icon.svg"
import InstagramIcon from "../../public/Instagram_icon.svg"
import PodcastsIcon from "../../public/Podcasts_icon.svg"
import Link from "next/link";
import React from "react";
import RadioPlayer from "@/app/components/RadioPlayer/RadioPlayer";
import { motion } from 'framer-motion';


export default function Home() {

  return (
    <motion.div className={styles.Root}
                transition={{ duration: 0.2, type: "tween", delay: 0.2}}
                initial={{opacity: 0}}
                animate={{opacity: 1}}>
      <RadioPlayer/>

      <div className={styles.Cards}>

        {/*<div className={styles.CardWrapper}>*/}
        {/*  <div className={styles.Card} style={{background: "#32103F"}}>*/}
        {/*    <h2>Apply to run your own show</h2>*/}
        {/*    <div className={styles.pWrapper}>*/}
        {/*      <p>*/}
        {/*        The forms for registering for you own Podcast or Radio show are now open. Click below to apply.*/}
        {/*      </p>*/}
        {/*    </div>*/}

        {/*    <div className={styles.cardButtons}>*/}
        {/*      <a href={"https://forms.gle/jtEiK2kUt6N7WnQt9"} className={buttons.Button}>*/}
        {/*        Apply for Podcast*/}
        {/*      </a>*/}

        {/*      <a href={"https://forms.gle/hNXJDx9WianyF7Tu8"} className={buttons.Button}>*/}
        {/*        Apply for Radio Show*/}
        {/*      </a>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <div className={styles.CardIcon}>*/}
        {/*    <span className={"material-symbols-sharp notranslate"} style={{color: "#32103F"}}>*/}
        {/*      campaign*/}
        {/*    </span>*/}
        {/*  </div>*/}
        {/*</div>*/}

        <div className={styles.CardWrapper}>
          <div className={styles.Card} style={{background: "#32103F"}}>
            <h2>Burn FM on Instagram</h2>
            <p>
              Socials, signup sheets, and info about our new committee - it&apos;ll all be there on Instagram. Follow us
              so that you don&apos;t miss anything!
            </p>

            <div className={styles.cardButtons}>
              <a className={buttons.Button} href={"https://www.instagram.com/burn_fm/"}>
                <Image
                    src={InstagramIcon}
                    alt={"Instagram icon"}
                    height={28}
                    width={28}
                />
                Visit our Instagram
              </a>
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
          <div className={styles.Card} style={{background: '#5D1F74'}}>
            <h2>Burn Podcasts</h2>
            <p>
              Burn FM doesn&apos;t just do radio - we also have a large and vibrant community of podcasters.
            </p>

            <div className={styles.cardButtons}>
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
          </div>
          <div className={styles.CardIcon}>
            <span className={"material-symbols-sharp notranslate"} style={{color: "#5D1F74"}}>
              podcasts
            </span>
          </div>
        </div>

        <div className={styles.CardWrapper}>
          <div className={styles.Card} style={{background: "#5D1F74"}}>
            <h2>Check out our new shows!</h2>
            <p>
              Applications for this term are now closed, and the new shows are live! Check out the schedule and see
              what catches your fancy ;)
            </p>
            <p>
              Although the applications for this term are closed, next term we will reopen applications if you decide
              to apply!
            </p>
            <div className={styles.cardButtons}>
              <a href={'https://www.guildofstudents.com/studentgroups/societies/burnfm/'} className={buttons.Button}>
                Our Guild of Students page
              </a>
              <Link href={`/schedule?day=${new Date().getDay()}`} className={buttons.Button}>
                Discover our new shows
              </Link>
            </div>
          </div>

          <div className={styles.CardIcon}>
            <span className={"material-symbols-rounded notranslate"} style={{color: "#5D1F74"}}>
              mic_external_on
            </span>
          </div>
        </div>

        <div className={styles.CardWrapper}>
          <div className={styles.Card} style={{background: '#1D1D1D'}}>
            <h2>Burn FM Mixes on Spotify</h2>
            <p>
              Music and Radio go hand in hand, so we made a Spotify account! Follow us on @theburnfm and:
            </p>
            <ul>
              <li>discover new sub-genres of music listening to <i>Burn FM Introduces...</i></li>
              <li>play back the songs from our past Media Balls,</li>
              <li>and explore all the other playlists from the past, curated here at Burn FM.</li>
            </ul>
            <a className={buttons.Button} href={"https://open.spotify.com/user/theburnfm"}>
              <Image
                  src={SpotifyIcon}
                  alt={"Spotify icon"}
                  height={28}
                  width={28}
              />
              Discover our Spotify mixes
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
            <div className={styles.cardButtons}>
              <Link href={'/about'} className={buttons.Button}>
                More about us
              </Link>
            </div>
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
