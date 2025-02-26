'use client'

import styles from "./RadioPlayer.module.css";
import buttons from "@/app/styles/buttons.module.css"
import showPopup from "@/app/styles/ShowPopup.module.css"
import React, {useContext, useEffect, useReducer, useState} from "react";
import Image from "next/image";
import fallback from "../../../../public/Radio-Microphone.png";
import {Show as ShowType, PopupState} from "@/lib/types";
import {getNowPlaying} from "@/lib/api";
import Show from "../Show/Show";
import {Dialog, DialogContent} from "@/app/components/Popup/Popup";
import loading_styles from "../../styles/Spinner.module.css";
import {Close} from "@radix-ui/react-dialog";

import Link from "next/link";
import {pickExcerpt} from "@/lib/excerpts";
import {AudioContext} from "@/contexts/AudioContext";
import HScroll from "@/app/components/HScroll/HScroll";
import {initialState, nowplayingReducer} from "@/reducers/nowplayingReducer";
import * as DialogPrimitive from "@radix-ui/react-dialog";

const init_popup: PopupState = {
  visible: false,
  show: {
    id: 0,
    day: 1,
    title: "",
    duration: new Date(),
    description: "",
    start_time: new Date(),
    end_time: new Date(),
    img: "",
    hosts: []
  }
}

