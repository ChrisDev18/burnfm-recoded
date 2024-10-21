import styles from "./ScheduleItem.module.css";

import Image from "next/image";
import fallback from "../../../../public/Radio-Microphone.png";
import React from "react";
import Link from "next/link";

import "@/app/styles/icons.css";
import {Show} from "@/app/lib/types";

// An item shown in ScheduleList.
export default function ScheduleItem({
  show
}: {
  show: Show
}) {

  const duration = Math.round((show.end_time.getTime() - show.start_time.getTime()) / (1000 * 60 * 60));
  const timeString = show.start_time.toLocaleTimeString(['en'], {hour: "2-digit", minute: "2-digit"});

  return (
      <Link href={"/show?id=" + show.id} className={`${styles.root}`}>

        {/*<Image src={img !== null ? img : fallback.src}*/}
        {/*       className={styles.img}*/}
        {/*       alt={"Cover photo for the show: " + title}*/}
        {/*       height={140}*/}
        {/*       width={140}*/}
        {/*/>*/}

        <div className={styles.ImageContainer}>
          <span className={styles.ImageOverlay}/>
          <Image src={show.img !== "" ? show.img : fallback.src}
                 className={styles.img}
                 alt={"Cover photo for the show: " + show.title}
                 height={140}
                 width={140}
          />
        </div>

        <div className={styles.right}>
          <div className={styles.details}>
            <p className={styles.timing}>{timeString} - {duration == 1 ? `${duration} Hour` : `${duration} Hours`}</p>
            <div className={styles.info}>
              <h3 className={`${styles.title} notranslate`}>{show.title}</h3>
              <p className={styles.excerpt}>{show.description !== "" ? show.description : "This show has no excerpt"}</p>
            </div>
          </div>


          <span className={`${styles.icon} material-symbols-rounded notranslate`}>
            chevron_right
          </span>
        </div>

      </Link>
  );
}