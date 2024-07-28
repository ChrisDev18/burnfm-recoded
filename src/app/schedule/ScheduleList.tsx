"use client"

import styles from "@/app/schedule/page.module.css";
import React, {useEffect, useState} from "react";
import {getSchedule} from "@/app/lib/fetchdata";
import {Show} from "@/app/lib/types";
import { motion } from "framer-motion";
import ScheduleItem from "@/app/components/ScheduleItem/ScheduleItem";

// The list of shows to be rendered on the schedule page.
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
        <ScheduleItem key={i}
                      title={show.title}
                      img={show.img}
                      excerpt={show.excerpt}
                      duration={duration}
                      timeString={time_string}/>
    )
  });

  if (schedule.length > 0) return (
      <motion.div className={styles.ScheduleList}
                  transition={{duration: 0.2, type: "tween", delay: 0.2}}
                  initial={isJavaScriptEnabled ? {opacity: 0} : {opacity: 1}}
                  animate={{opacity: 1}}>
        {list}
      </motion.div>
  );

  return (
      <motion.p className={styles.emptyMessage}
                transition={{duration: 0.2, type: "tween", delay: 0.2}}
                initial={isJavaScriptEnabled ? {opacity: 0} : {opacity: 1}}
                animate={{opacity: 1}}>
        Nothing scheduled on this day.
      </motion.p>
  );
}