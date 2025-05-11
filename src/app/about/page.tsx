import React from "react";
import {Metadata} from "next";
import styles from "@/app/about/about.module.css";
import Motion from "../components/motion";
import {getCommittees} from "@/lib/api";
import CommitteeSection from "@/app/about/CommitteeSection";

export const metadata: Metadata = {
  title: 'About - Burn FM',
}

export default async function AboutLayout() {
  const committees = await getCommittees();

  return (
      <Motion type={"div"}
              className={styles.Root}
              transition={{duration: 0.2, type: "tween", delay: 0.2}}
              initial={{opacity: 0}}
              animate={{opacity: 1}}>
        <div className={styles.Rectangle}/>
        <h1 className={styles.Header}>About us</h1>
        <p className={styles.Subtitle}>
          Burn FM runs thanks to its dedicated committee members.
          Find out a little more about their roles below (as well as a few favourite songs and fun facts).
        </p>
        <CommitteeSection committees={committees} />
      </Motion>
  );
}