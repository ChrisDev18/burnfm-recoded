import React from 'react';
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
          <h1 className={"text-white"}>Radio Shows</h1>
          <p className={"text-white mb-4"}>Discover all that Burn FM has to offer in the present... and the past.</p>
          <HScroll color={"rgba(93, 31, 116)"} className={"-m-1"}>
            <PillNavbar
                data={[
                  { link: "/shows", text: "All shows" },
                  { link: "/shows", text: "Committee Shows", params: {filter: "committee"}},
                  // { link: "/shows", text: "Current Shows", params: {filter: "current"} },
                  // { link: "/shows", text: "Past Shows", params: {filter: "previous"} }
                ]}
            />
          </HScroll>
        </div>
        { children }
      </Motion>
  );
}