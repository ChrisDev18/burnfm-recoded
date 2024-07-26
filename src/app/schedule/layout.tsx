"use client"

import {AnimatePresence, motion} from "framer-motion";
import styles from "./layout.module.css";
import Pills from "@/app/components/Pills/Pills";


export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
      <motion.div className={styles.Root}
                  transition={{ duration: 0.2, type: "tween", delay: 0.2}}
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}>
        <div className={styles.headerSection}>
          <h1 className={styles.Header}>Show Schedule</h1>
          <Pills data={[
            {link: "/schedule/1/", text: "Monday"},
            {link: "/schedule/2/", text: "Tuesday"},
            {link: "/schedule/3/", text: "Wednesday"},
            {link: "/schedule/4/", text: "Thursday"},
            {link: "/schedule/5/", text: "Friday"},
            {link: "/schedule/6/", text: "Saturday"},
            {link: "/schedule/0/", text: "Sunday"}
          ]}
                 className={styles.Selector}
          />
        </div>
        {children}
      </motion.div>
  )
}