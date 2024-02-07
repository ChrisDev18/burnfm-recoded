'use client'

import styles from "./RadioPlayer.module.css";
import {useEffect, useState} from "react";
import Image from "next/image";
import fallback from "../../../public/Radio-Microphone.png";
import {Show as ShowType, PopupState, Schedule} from "@/app/lib/types";
import {getNowPlaying} from "@/app/lib/fetchdata";
import Show from "./Show";
import ShowPopup from "@/app/ui/ShowPopup";

const empty_schedule: Schedule = {
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
  const [playing, setPlaying] = useState(false);
  const [schedule, setSchedule] = useState(empty_schedule);
  const [popup, setPopup] = useState<PopupState>(init_popup)
  // Generate the list of shows
  const shows_list = schedule.next_shows.map((show, i) =>
      <button className={styles.Clickable} key={i} onClick={() => popup_selected(show)} >
        <Show show={show} />
      </button>
  );

  // Effect for fetching data from API
  useEffect(() => {
    function update() {
      getNowPlaying()
        .then(x => {
          setSchedule({
            current_show: x.current_show,
            next_shows: x.next_shows
          });
        })
        .catch(e => console.error("Error: ", e));
    }

    // Calculate the time until the next hour starts
    const now = new Date();
    const millisecondsUntilNextHour = (60 - now.getMinutes()) * 60 * 1000;

    update();

    // Run the update function at the start of each hour
    const intervalId = setInterval(() => {
      update();
    }, millisecondsUntilNextHour);

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

    // Set up the media session metadata
    navigator.mediaSession.metadata = new window.MediaMetadata({
      title: schedule.current_show?.title,
      artist: "BurnFM",
      artwork: [
        { src: schedule.current_show?.img == null ? fallback.src : schedule.current_show.img, sizes: '192x192', type: 'image/jpeg' },
      ],
    });

    if ('setPositionState' in navigator.mediaSession) {
      let pos: number = 0;
      let len: number = 0;
      if (schedule.current_show != null) {
        pos = Date.now() - schedule.current_show.start_time.getTime();
        len = schedule.current_show.end_time.getTime() - schedule.current_show.start_time.getTime();
      }

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

    navigator.mediaSession.setActionHandler('pause', () => {
      handlePlayPause()
        .then(() => {
          navigator.mediaSession.playbackState = "paused";
        }).catch(e => {
        console.error("Could not toggle", e);
      })
    });

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

  // Displays the ShowPopup with details for the current show
  function popup_current_show() {
    if (schedule.current_show === null) {
      console.error("cannot display current show as it is null");
    } else {
      setPopup({
        visible: true,
        title: schedule.current_show.title,
        excerpt: schedule.current_show.excerpt,
        img: schedule.current_show.img === null ? fallback.src : schedule.current_show.img
      });
    }
  }

  // Displays the ShowPopup with details for the current show
  function popup_selected(show: ShowType) {
    setPopup({
      visible: true,
      title: show.title,
      excerpt: show.excerpt,
      img: show.img === null ? fallback.src : show.img
    });
  }

  // Hides the ShowPopup
  function hide_popup() {
    setPopup({
      ...popup,
      visible: false
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
    // setSchedule(schedule=> ({
    //   ... schedule,
    //   current_show: null
    // }));
    // console.log("Schedule updated: current show is now:", schedule.current_show);
  }


  return (
    <div className={styles.Player_Root}>
      <ShowPopup popup={popup} hide={hide_popup} />

      <audio id={"media"} onError={handleNoAudio}>
        <source src={"https://streaming.broadcastradio.com:8572/burnfm"} type={"audio/mp3"}/>
        The broadcast has stopped, or your browser does not support the audio element.
      </audio>

      {schedule.current_show === null ?
        // WHEN NOT BROADCASTING
        <div className={`${styles.Player_Left} ${styles.Player_Left_Empty}`}>
          <div className={styles.PlayNow}>
            <h2 className={styles.Header}>Off air</h2>
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
          <button className={styles.Toggle_Button} onClick={handlePlayPause}>
            <span className={"material-symbols-rounded"}>
              {playing ? "stop" : "play_arrow"}
            </span>
          </button>

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

          <div className={styles.PlayNow} onClick={popup_current_show}>
            <h2 className={styles.Header}>On now</h2>

            <button className={`${styles.PlayNow_Details} ${styles.Clickable}`}>
              <p className={styles.Show_Times}>{schedule.current_show.start_time.toLocaleTimeString(['en'], {
                  hour: "2-digit",
                  minute: "2-digit"
                })} - {schedule.current_show.end_time.toLocaleTimeString(['en'], {
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </p>
              <p className={styles.Show_Title}>{schedule.current_show.title}</p>
              <p className={styles.Show_Excerpt}>{schedule.current_show.excerpt}</p>
            </button>
          </div>
        </div>
      }

      <div className={schedule.next_shows.length == 0 ? `${styles.Player_Right} ${styles.Player_Right_Empty}` : styles.Player_Right}>
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
