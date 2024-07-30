import {useEffect, useState} from "react";
import {getShow} from "@/app/lib/fetchdata";
import {notFound} from "next/navigation";
import {Show} from "@/app/lib/types"

import styles from "./ShowDetailsPage.module.css"
import Image from "next/image";

export default function ShowDetailsPage({id}: {id: number}) {
  const [show, setShow] = useState<Show|null|undefined>(null);

  useEffect(() => {
    getShow(id).then(show => setShow(show))
  }, [id]);

  if (show === undefined) return notFound();

  return (
      <div className={styles.root}>
        {show?.img ?
            <Image src={show.img} alt={"Cover photo for" + show.title}/>
            :
            <div className={styles.imgPlaceholder}>
              <span className={`${styles.icon} material-symbols-rounded notranslate`}>interpreter_mode</span>
            </div>
        }

        <div className={styles.details}>
          <div>
            <h1 className={styles.title}>{show?.title}</h1>
            <p className={styles.times}>
              {show?.start_time.toLocaleDateString("en", {weekday: "long"})}s {show?.start_time
                  .toLocaleTimeString(['en'], {hour: "2-digit", minute: "2-digit"})} - {show?.end_time
                .toLocaleTimeString(['en'], {hour: "2-digit", minute: "2-digit"})}
            </p>
          </div>

          {show?.excerpt !== "" ?
              <p>{show?.excerpt}</p>
              :
              <p className={styles.placeholderText}>This show has no excerpt</p>
          }
        </div>

      </div>
  )
}