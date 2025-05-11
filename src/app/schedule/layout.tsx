import React, {Suspense} from 'react';
import styles from "@/app/schedule/schedule.module.css";
import HScroll from "@/app/components/HScroll/HScroll";
import PillNavbar from "@/app/components/PillNavbar/PillNavbar";
import Motion from "@/app/components/motion";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <Motion type={"div"}
            className={styles.root}
            transition={{ duration: 0.2, type: "tween", delay: 0.2}}
            initial={{opacity: 0}}
            animate={{opacity: 1}}>
        <div className={styles.headerSection}>
          <h1 className={styles.header}>Show Schedule</h1>
          <Suspense>
            <HScroll color={"rgba(93, 31, 116)"} className={"-m-1"}>
              <PillNavbar
                  className={styles.Selector}
                  data={[
                    { link: "/schedule/1", text: "Monday" },
                    { link: "/schedule/2", text: "Tuesday" },
                    { link: "/schedule/3", text: "Wednesday" },
                    { link: "/schedule/4", text: "Thursday" },
                    { link: "/schedule/5", text: "Friday" },
                    { link: "/schedule/6", text: "Saturday" },
                    { link: "/schedule/0", text: "Sunday" }
                  ]}
              />
            </HScroll>
          </Suspense>
        </div>
        { children }
      </Motion>
  );
}