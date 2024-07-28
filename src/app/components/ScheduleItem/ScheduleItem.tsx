import styles from "./ScheduleItem.module.css";

import Image from "next/image";
import fallback from "../../../../public/Radio-Microphone.png";
import React from "react";
import Link from "next/link";

import "@/app/styles/icons.css";

// An item shown in ScheduleList.
export default function ScheduleItem({
  timeString,
  duration,
  title,
  excerpt,
  img
}: {
  timeString: string;
  duration: number;
  title: string;
  excerpt: string;
  img: string | null;
}) {

  return (
      <Link href={"/show?id=1"} className={`${styles.root}`}>

        {/*<Image src={img !== null ? img : fallback.src}*/}
        {/*       className={styles.img}*/}
        {/*       alt={"Cover photo for the show: " + title}*/}
        {/*       height={140}*/}
        {/*       width={140}*/}
        {/*/>*/}

        <div className={styles.ImageContainer}>
          <span className={styles.ImageOverlay}/>
          <Image src={img !== null ? img : fallback.src}
                 className={styles.img}
                 alt={"Cover photo for the show: " + title}
                 height={140}
                 width={140}
          />
        </div>

        <div className={styles.right}>
          <div className={styles.details}>
            <p className={styles.timing}>{timeString} - {duration == 1 ? `${duration} Hour` : `${duration} Hours`}</p>
            <div className={styles.info}>
              <h3 className={`${styles.title} notranslate`}>{title}</h3>
              <p className={styles.excerpt}>{excerpt !== "" ? excerpt : "This show has no excerpt"}</p>
            </div>
          </div>


          <span className={`${styles.icon} material-symbols-rounded`}>
          chevron_right
        </span>
        </div>

      </Link>
  );
}