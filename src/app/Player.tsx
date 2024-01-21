'use client'

import styles from "@/app/Player.module.css";
import {useEffect, useState} from "react";
import Image from "next/image";


type Show = {
  title: string,
  excerpt: string,
  start_time: Date,
  end_time: Date,
  img: string
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

      if (now >= show.start_tza && now <= show.end_tza) {
        // this is current show - assign current_show field
        schedule.current_show = {
          title: show.content[1].display_title,
          excerpt: show.content[1].excerpt,
          img: decode_url(show.content[0].body),
          start_time: new Date(parseInt(show.start_tza)),
          end_time: new Date(parseInt(show.end_tza))
        }
      }

      else {
        let img_url = decode_url(show.content[0].body);
        let newShow: Show = {
          title: show.content[1].display_title,
          excerpt: show.content[1].excerpt,
          img: img_url,
          start_time: new Date(parseInt(show.start_tza)),
          end_time: new Date(parseInt(show.end_tza))
        }
        schedule.next_shows.push(newShow);
      }
    });
    console.log(schedule)
    return schedule;
  }

  async function handleToggle() {
    let player = document.getElementsByTagName('audio')[0];

    if (playing) {
      player.pause();
      setPlaying( false);
    } else {
      try {
        await player.play();
        setPlaying(true);

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
          <div className={styles.PlayNow}>
            <h2 className={styles.Header}>Off air</h2>
            <p className={styles.ShowExcerpt}>
              See the schedule to know when we&apos;re broadcasting next and who&apos;s on the airwaves!
              {/*We&apos;re currently working on some updates behind the scenes... or it&apos;s a holiday.*/}
            </p>
            <p className={styles.ShowExcerpt}>
              Maybe in the meantime check out our podcasts, for easy anytime listening...
              {/*We&apos;re currently working on some updates behind the scenes... or it&apos;s a holiday.*/}
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
              src={schedule.current_show.img}
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
          <div className={styles.ShowList}>
            {shows_list.length > 0 ?
              shows_list :
              <p className={styles.ShowTimes}>
                There is nothing scheduled for the time being
              </p>
            }
          </div>
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
          src={show.img}
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