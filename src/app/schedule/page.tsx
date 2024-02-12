'use client'

import styles from './page.module.css'
import {useEffect, useState} from "react";
import {getNowPlaying, getWholeSchedule} from "@/app/lib/fetchdata";
import {ShowSchedule} from "@/app/lib/types";
import Image from "next/image";
import fallback from "../../../public/Radio-Microphone.png";
import {Show} from "@/app/lib/types";


const empty_schedule: Show[][] = []


let Schedule: Show[][] = [];


export default function SchedulePage() {

  const [loading, setLoading] = useState(true);
  const [schedule, setSchedule] = useState<Show[][]>([[],[],[],[],[],[],[]])

  useEffect(() => {
    setLoading(true);
    getWholeSchedule()
      .then(x => setSchedule(x))
      .catch(e => console.error("Error: ", e))
      .finally(() => setLoading(false))
  }, []);

  const ShowList = schedule.map((day, i) =>
    day.map((show, j) => {

      const duration = Math.round((show.end_time.getTime() - show.start_time.getTime()) / (1000 * 60 * 60))
      const time_string = show.start_time.toLocaleTimeString(['en'], {hour: "2-digit", minute: "2-digit"})

      return (
        <div className={styles.ShowItem} key={(i * 10) + j}>
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
      }
    )
  );


  return (
    <>
      <h1>Show Schedule</h1>
      <div className={styles.ScheduleList}>
        <h2>Monday</h2>
        {ShowList[1]}
        <h2>Tuesday</h2>
        {ShowList[2]}
        <h2>Wednesday</h2>
        {ShowList[3]}
        <h2>Thursday</h2>
        {ShowList[4]}
        <h2>Friday</h2>
        {ShowList[5]}
        <h2>Saturday</h2>
        {ShowList[6]}
        <h2>Sunday</h2>
        {ShowList[0]}
      </div>
    </>
  );
}