"use client"

import React, {useState} from 'react';
import {Profile} from "@/lib/types";
import styles from "@/app/about/about.module.css";
import PillTabBar from "@/app/components/PillTabBar/PillTabBar";
import ProfileCard from "@/app/components/ProfileCard/ProfileCard";
import Motion from "@/app/components/motion";
import {AnimatePresence} from "motion/react";

export default function CommitteeSection({committees}: {committees: {   start_year: number,   profiles: Profile[] }[]}) {
  const pillsData = committees.map(({start_year}, i) => {
    const nextYear = (start_year + 1).toString().slice(-2); // e.g., 2024 -> "25"
    const label = `${start_year}-${nextYear}`;
    return {
      id: i,
      text: label,
    };
  });

  const [committeeId, setCommitteeId] = useState(0);

  const handlePillSelect = (id: number) => {
    setCommitteeId(id);
  };

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, type: 'tween' } },
  };

  return (
      <div className={styles.Team_Section}>
        <h2 className={styles.Header}>The Team</h2>
        <PillTabBar className={styles.Selector} data={pillsData} onSelect={handlePillSelect} />
        <Motion className={styles.ProfileGrid}
                variants={variants}
                initial={'hidden'}
                animate={'visible'}
        >
          { committees[committeeId].profiles.map((profile, i) =>
              <AnimatePresence key={i}>
                <ProfileCard profile={profile} priority={i < 3} id={`${committeeId} ${i}`} />
              </AnimatePresence>
          )}
        </Motion>
      </div>
  );
}