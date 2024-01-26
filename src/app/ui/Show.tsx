import styles from "@/app/ui/Show.module.css";
import Image from "next/image";
import fallback from "../../../public/Radio-Microphone.png";
import {Show} from "@/app/lib/types";

export default function Show({show}: { show: Show }) {
  return (
    <div className={styles.ShowGroup}>
      <div className={styles.ShowImageContainer}>
        <span/>
        <Image
          src={show.img === null? fallback : show.img}
          alt={"Cover photo for the show: " + show.title}
          height={124}
          width={124}
        />
      </div>

      <div className={styles.Details}>
        <p className={styles.ShowTimes}>
          {show.start_time.toLocaleTimeString(['en'], {
            weekday: "short",
            hour: "2-digit",
            minute: "2-digit"
          })} - {show.end_time.toLocaleTimeString(['en'], {hour: "2-digit", minute: "2-digit"})}
        </p>
        <p className={styles.ShowTitle}>{show.title}</p>
        <p className={styles.ShowExcerpt}>{show.excerpt}</p>
      </div>
    </div>
  )
}