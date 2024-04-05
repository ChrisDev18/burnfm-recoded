'use client'

import styles from './page.module.css'
import React, {Suspense, useEffect, useState} from "react";
import ProfileCard from "@/app/about/ui/ProfileCard";
import "@/app/ui/icons.css"
import {Profile} from "@/app/lib/types";

export default function AboutUs() {

  const [profiles, setProfiles] = useState<Profile[]>([])

  useEffect(() => {
    fetch('/user_profile.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setProfiles(data as Profile[]);    // Do something with the fetched JSON data
      })
      .catch(error => {
        console.error('There was a problem fetching the profile_data - ', error);
      });
  }, []);

  const profile_list: React.JSX.Element[] = profiles.map((profile, i) =>
    <ProfileCard key={i} profile={profile}/>
  );

  return (
    <div className={styles.Root}>
      <div className={styles.Rectangle}/>
      <div className={styles.Header_Section}>
        <h1 className={styles.Header}>About us</h1>
        <p className={styles.Subtitle}>
          BurnFM runs thanks to its dedicated committee members.
          Find out a little more about their roles below (as well as a few favourite songs and fun facts).
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