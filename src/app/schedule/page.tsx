"use client"

import React, {Suspense} from "react";
import ScheduleList from "@/app/schedule/ScheduleList";
import {notFound, useSearchParams} from "next/navigation";
import styles from "./page.module.css"
import '@/app/styles/icons.css';
import HScroll from "@/app/components/HScroll/HScroll";
import Pills from "@/app/components/Pills/Pills";
import { motion } from "motion/react";


function SuspenseSchedulePage() {
  const searchParams = useSearchParams();
  let day = searchParams.get('day');

  if (!day) return (
      <motion.div className={styles.root}
                  transition={{duration: 0.2, type: "tween", delay: 0.2}}
                  initial={{opacity: 0}}
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
                  initial={{opacity: 0}}
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

        <motion.div className={styles.content}
                    transition={{duration: 0.2, type: "tween", delay: 0.2}}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}>
          <ScheduleList day={dayNumber}/>
        </motion.div>
      </motion.div>
  );
}

export default function SchedulePage() {
  return (
      <Suspense>
        <SuspenseSchedulePage />
      </Suspense>
  );
}