"use client"

import React from "react";
import ScheduleList from "@/app/schedule/ScheduleList";
import {notFound, useSearchParams} from "next/navigation";
import styles from "./page.module.css"
import '@/app/styles/icons.css';
import HScroll from "@/app/components/HScroll/HScroll";
import Pills from "@/app/components/Pills/Pills";
import {motion} from "framer-motion";


export default function SchedulePage() {
  const searchParams = useSearchParams();
  let day = searchParams.get('day');
  const isJavaScriptEnabled = typeof window !== 'undefined'

  // // if no day argument is given, set the current day to today
  // if (!day) return router.push(`/schedule?day=${new Date().getDay()}`)

  if (!day) return (
      <motion.div className={styles.root}
                  transition={{duration: 0.2, type: "tween", delay: 0.2}}
                  initial={isJavaScriptEnabled ? {opacity: 0} : {opacity: 1}}
                  animate={{opacity: 1}}>
        <div className={styles.headerSection}>
          <h1 className={styles.header}>Show Schedule</h1>
          <HScroll color={"rgba(93, 31, 116)"}>
            <Pills data={[
              {link: "/schedule/", text: "Monday", params: {day: "1"}},
              {link: "/schedule/", text: "Tuesday", params: {day: "2"}},
              {link: "/schedule/", text: "Wednesday", params: {day: "3"}},
              {link: "/schedule/", text: "Thursday", params: {day: "4"}},
              {link: "/schedule/", text: "Friday", params: {day: "5"}},
              {link: "/schedule/", text: "Saturday", params: {day: "6"}},
              {link: "/schedule/", text: "Sunday", params: {day: "0"}}
            ]}
                   className={styles.Selector}
            />
          </HScroll>
        </div>
        <div className={styles.content}>
          <p className={styles.emptyMessage}>No day selected</p>
        </div>
      </motion.div>
  );

  const dayNumber = parseInt(day);
  if (isNaN(dayNumber) || dayNumber < 0 || dayNumber > 6) return notFound();

  return (
      <motion.div className={styles.root}
                  transition={{duration: 0.2, type: "tween", delay: 0.2}}
                  initial={isJavaScriptEnabled ? {opacity: 0} : {opacity: 1}}
                  animate={{opacity: 1}}>
        <div className={styles.headerSection}>
          <h1 className={styles.header}>Show Schedule</h1>
          <HScroll color={"rgba(93, 31, 116)"}>
            <Pills data={[
              {link: "/schedule/", text: "Monday", params: {day: "1"}},
              {link: "/schedule/", text: "Tuesday", params: {day: "2"}},
              {link: "/schedule/", text: "Wednesday", params: {day: "3"}},
              {link: "/schedule/", text: "Thursday", params: {day: "4"}},
              {link: "/schedule/", text: "Friday", params: {day: "5"}},
              {link: "/schedule/", text: "Saturday", params: {day: "6"}},
              {link: "/schedule/", text: "Sunday", params: {day: "0"}}
            ]}
                   className={styles.Selector}
            />
          </HScroll>
        </div>
        <div className={styles.content}>
          <ScheduleList day={dayNumber}/>
        </div>
      </motion.div>
  );
}