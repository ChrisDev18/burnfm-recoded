import styles from "@/app/components/Show.module.css";
import Image from "next/image";
import fallback from "../../../public/Radio-Microphone.png";
import {Show} from "@/app/lib/types";

export default function Show({show}: { show: Show }) {
  return (
    <div className={styles.Root}>
      <div className={styles.ImageContainer}>
        <span className={styles.ImageOverlay}/>
        <Image
          className={styles.Image}
          src={show.img === null? fallback : show.img}
          alt={"Cover photo for the show: " + show.title}
          height={128}
          width={128}
          priority
        />
      </div>

      <div className={styles.Details}>
        <p className={styles.Show_Times}>
          {show.start_time.toLocaleTimeString(
            ['en'],
            {weekday: "short", hour: "2-digit", minute: "2-digit"}
          )}
           -
          {show.end_time.toLocaleTimeString(
            ['en'],
            {hour: "2-digit", minute: "2-digit"}
          )}
        </p>
        <p className={`${styles.Show_Title} notranslate`}>{show.title}</p>
        {show.excerpt != "" ? <p className={styles.Show_Excerpt}>{show.excerpt}</p> : <></>}

      </div>
    </div>
  )
}