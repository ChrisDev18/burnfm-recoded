'use client'

import styles from './page.module.css'
import React, {useEffect, useState} from "react";
import ProfileCard from "@/app/components/ProfileCard/ProfileCard";
import "@/app/styles/icons.css"
import {Profile} from "@/app/lib/types";
import { motion } from 'framer-motion';

export default function AboutPage() {

  const [profiles, setProfiles] = useState<Profile[]>([])

  // Fetch data from json file
  useEffect(() => {
      async function fetchData() {
          try {
              const response = await fetch('/committee/2024-25.json');
              if (!response.ok)
                  throw new Error('Network response was not ok');
              const data = await response.json();
              setProfiles(data as Profile[]); // Do something with the fetched JSON data
          } catch (error) {
              console.error('There was a problem fetching the profile_data - ', error);
          }
      }

      fetchData().then();
  }, []);

  const profile_list: React.JSX.Element[] = profiles.map((profile, i) =>
    <ProfileCard key={i} profile={profile} priority={i<3}/>
  );

  return (
      <>
        <p className={styles.Subtitle}>
          BurnFM runs thanks to its dedicated committee members.
          Find out a little more about their roles below (as well as a few favourite songs and fun facts).
        </p>

        <div className={styles.Team_Section}>
          <h2 className={styles.Header}>The Team</h2>

          <motion.div className={styles.ProfileGrid}
                      transition={{duration: 0.2, type: "tween", delay: 0.2}}
                      initial={{opacity: 0}}
                      animate={{opacity: 1}}>
            {profile_list}
          </motion.div>
        </div>
      </>
);
}