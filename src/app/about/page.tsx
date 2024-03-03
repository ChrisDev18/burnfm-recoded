import styles from './page.module.css'
import React from "react";
import ProfileCard from "@/app/about/ui/ProfileCard";
// import {getProfiles} from "@/app/lib/fetchdata";
import "@/app/icons.css"
import {Profile} from "@/app/lib/types";
import {promises as fs} from "fs";

async function getProfiles(): Promise<Profile[]> {
  let profiles: Profile[] = [];

  try {
    let rawData = await fs.readFile('public/user_profile.json', 'utf8');
    profiles = JSON.parse(rawData);
  } catch (e) {
    console.error("error: " + e);
  }

  return profiles;
}

export default async function AboutUs() {
  const profiles: Profile[] = await getProfiles();

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