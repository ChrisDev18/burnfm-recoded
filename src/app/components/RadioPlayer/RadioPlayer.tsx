'use client'

import styles from "./RadioPlayer.module.css";
import showPopup from "@/app/styles/ShowPopup.module.css"
import React, {useContext, useEffect, useState} from "react";
import Image from "next/image";
import fallback from "../../../../public/Radio-Microphone.png";
import {Show as ShowType, PopupState, ShowSchedule} from "@/app/lib/types";
import {getNowPlaying} from "@/app/lib/fetchdata";
import Show from "../Show/Show";
import {Dialog, DialogContent} from "@/app/components/Popup/Popup";
import loading_styles from "../../styles/Spinner.module.css";
import {Close} from "@radix-ui/react-dialog";
import buttons from "@/app/styles/buttons.module.css"
import Link from "next/link";
import {pickExcerpt} from "@/app/lib/excerpts";
import {AudioContext} from "@/app/contexts/AudioContext";
import HScroll from "@/app/components/HScroll/HScroll";

const empty_schedule: ShowSchedule = {
  current_show: null,
  next_shows: []
}

const init_popup: PopupState = {
  visible: false,
  show: {
    id: 0,
    title: "",
    excerpt: "",
    start_time: new Date(),
    end_time: new Date(),
    img: null
  }
}

