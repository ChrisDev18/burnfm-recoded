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

  const list = schedule.map((show, i) => <ScheduleItem key={i} show={show}/>);

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