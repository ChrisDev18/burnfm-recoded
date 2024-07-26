import {getSchedule} from "@/app/lib/fetchdata";
import styles from "./page.module.css";
import buttons from "@/app/styles/buttons.module.css";
import Image from "next/image";
import fallback from "../../../../public/Radio-Microphone.png";
import React from "react";

export default async function SchedulePage({ params }: { params: { day: number } }) {
  const schedule = (await getSchedule())[params.day]

  const list = schedule.map((show, i) => {

        const duration = Math.round((show.end_time.getTime() - show.start_time.getTime()) / (1000 * 60 * 60))
        const time_string = show.start_time.toLocaleTimeString(['en'], {hour: "2-digit", minute: "2-digit"})

        return (
            <button className={`${styles.ShowItem} ${buttons.Clickable}`} key={i}>

              <Image src={show.img !== null ? show.img : fallback.src}
                     alt={"Cover photo for the show: " + show.title}
                     height={100}
                     width={100}
              />

              <div className={styles.ShowDetails}>
                <p>{time_string} - {duration == 1? `${duration} Hour` : `${duration} Hours`}</p>
                <h3 className={"notranslate"}>{show.title}</h3>
                <p className={styles.ShowExcerpt}>{show.excerpt}</p>
              </div>

            </button>
        )
      });

  return (
      <div className={styles.ScheduleList}>
        {list}
      </div>
  );
}

export async function generateStaticParams() {
  return [0,1,2,3,4,5,6].map((day) => ({
    day: day.toString(),
  }))
}