export default function RadioPlayer() {
  const audio = useContext(AudioContext);

  // Define states
  const [playing, setPlaying] = useState<"playing"|"stopped"|"loading">(audio && ! audio.paused ? "playing" : "stopped");
  const [popup, setPopup] = useState(init_popup);
  const [state, dispatch] = useReducer(nowplayingReducer, initialState)

  // Effect for fetching data from API
  useEffect(() => {
    async function update() {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const schedule = await getNowPlaying();
        dispatch({type: "FETCH_SUCCESS", payload: schedule});
      } catch (error: any) {
        dispatch({
          type: "FETCH_FAILURE",
          payload: error.message || 'An error occurred',
        });
      }
    }

    update().then();

    // Calculate the time until the next hour starts
    const now = new Date();
    const msUntilNextHalfHour = (30 - (now.getMinutes() % 30)) * 60 * 1000;

    // Set the initial timeout to sync with the next half-hour mark
    const timeout = setTimeout(() => {
      update().then();

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

    const handlePlay = () => setPlaying("playing");
    const handlePause = () => setPlaying("stopped");

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
    if (state.schedule?.current_show) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: state.schedule.current_show.title,
        artist: "Burn FM",
        artwork: [{
          src: state.schedule.current_show.img === "" ? fallback.src : state.schedule.current_show.img,
          sizes: '192x192',
          type: 'image/jpeg'
        }]});
    } else {
      navigator.mediaSession.playbackState = 'none';
      navigator.mediaSession.metadata = null;
    }
  }, [state.schedule.current_show]);

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
      console.log("loading")
      setPlaying("loading")
      await new Promise((resolve) => setTimeout(resolve, 0)); // Let the UI update first
      await audio.play();
      console.log("done")
      setPlaying("playing");
    }
  };

  // Pause audio and set playing state to false
  const pauseAudio = () => {
    if (audio) {
      audio.pause();
      setPlaying("stopped");
    }
  };

  // Handle toggling between play and pause on player
  const togglePlayPause = async () => {
    if (playing != "stopped")
      pauseAudio()
    else
      await playAudio()
  }

  // Generate the list of shows
  const shows_list = state.schedule.next_shows.map((show, i) =>
      <button className={buttons.Clickable} key={i} onClick={() => displayPopup(show)} >
        <Show show={show} />
      </button>
  );

  return (
    <div className={styles.Player_Root}>
      {/*Popup for when a user clicks on a show*/}
      <Dialog open={popup.visible} onOpenChange={(change) => setPopup({...popup, visible: change})}>
        <DialogContent title={popup.show.title}>
          <div className={showPopup.Popup}>
            { popup.show.img &&
                <Image className={showPopup.Image}
                       src={popup.show.img}
                       alt={"Cover image for the show: " + popup.show.title}
                       height={120}
                       width={120}
                />
            }

            <div>
              <DialogPrimitive.Title className={"notranslate"}>
                {popup.show.title}
              </DialogPrimitive.Title>

              <p className={showPopup.timing}>
                {popup.show.start_time.toLocaleTimeString(['en'], {hour: "2-digit", minute: "2-digit"})} - {
                popup.show.end_time.toLocaleTimeString(['en'], {hour: "2-digit", minute: "2-digit"})}
              </p>
            </div>


            {
              popup.show.description ? (
                  <p>{popup.show.description}</p>
              ) : (
                  <p className={showPopup.Default}>{pickExcerpt()}</p>
              )
            }

            <div className={showPopup.buttonRow}>
              {/*<Link className={buttons.Button} href={"/schedule?day=" + popup.show.start_time.getDay()}>*/}
              {/*  View in Schedule*/}
              {/*</Link>*/}

              <Link className={buttons.Button} href={"/show?id=" + popup.show.id}>
                Go to Show Page
              </Link>
            </div>

            <Close className={`${showPopup.Close}`}>
              <span className={'material-symbols-rounded notranslate'}>close</span>
            </Close>
          </div>
        </DialogContent>
      </Dialog>

      {/*// WHEN LOADING*/}
      <div className={`${styles.LoadingOverlay} ${state.loading ? "" : styles.Transparent}`}>
        <div className={`${loading_styles.Spinner} ${loading_styles.Light}`}/>
        <p className={loading_styles.Header}>Loading radio player </p>
        <p className={loading_styles.Message}>If this takes longer than a couple seconds, reload the page.</p>
      </div>

      {
        ! state.schedule.current_show ? (
          // WHEN NOT BROADCASTING
          <div className={`${styles.Player_Left} ${styles.Player_Left_Empty}`}>
            <h2 className={styles.Header}>Off air</h2>
            <div className={styles.PlayNow}>
              <p className={styles.OffAirMessage}>
                {
                  state.error ? (
                      "There was an error retrieving data"
                  ) : state.schedule.next_shows.length != 0 ? (
                    "There is nothing currently scheduled for this hour. " +
                    "Whilst we're having a break, why not check out our podcasts for a little easy listening?"
                  ) : (
                    "We sometimes go off air when we're working on an update behind the scenes or if it's a holiday. " +
                    "Whilst we're having a break, why not check out our podcasts for a little easy listening?"
                  )
                }
              </p>
            </div>
          </div>
        ) : (
          // WHEN BROADCASTING
          <div className={styles.Player_Left}>
            <h2 className={styles.Header}>On now</h2>

            <div className={styles.PlayNow}>
              <button className={styles.Toggle_Button} onClick={togglePlayPause}>
                {playing != "loading" ?
                    <span className={"material-symbols-rounded notranslate"}>
                      {playing == "playing" ? "stop" : "play_arrow"}
                    </span>
                    :
                    <div className={`${loading_styles.Spinner} ${loading_styles.Light} ${styles.play_spinner}`}/>
                }
              </button>

                  <button className={`${styles.PlayNow_Details} ${buttons.Clickable}`}
                onClick={() => state.schedule.current_show !== null ? displayPopup(state.schedule.current_show): null}>
                <p className={styles.Show_Times}>{state.schedule.current_show.start_time.toLocaleTimeString(['en'], {
                  hour: "2-digit",
                  minute: "2-digit"
                })} - {state.schedule.current_show.end_time.toLocaleTimeString(['en'], {
                  hour: "2-digit",
                  minute: "2-digit"
                })}
                </p>
                <p className={`${styles.Show_Title} notranslate`}>{state.schedule.current_show.title}</p>
                {state.schedule.current_show.description !== "" ?
                  <p className={styles.Show_Excerpt}>{state.schedule.current_show.description}</p> : <></>}
              </button>
            </div>


            <div className={styles.ImageContainer}>
              <span className={styles.ImageOverlay}/>
              <Image
                className={styles.Image}
                src={state.schedule.current_show.img ? state.schedule.current_show.img : fallback}
                alt={"Cover image for the show: " + state.schedule.current_show.title}
                height={233}
                width={233}
                priority
              />
            </div>

          </div>
        )
      }

      <div
        className={state.schedule.next_shows.length == 0 ? `${styles.Player_Right} ${styles.Player_Right_Empty}` : styles.Player_Right}>
        <h2 className={`${styles.Header}`}>Coming up</h2>


          <div className={styles.ScrollWrapper}>
            {
              state.error ? (
                  <div className={styles.EmptyScheduleMessage}>
                    There was an error retrieving data
                  </div>
              ) : shows_list.length > 0 ? (
                <HScroll color={"#32103F"}>
                  <div className={styles.ShowList}>
                    {shows_list}
                  </div>
                </HScroll>
              ) : (
                <div className={styles.EmptyScheduleMessage}>
                  <p>That&apos;s it for now! Our schedule is empty, but check back later for new shows to come!</p>
                </div>
              )
            }
        </div>
      </div>

    </div>
  )
}
