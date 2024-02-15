'use client'

import styles from './page.module.css'
import React, {useEffect, useState} from "react";
import ProfileCard from "@/app/about/ui/ProfileCard";
import {Profile} from "@/app/lib/types";
import {getProfiles} from "@/app/lib/fetchdata";

export default function AboutUs() {
  const [profiles, setProfiles] = useState<Profile[]>([])

  useEffect(() => {
    getProfiles()
      .then((x) => setProfiles(x))
      .catch((e) => console.error("Error when fetching profiles: " + e))
  }, []);

  const profile_list = profiles.map((profile, i) =>
    <ProfileCard key={i} profile={profile}/>
  );

  return (
    <div className={styles.Root}>
      <div className={styles.Rectangle}/>
      <div className={styles.Header_Section}>
        <h1 className={styles.Header}>About us</h1>
        <p className={styles.Subtitle}>
          BurnFM runs thanks to its dedicated committee members,
          each voted bi-yearly at AGMs (Annual Group Meetings).
        </p>
      </div>

      <div className={styles.Team_Section}>
        <h2 className={styles.Header}>The Team</h2>

        <div className={styles.ProfileGrid}>
          {profile_list}
        </div>
      </div>

    </div>
  );
}