import styles from './page.module.css'
import React from "react";
import ProfileCard from "@/app/ui/ProfileCard";
import {Profile} from "@/app/lib/types";

function getProfiles(): Profile[] {
  return [{
    name: "name",
    description: "description",
    title: "title",
    picture: "path to photo",
    email: "email",
    favourite_song: {
      title: "song title",
      artist: "song artist"
    }
  }];
}

export default function AboutUs() {
  let profile_data = getProfiles();
  const profiles = profile_data.map((profile, i) =>
    <ProfileCard key={i} profile={profile}/>
  );

  return (
    <div className={styles.Main}>
      <h1>About us</h1>
      <p>
        BurnFM runs thanks to its dedicated committee members,
        each voted bi-yearly at AGMs (Annual Group Meetings).
      </p>

      <div className={styles.ProfileGrid}>
        {profiles}
      </div>
    </div>
  );
}