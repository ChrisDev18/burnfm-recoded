import styles from "@/app/components/Show/Show.module.css";
import Image from "next/image";
import fallback from "../../../../public/Radio-Microphone.png";
import {days, Show} from "@/lib/types";

export default function Show({show}: { show: Show }) {
  return (
    <div className={styles.Root}>
      <div className={styles.ImageContainer}>
        <span className={styles.ImageOverlay}/>
        <Image
          className={styles.Image}
          src={show.img ? show.img : fallback}
          alt={"Cover photo for the show: " + show.title}
          height={128}
          width={128}
          priority
        />
      </div>

      <div className={styles.Details}>
        <p className={styles.Show_Times}>
          {days[show.day].substring(0, 3)} {show.start_time.toLocaleTimeString(
            ['en'],
            {hour: "2-digit", minute: "2-digit"}
          )}
          {/* -*/}
          {/*{show.end_time.toLocaleTimeString(*/}
          {/*  ['en'],*/}
          {/*  {hour: "2-digit", minute: "2-digit"}*/}
          {/*)}*/}
        </p>
        <p className={`${styles.Show_Title} notranslate`}>{show.title}</p>
        {show.description != "" ? <p className={styles.Show_Excerpt}>{show.description}</p> : <></>}

      </div>
    </div>
  )
}