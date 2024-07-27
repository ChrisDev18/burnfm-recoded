"use client"

import {motion} from "framer-motion";
import styles from "./layout.module.css";
import Pills from "@/app/components/Pills/Pills";
import HScroll from "@/app/components/HScroll/HScroll";


export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const isJavaScriptEnabled = typeof window !== 'undefined'

  return (
      <motion.div className={styles.Root}
                  transition={{ duration: 0.2, type: "tween", delay: 0.2}}
                  initial={isJavaScriptEnabled ? {opacity: 0} : {opacity: 1}}
                  animate={{opacity: 1}}>
        <div className={styles.headerSection}>
          <h1 className={styles.Header}>Show Schedule</h1>
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
        {children}
      </motion.div>
  )
}