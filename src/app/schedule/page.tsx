'use client'

import styles from './page.module.css'
import React, {useEffect, useState} from "react";
import {getWholeSchedule} from "@/app/lib/fetchdata";
import {Day, days, DefaultExcerpts, PopupState, Show as ShowType} from "@/app/lib/types";
import Image from "next/image";
import fallback from "../../../public/Radio-Microphone.png";
import {Show} from "@/app/lib/types";
import {Dialog, DialogContent} from "@/app/ui/Popup";
import showpopup from "@/app/ShowPopup.module.css";
import buttons from "@/app/buttons.module.css";
import {Close} from "@radix-ui/react-dialog";
import "@/app/icons.css"


const empty_schedule: Show[][] = []

let Schedule: Show[][] = [];

const init_popup: PopupState = {
  visible: false,
  img: fallback.src,
  title: "default title",
  excerpt: "default excerpt"
}


export default function SchedulePage() {

  const [loading, setLoading] = useState(true);
  const [schedule, setSchedule] = useState<Show[][]>([[],[],[],[],[],[],[]]);
  // @ts-ignore
  const [day, setDay] = useState<Day>(new Date().getDay())  // used to filter by day
  const [popup, setPopup] = useState(init_popup);

  // Fetch whole Schedule from API
  useEffect(() => {
    setLoading(true);
    getWholeSchedule()
      .then(x => setSchedule(x))
      .catch(e => console.error("Error: ", e))
      .finally(() => setLoading(false))
  }, []);

  // Map shows from schedule to UI elements
  const ShowList = schedule[day]
    .map((show, i) => {

      const duration = Math.round((show.end_time.getTime() - show.start_time.getTime()) / (1000 * 60 * 60))
      const time_string = show.start_time.toLocaleTimeString(['en'], {hour: "2-digit", minute: "2-digit"})

      return (
        <button className={`${styles.ShowItem} ${buttons.Clickable}`} key={i} onClick={() => selectShow(show)}>

          <Image src={show.img !== null ? show.img : fallback.src}
                 alt={"Cover photo for the show: " + show.title}
                 height={100}
                 width={100}
          />

          <div className={styles.ShowDetails}>
            <p>{time_string} - {duration == 1? `${duration} Hour` : `${duration} Hours`}</p>
            <h3>{show.title}</h3>
            <p className={styles.ShowExcerpt}>{show.excerpt}</p>
          </div>

        </button>
      )
    });

  // Update filter choice
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Number.parseInt(e.target.value);
    setDay(selected as Day);
  }

  // Displays the Popup with details for the current show
  function selectShow(show: ShowType) {
    setPopup({
      visible: true,
      title: show.title,
      excerpt: show.excerpt,
      img: show.img
    });
  }

  return (
    <div className={styles.Root}>
      <h1 className={styles.Padded}>Show Schedule</h1>

      <div className={`${styles.FilterList} ${styles.Padded}`}>
        { // Render the different day options as radio buttons
          days.map((x, i) => {
            i = (i+1) % 7;
            return (
              <div className={styles.FilterItem} key={i}>
                <input className={styles.RadioButton} id={`radio-${i}`} type={"radio"} name={"day_filter"} value={i}
                       checked={i == day} onChange={handleChange}/>
                <label htmlFor={`radio-${i}`}>{new Date().getDay() == i ? "Today" : days[i]}</label>
              </div>
            )
            }
          )
        }
      </div>

      <Dialog open={popup.visible} onOpenChange={(change) => setPopup({...popup, visible: change})}>
        <DialogContent>
          <div className={showpopup.Popup}>
            {popup.img !== null ?
              <Image className={showpopup.Image}
                     src={popup.img === null ? fallback.src : popup.img}  // clean this up once decided on fallback show artwork
                     alt={"Cover image for the show: " + popup.title}
                     height={120}
                     width={120}
              />
              : <></>
            }

            <h2>{popup.title}</h2>

            {
              popup.excerpt !== "" ?
                <p>{popup.excerpt}</p>
                :
                <p className={showpopup.Default}>{DefaultExcerpts[Math.floor(Math.random() * DefaultExcerpts.length)]}</p>
            }

            <Close className={`${showpopup.Close} ${styles.Clickable}`}>
              <span className={'material-symbols-rounded'}>close</span>
            </Close>
          </div>
        </DialogContent>
      </Dialog>

      <div className={`${styles.ScheduleList} ${styles.Padded}`}>
        {ShowList}
      </div>
    </div>
  );
}