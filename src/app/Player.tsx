'use client'

import styles from "@/app/Player.module.css";
import {useEffect, useState} from "react";
import Image from "next/image";
import fallback from "../../public/Radio-Microphone.png"


type Show = {
  title: string,
  excerpt: string,
  start_time: Date,
  end_time: Date,
  img: string | null
}

type Schedule = {
  current_show: Show | null,
  next_shows: Show[]
}

const empty_schedule: Schedule = {
  current_show: null,
  next_shows: []
}

export default function Player() {
  const [playing, setPlaying] = useState(false);
  const [schedule, setSchedule] = useState(empty_schedule)

  // effect for handling mediaSession
  useEffect(() => {
    // Check if the Media Session API is supported by the browser
    if ('mediaSession' in navigator) {
      // Set up the media session metadata
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: schedule.current_show?.title,
        artist: "BurnFM",
        artwork: [
          { src: schedule.current_show?.img == null ? fallback.src : schedule.current_show.img, sizes: '192x192', type: 'image/jpeg' },
        ],
      });

      // Set up the media session actions
      navigator.mediaSession.setActionHandler('play', function() {
        // console.log("Attempting to play");
        // console.log("Current playing state: ", playing)

        handleToggle()
          .then(() => {
            setPlaying(true)
            navigator.mediaSession.playbackState = "playing";
          }).catch(e => {
            console.error("Could not toggle", e);
          })
      });

      navigator.mediaSession.setActionHandler('pause', function() {
        // console.log("Attempting to pause");
        // console.log("Current playing state: ", playing)
        handleToggle()
          .then(() => {
            navigator.mediaSession.playbackState = "paused";
          }).catch(e => {
            console.error("Could not toggle", e);
          })
      });
    } else {
      console.warn('Media Session API not supported.');
    }

    // Clean up the event listeners when the component unmounts
    return () => {
      // Remove event listeners
      navigator.mediaSession.setActionHandler('play', null);
      navigator.mediaSession.setActionHandler('stop', null);
    };
  }, [schedule.current_show]);

  // effect for fetching data from API
  useEffect(() => {
    function update() {
      getSchedule()
        .then(x => setSchedule(x))
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

  function decode_url(body: string) {
    // console.log("Splitting url");
    let tokens = body.split(":");
    // console.log("Tokens: " + tokens);

    let url = "https://api.broadcast.radio/api/image/" + tokens[1] + "." + tokens[0].split("/")[1] + "?g=center&w=400&h=400&c=true";
    // console.log("URL: " + url);
    return url;
  }

  async function getSchedule() {

    let schedule: Schedule = {
      current_show: null,
      next_shows: []
    };

    let res = await fetch("https://api.broadcast.radio/api/nowplaying/957");
    if (! res.ok) {
      console.error(res.statusText);
      return schedule;
    }

    let json = await res.json();


    json.body.schedule.forEach((show: any) => {

      let now = Date.now();

      let new_show: Show = {
        title: "",
        excerpt: "",
        img: null,
        start_time: new Date(parseInt(show.start_tza)),
        end_time: new Date(parseInt(show.end_tza)),
      };

      show.content.forEach((content: any) => {

        if (content.contentType.slug === "featuredImage") {
          new_show.img = decode_url(content.body);
        }

        if (content.contentType.slug === "show") {
          new_show.title = content.display_title;
          new_show.excerpt = content.excerpt;
        }
      });

      if (now >= show.start_tza && now <= show.end_tza) {
        // this is current show - assign current_show field
        schedule.current_show = new_show;

      } else {
        // this is a show in the schedule
        schedule.next_shows.push(new_show);
      }
    });
    // console.log(schedule)
    return schedule;
  }

  async function handleToggle() {
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
      // console.log("success pause")

    } else {
      try {
        await player.play();
        setPlaying(true);
        // console.log("success play")
      } catch (e) {
        throw new Error("This browser does not support mp3");
      }
    }
  }

  const shows_list = schedule.next_shows.map((show, i) =>
    <Show key={i} show={show} />
  );

  return (
    <div className={styles.Player}>
      {schedule.current_show == null ?
        <div className={styles.Left}>
          {/*/!**!/*/}
          {/*<audio id={"media"}>*/}
          {/*  <source src={"https://streaming.broadcastradio.com:8572/burnfm"} type={"audio/mp3"}/>*/}
          {/*</audio>*/}

          {/*<button className={styles.Button} onClick={handleToggle}>*/}
          {/*  <span className={"material-symbols-rounded"}>*/}
          {/*    {playing ? "stop" : "play_arrow"}*/}
          {/*  </span>*/}
          {/*</button>*/}
          {/*/!**!/*/}
          <div className={styles.PlayNow}>
            <h2 className={styles.Header}>Off air</h2>
            <p className={styles.OffAirMessage}>
              We&apos;re currently working on some updates behind the scenes... or it&apos;s a holiday.
              In the meantime, why not check out our podcasts for easy anytime listening?
            </p>
          </div>
        </div>
        :
        <div className={styles.Left}>

          <audio id={"media"}>
            <source src={"https://streaming.broadcastradio.com:8572/burnfm"} type={"audio/mp3"}/>
          </audio>

          <button className={styles.Button} onClick={handleToggle}>
            <span className={"material-symbols-rounded"}>
              {playing ? "stop" : "play_arrow"}
            </span>
          </button>

          <div className={styles.ImageContainer}>
            <span/>
            <Image
              className={styles.Image}
              src={schedule.current_show.img === null? fallback : schedule.current_show.img}
              alt={"Cover image for the show: " + schedule.current_show.title}
              height={233}
              width={233}
            />
          </div>

          <div className={styles.PlayNow}>
            <h2 className={styles.Header}>On now</h2>

            <div className={styles.Details}>
              <p className={styles.ShowTimes}>{schedule.current_show.start_time.toLocaleTimeString(['en'], {
                hour: "2-digit",
                minute: "2-digit"
              })} - {schedule.current_show.end_time.toLocaleTimeString(['en'], {
                hour: "2-digit",
                minute: "2-digit"
              })}</p>
              <p className={styles.ShowTitle}>{schedule.current_show.title}</p>
              <p className={styles.ShowExcerpt}>
                {schedule.current_show.excerpt !== "" ?
                  schedule.current_show.excerpt :
                  "This show has no excerpt"
                }
              </p>

            </div>
          </div>
        </div>
      }


      <div className={styles.ComingUp}>
        <h2 className={styles.Header}>Coming up</h2>

        <div className={styles.ScrollWrapper}>
          {shows_list.length > 0 ?
            <div className={styles.ShowList}>
              {shows_list}
            </div> :
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


function Show({show}: { show: Show }) {
  return (
    <div className={styles.ShowGroup}>
      <div className={styles.ShowImageContainer}>
        <span/>
        <Image
          src={show.img === null? fallback : show.img}
          alt={"Cover photo for the show: " + show.title}
          height={124}
          width={124}
        />
      </div>

      <div className={styles.Details}>
        <p className={styles.ShowTimes}>
          {show.start_time.toLocaleTimeString(['en'], {
            hour: "2-digit",
            minute: "2-digit"
          })} - {show.end_time.toLocaleTimeString(['en'], {hour: "2-digit", minute: "2-digit"})}
        </p>
        <p className={styles.ShowTitle}>{show.title}</p>
        <p className={styles.ShowExcerpt}>{show.excerpt}
          {show.excerpt !== "" ?
            show.excerpt :
            "This show has no excerpt"
          }
        </p>
      </div>
    </div>
  )
}