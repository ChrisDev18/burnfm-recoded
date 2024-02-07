import Image from "next/image";
import {Profile} from "@/app/lib/types";
import styles from "./ProfileCard.module.css"

export default function ProfileCard({profile}: {profile: Profile}) {
  return (
    <div className={styles.Root}>
      <Image className={styles.Image}
             src={profile.picture}
             alt={`Profile picture of ${profile.name}`}
             height={120}
             width={200}
      />

      <div className={styles.Content}>
        <p>{profile.title}</p>
        <p>{profile.name}</p>
        <p>{profile.description}</p>
        <p>{profile.favourite_song.title}</p>
      </div>
    </div>
  );
}