export default function RadioPlayer() {
  const audio = useContext(AudioContext);
  // Define states
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [schedule, setSchedule] = useState(empty_schedule);
  const [popup, setPopup] = useState(init_popup);

  // Effect for fetching data from API
  useEffect(() => {
    function update() {
      setLoading(true);
      getNowPlaying()
        .then(x => {
          setSchedule(x);
        })
        .catch(e => console.error("Error: ", e))
        .finally(() => setLoading(false));
    }

    update();

    // Calculate the time until the next hour starts
    const now = new Date();
    const msUntilNextHalfHour = (30 - (now.getMinutes() % 30)) * 60 * 1000;

    // Set the initial timeout to sync with the next half-hour mark
    const timeout = setTimeout(() => {
      update();

      // Set the interval to update every 30 minutes thereafter
      const interval = setInterval(update, 30 * 60 * 1000);

      // Clear the interval when the component unmounts
      return () => clearInterval(interval);
    }, msUntilNextHalfHour);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timeout);
  }, []);

  // Add listeners for media control outside of React
  useEffect(() => {
    const audioElement = audio;

    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);

    audioElement?.addEventListener('play', handlePlay);
    audioElement?.addEventListener('pause', handlePause);

    // Clean up the action handlers when the component unmounts
    return () => {
      audioElement?.removeEventListener("play", handlePlay)
      audioElement?.removeEventListener("play", handlePause)
    };
  }, [audio]);

  // Update MediaSession whenever the current show changes
  useEffect(() => {
    // Set up the media session metadata if there is a current song
    if (schedule.current_show !== null) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: schedule.current_show?.title,
        artist: "BurnFM",
        artwork: [{
          src: schedule.current_show.img === null ? fallback.src : schedule.current_show.img,
          sizes: '192x192',
          type: 'image/jpeg'
        }]});

      // navigator.mediaSession.setPositionState({ duration: Infinity });

      // if ('setPositionState' in navigator.mediaSession) {
      //   const audioElement = audioRef.current;
      //
      //   let pos = Date.now() - schedule.current_show.start_time.getTime();
      //   let len = schedule.current_show.end_time.getTime() - schedule.current_show.start_time.getTime();
      //
      //   navigator.mediaSession.setPositionState({
      //     duration: Math.floor(len / 1000),
      //     playbackRate: audioElement?.playbackRate,
      //     position: Math.floor(pos / 1000)
      //   });
      // }
    } else {
      navigator.mediaSession.playbackState = 'none';
      navigator.mediaSession.metadata = null;
      // navigator.mediaSession.setPositionState();
    }
  }, [schedule.current_show]);

  // Display the Popup with details for a given show
  const displayPopup = (show: ShowType) => {
    setPopup({
      visible: true,
      show: show,
    });
  }

  // Play audio and set playing state to true
  const playAudio = async () => {
    if (audio) {
      await audio.play();
      setPlaying(true);
    }
  };

  // Pause audio and set playing state to false
  const pauseAudio = () => {
    if (audio) {
      audio.pause();
      setPlaying(false);
    }
  };

  // Handle toggling between play and pause on player
  const togglePlayPause = async () => {
    if (playing)
      pauseAudio()
    else
      await playAudio()
  }

  // Generate the list of shows
  const shows_list = schedule.next_shows.map((show, i) =>
      <button className={buttons.Clickable} key={i} onClick={() => displayPopup(show)} >
        <Show show={show} />
      </button>
  );

  return (
    <div className={styles.Player_Root}>
      {/*Popup for when a user clicks on a show*/}
      <Dialog open={popup.visible} onOpenChange={(change) => setPopup({...popup, visible: change})}>
        <DialogContent>
          <div className={showPopup.Popup}>
            {popup.show.img &&
              <Image className={showPopup.Image}
                     src={popup.show.img}
                     alt={"Cover image for the show: " + popup.show.title}
                     height={120}
                     width={120}
              />
            }

            <h2 className={"notranslate"}>{popup.show.title}</h2>

            {
              popup.show.excerpt !== "" ?
                <p>{popup.show.excerpt}</p>
                   :
                <p className={showPopup.Default}>{pickExcerpt()}</p>
            }

            <div className={showPopup.buttonRow}>
              {/*<Link className={buttons.Button} href={"/schedule?day=" + popup.show.start_time.getDay()}>*/}
              {/*  View in Schedule*/}
              {/*</Link>*/}

              <Link className={buttons.Button} href={"/show?id=" + popup.show.id}>
                Go to Show Page
              </Link>
            </div>

            <Close className={`${buttons.Button} ${showPopup.Close}`}>
              <span className={'material-symbols-rounded notranslate'}>close</span>
            </Close>
          </div>
        </DialogContent>
      </Dialog>

      {/*// WHEN LOADING*/}
      <div className={`${styles.LoadingOverlay} ${loading ? "" : styles.Transparent}`}>
        <div className={`${loading_styles.Spinner} ${loading_styles.Light}`}/>
        <p className={loading_styles.Header}>Loading radio player </p>
        <p className={loading_styles.Message}>If this takes longer than a couple seconds, reload the page.</p>
      </div>

      {schedule.current_show === null ?
        // WHEN NOT BROADCASTING
        <div className={`${styles.Player_Left} ${styles.Player_Left_Empty}`}>
          <h2 className={styles.Header}>Off air</h2>
          <div className={styles.PlayNow}>
            <p className={styles.OffAirMessage}>
              {schedule.next_shows.length != 0 ?
                "There is nothing currently scheduled for this hour. " +
                "Whilst we're having a break, why not check out our podcasts for a little easy listening?"
                :
                "We sometimes go off air when we're working on an update behind the scenes or if it's a holiday. " +
                "Whilst we're having a break, why not check out our podcasts for a little easy listening?"
              }
            </p>
          </div>
        </div>
        :
        // WHEN BROADCASTING
        <div className={styles.Player_Left}>
          <h2 className={styles.Header}>On now</h2>

          <div className={styles.PlayNow}>
            <button className={styles.Toggle_Button} onClick={togglePlayPause}>
              <span className={"material-symbols-rounded notranslate"}>
                {playing ? "stop" : "play_arrow"}
              </span>
            </button>

            <button className={`${styles.PlayNow_Details} ${buttons.Clickable}`}
                    onClick={() => schedule.current_show !== null? displayPopup(schedule.current_show): null}>
              <p className={styles.Show_Times}>{schedule.current_show.start_time.toLocaleTimeString(['en'], {
                hour: "2-digit",
                minute: "2-digit"
              })} - {schedule.current_show.end_time.toLocaleTimeString(['en'], {
                hour: "2-digit",
                minute: "2-digit"
              })}
              </p>
              <p className={styles.Show_Title}>{schedule.current_show.title}</p>
              {schedule.current_show.excerpt !== "" ?
                <p className={styles.Show_Excerpt}>{schedule.current_show.excerpt}</p> : <></>}
            </button>
          </div>


          <div className={styles.ImageContainer}>
            <span className={styles.ImageOverlay}/>
            <Image
              className={styles.Image}
              src={schedule.current_show.img === null ? fallback : schedule.current_show.img}
              alt={"Cover image for the show: " + schedule.current_show.title}
              height={233}
              width={233}
              priority
            />
          </div>

        </div>
      }

      <div
        className={schedule.next_shows.length == 0 ? `${styles.Player_Right} ${styles.Player_Right_Empty}` : styles.Player_Right}>
        <h2 className={`${styles.Header}`}>Coming up</h2>


          <div className={styles.ScrollWrapper}>
            <HScroll color={"#32103F"}>
            {shows_list.length > 0 ?
                <div className={styles.ShowList}>
                  {shows_list}
                </div>
                :
                <div className={styles.EmptyScheduleMessage}>
                  <p>That&apos;s it for now!</p>
                  <p>Our schedule is empty, but check back later for new shows to come!</p>
                </div>
            }
            </HScroll>
          </div>
      </div>

    </div>
  )
}
