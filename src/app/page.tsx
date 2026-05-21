'use client'

import styles from './page.module.css'
import buttons from '@/app/styles/buttons.module.css'

import Image from "next/image";
import SpotifyIcon from "../../public/Spotify_icon.svg"
import PodcastsIcon from "../../public/Podcasts_icon.svg"
import Link from "next/link";
import React, {useEffect, useState} from "react";
import { motion } from 'framer-motion';
import {CalendarIcon, UsersIcon, PodcastIcon} from "lucide-react";
import NewRadioPlayer from "@/components/RadioPlayer/NewRadioPlayer";
import {InstagramEmbed} from "react-social-media-embed";


export default function Home() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <motion.div className={styles.Root}
                transition={{ duration: 0.2, type: "tween", delay: 0.2}}
                initial={{opacity: 0}}
                animate={{opacity: 1}}>
      <NewRadioPlayer/>

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
        <div className="relative space-y-8 bg-neutral-900 py-8 px-8 overflow-clip text-white">

          <PodcastIcon size={200} className="absolute -bottom-[50px] -right-[50px] text-yellow-300 z-0"/>

          <div className="relative max-w-md pr-24">
            <h2 className="mb-2">Burn <span className="text-yellow-300">Podcasts</span></h2>
            <p>
              Burn FM doesn&apos;t just do radio - we also have a large and vibrant community of podcasters.
            </p>
          </div>

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

        <div className="relative space-y-8 bg-neutral-900 py-8 px-8 overflow-clip text-white">

          <Image src={SpotifyIcon} height={180} width={180} alt="Spotify Icon"
                 className="absolute -bottom-[50px] -right-[50px] z-0"/>

          <div className="relative max-w-md pr-24">
            <h2 className="mb-2">Burn mixes on <span className="text-[#1ED760]">Spotify</span></h2>

            <p>
              Follow us on @theburnfm and discover new sub-genres of music, play back the songs from our past Media
              Balls, and explore all the
              other playlists from the past.
            </p>

          </div>

          <div className={styles.cardButtons}>
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
        </div>

      </div>

      <div className="flex bg-[#32103F] text-white p-8 justify-around">
        <div className="flex justify-center items-start gap-8 w-full max-w-[1000px] max-[900px]:flex-col">
          <div className="flex flex-col gap-8 items-end justify-center h-full max-[900px]:h-auto w-1/2 max-[900px]:w-full">
           <div>
             <h2 className="mb-4">Our socials</h2>
             <p>
               <strong>Instagram</strong> is your one-stop-shop to find out about socials, signup sheets, and our current committee. If
               you are a member or want to join, we also have a <strong>WhatsApp community</strong> which has important
               announcements about the studio and society events, plus group chats for each of our team shows.
             </p>
           </div>

           <p>
             The QR code to join the WhatsApp is in the studio - just scan it to join! If you saw us during Freshers or
             were a previous member, we'll also send you a link to join the new WhatsApp.
           </p>
          </div>

          { isClient &&
            <InstagramEmbed url="https://www.instagram.com/burn_fm/"
                            captioned={false}
                            className="w-1/2 min-w-sm max-w-xl" style={{marginBottom: -12}}
            />
          }
        </div>

      </div>

      <div className={styles.Cards}>
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
              <Link href={`/schedule/${new Date().getDay()}`} className={buttons.Button}>
                View Schedule
              </Link>
            </div>
          </div>
          <div className={styles.CardIcon}>
            <CalendarIcon size={32} style={{color: "#32103F"}}/>
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
            <UsersIcon size={32} style={{color: "#B751BB"}}/>
          </div>

        </div>

      </div>
    </motion.div>
  )
}
