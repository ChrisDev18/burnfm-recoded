"use client"

import styles from "@/app/schedule/page.module.css";
import React, {useEffect, useState} from "react";
import {getSchedule} from "@/app/lib/fetchdata";
import buttons from "@/app/styles/buttons.module.css";
import Image from "next/image";
import fallback from "../../../public/Radio-Microphone.png";
import {Show} from "@/app/lib/types";
import { motion } from "framer-motion";

export default function ScheduleList({day}: { day: number }) {
  const [schedule, setSchedule] = useState<Show[]>([]);

  useEffect(() => {
    getSchedule().then(s => setSchedule(s[day]));
  }, [day]);

  const isJavaScriptEnabled = typeof window !== 'undefined'

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

  if (schedule.length > 0)
    return (

        <motion.div className={styles.ScheduleList}
                    transition={{duration: 0.2, type: "tween", delay: 0.2}}
                    initial={isJavaScriptEnabled ? {opacity: 0} : {opacity: 1}}
                    animate={{opacity: 1}}>
          {list}
        </motion.div>
    );
  else
    return (
        <motion.p className={styles.emptyMessage}
                  transition={{duration: 0.2, type: "tween", delay: 0.2}}
                  initial={isJavaScriptEnabled ? {opacity: 0} : {opacity: 1}}
                  animate={{opacity: 1}}>
          Nothing scheduled on this day.
        </motion.p>
    );
}