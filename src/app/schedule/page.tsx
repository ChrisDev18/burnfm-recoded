'use client'

import styles from './page.module.css'
import {useEffect, useState} from "react";
import {getWholeSchedule} from "@/app/lib/fetchdata";
import {Day, days} from "@/app/lib/types";
import Image from "next/image";
import fallback from "../../../public/Radio-Microphone.png";
import {Show} from "@/app/lib/types";


const empty_schedule: Show[][] = []


let Schedule: Show[][] = [];


export default function SchedulePage() {

  const [loading, setLoading] = useState(true);
  const [schedule, setSchedule] = useState<Show[][]>([[],[],[],[],[],[],[]]);
  // @ts-ignore
  const [day, setDay] = useState<Day>(new Date().getDay())  // used to filter by day

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
        <div className={styles.ShowItem} key={i}>

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

        </div>
      )
    });

  // Update filter choice
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Number.parseInt(e.target.value);
    setDay(selected as Day);
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

      <div className={`${styles.ScheduleList} ${styles.Padded}`}>
        {ShowList}
      </div>
    </div>
  );
}