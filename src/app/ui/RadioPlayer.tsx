'use client'

import styles from "./RadioPlayer.module.css";
import showPopup from "@/app/ui/ShowPopup.module.css"
import React, {useEffect, useState} from "react";
import Image from "next/image";
import fallback from "../../../public/Radio-Microphone.png";
import {Show as ShowType, PopupState, ShowSchedule} from "@/app/lib/types";
import {getNowPlaying} from "@/app/lib/fetchdata";
import Show from "./Show";
import {Dialog, DialogContent} from "@/app/ui/Popup";
import loading_styles from "./Spinner.module.css";
import {usePathname} from "next/navigation";
import {Close} from "@radix-ui/react-dialog";
import buttons from "@/app/ui/buttons.module.css"
import Link from "next/link";
import {pickExcerpt} from "@/app/lib/excerpts";

const empty_schedule: ShowSchedule = {
  current_show: null,
  next_shows: []
}

const init_popup: PopupState = {
  visible: false,
  img: fallback.src,
  title: "default title",
  excerpt: "default excerpt"
}

export default function RadioPlayer() {
  // Define states
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [schedule, setSchedule] = useState(empty_schedule);
  const [popup, setPopup] = useState(init_popup);
  const current_path = usePathname();

  // Generate the list of shows
  const shows_list = schedule.next_shows.map((show, i) =>
      <button className={buttons.Clickable} key={i} onClick={() => selectShow(show)} >
        <Show show={show} />
      </button>
  );

  // Effect for fetching data from API
  useEffect(() => {
    function update() {
      setLoading(true);
      getNowPlaying()
        .then(x => {
          setSchedule(x);
        })
        .catch(e => console.error("Error: ", e))
        .finally(() => setLoading(false))  // TODO: uncomment this
    }

    // Calculate the time until the next hour starts
    const now = new Date();
    const ms_until_next_half_hour = (30 - (now.getMinutes() % 30)) * 60 * 1000;

    update();

    // Run the update function at the start of each hour
    const intervalId = setInterval(() => {
      update();
    }, ms_until_next_half_hour);

    // Clean up the interval when the component unmounts
    return (() => {
      clearInterval(intervalId);
    });
  }, []);

  // Effect for handling mediaSession
  useEffect(() => {
    // Check if the audio tag is there
    const audio = document.querySelector('audio');
    if (audio == null) {
      handleNoAudio();
      return;
    }

    // Check if the Media Session API is supported by the browse
    if (! ('mediaSession' in navigator)) {
      console.warn('Media Session API not supported.');
      return;
    }

    // Set up the media session metadata if there is a current song
    if (schedule.current_show === null) {
      navigator.mediaSession.playbackState = 'none';
      navigator.mediaSession.metadata = null;
      navigator.mediaSession.setPositionState();
    } else {

      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: schedule.current_show?.title,
        artist: "BurnFM",
        artwork: [{
          src: schedule.current_show.img === null ? fallback.src : schedule.current_show.img,
          sizes: '192x192',
          type: 'image/jpeg'
        }]
      });

      if ('setPositionState' in navigator.mediaSession) {

        let pos = Date.now() - schedule.current_show.start_time.getTime();
        let len = schedule.current_show.end_time.getTime() - schedule.current_show.start_time.getTime();

        navigator.mediaSession.setPositionState({
          duration: Math.floor(len / 1000),
          playbackRate: audio.playbackRate,
          position: Math.floor(pos / 1000)
        });

      }

      // Set up the media session actions

      navigator.mediaSession.setActionHandler('play', () => {
        handlePlayPause()
          .then(() => {
            setPlaying(true)
            navigator.mediaSession.playbackState = "playing";
          }).catch(e => {
          console.error("Could not toggle", e);
        })
      });

      navigator.mediaSession.setActionHandler('stop', () => {
        handlePlayPause()
          .then(() => {
            navigator.mediaSession.playbackState = "paused";
          }).catch(e => {
          console.error("Could not toggle", e);
        })
      });

    }

    audio.addEventListener('play', () => {
      navigator.mediaSession.playbackState = 'playing';
    });

    audio.addEventListener('pause', () => {
      navigator.mediaSession.playbackState = 'paused';
    });

    // Clean up the event listeners when the component unmounts
    return () => {
      // Remove event listeners
      navigator.mediaSession.setActionHandler('play', null);
      navigator.mediaSession.setActionHandler('stop', null);

      const audio = document.querySelector('audio');
      if (audio == null) {
        handleNoAudio();
        return;
      }

      audio.removeEventListener('play', () => {
        navigator.mediaSession.playbackState = 'playing';
      });
      audio.removeEventListener('pause', () => {
        navigator.mediaSession.playbackState = 'paused';
      });
    }
  }, [playing, schedule.current_show]);

  // Displays the Popup with details for the current show
  function selectShow(show: ShowType) {
    setPopup({
      visible: true,
      title: show.title,
      excerpt: show.excerpt,
      img: show.img
    });
  }


  // Handles toggling between play and pause on player
  async function handlePlayPause() {
    let player = document.getElementsByTagName('audio')[0];

    let should_pause: boolean;
    if ('mediaSession' in navigator) {
      should_pause = navigator.mediaSession.playbackState == 'playing';
    } else {
      console.warn('Media Session API not supported.');
      should_pause = playing;
    }
    if (should_pause) {
      player.pause();
      setPlaying( false);

    } else {
      try {
        await player.play();
        setPlaying(true);
      } catch (e) {
        console.error(e)
        // needed to ensure that mediaSession doesn't mark media as playing when it couldn't
      }
    }
  }

  // Handles any errors with the audio HTML element
  function handleNoAudio() {
    console.error("Error accessing audio");
  }

  return (
    <div className={`${styles.Player_Root} ${current_path !== '/'? styles.Hidden: ""}`}>
      {/*Popup for when a user clicks on a show*/}
      <Dialog open={popup.visible} onOpenChange={(change) => setPopup({...popup, visible: change})}>
        <DialogContent>
          <div className={showPopup.Popup}>
            {popup.img &&
              <Image className={showPopup.Image}
                     src={popup.img}
                     alt={"Cover image for the show: " + popup.title}
                     height={120}
                     width={120}
              />
            }

            <h2>{popup.title}</h2>

            {
              popup.excerpt !== "" ?
                <p>{popup.excerpt}</p>
                   :
                <p className={showPopup.Default}>{pickExcerpt()}</p>
            }

            <Link className={buttons.Button} href={"/schedule"}>
              Go to today&apos;s schedule
            </Link>

            <Close className={`${showPopup.Close} ${buttons.Clickable}`}>
              <span className={'material-symbols-rounded'}>close</span>
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

      <audio id={"media"} onError={handleNoAudio}>
        <source src={"https://streaming.broadcastradio.com:8572/burnfm"} type={"audio/mp3"}/>
        The broadcast has stopped, or your browser does not support the audio element.
      </audio>

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
            <button className={styles.Toggle_Button} onClick={handlePlayPause}>
              <span className={"material-symbols-rounded"}>
                {playing ? "stop" : "play_arrow"}
              </span>
            </button>

            <button className={`${styles.PlayNow_Details} ${buttons.Clickable}`} onClick={() => schedule.current_show !== null? selectShow(schedule.current_show): null}>
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
        </div>
      </div>

    </div>
  )
}
