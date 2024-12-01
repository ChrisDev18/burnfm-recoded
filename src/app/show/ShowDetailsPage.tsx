import {useEffect, useState} from "react";
import {getShow} from "@/app/lib/fetchdata";
import {notFound} from "next/navigation";
import {Recording, Show} from "@/app/lib/types"

import styles from "./ShowDetailsPage.module.css"
import Image from "next/image";
import { motion } from "framer-motion";

export default function ShowDetailsPage({id}: {id: number}) {
  const [show, setShow] = useState<Show|null|undefined>(null);

  useEffect(() => {
    getShow(id).then(show => setShow(show))
  }, [id]);

  if (show === undefined) return notFound();

  const isJavaScriptEnabled = typeof window !== 'undefined';

  const recordings: Recording[] = []; // [{ id: 2, show_id: 2, recording: "idk", recorded_at: new Date()}]

  return (
      <motion.div className={styles.root}
                  transition={{duration: 0.2, type: "tween", delay: 0.2}}
                  initial={isJavaScriptEnabled ? {opacity: 0} : {opacity: 1}}
                  animate={{opacity: 1}}>

        <div className={styles.hero}>
          {show?.img ?
              <>
                <Image className={styles.image}
                       src={show.img}
                       alt={"Cover photo for" + show.title}
                       height={400}
                       width={400}
                       priority
                />
                <h1 className={`notranslate ${styles.title}`}>{show?.title}</h1>
                <p className={styles.times}>
                  {show?.day}s {show?.start_time
                    .toLocaleTimeString(['en'], {hour: "2-digit", minute: "2-digit"})} - {show?.end_time
                    .toLocaleTimeString(['en'], {hour: "2-digit", minute: "2-digit"})}
                </p>
              </>
              :
              <>
                <h1 className={`notranslate ${styles.title}`}>{show?.title}</h1>
                <p className={styles.times}>
                  {show?.day}s {show?.start_time
                    .toLocaleTimeString(['en'], {hour: "2-digit", minute: "2-digit"})} - {show?.end_time
                    .toLocaleTimeString(['en'], {hour: "2-digit", minute: "2-digit"})}
                </p>
              </>
          }
        </div>

        <div className={styles.details}>
          {show?.description ?
              <p className={styles.description}>{show?.description}</p>
              :
              <p className={styles.placeholderText}>This show has no description</p>
          }

          {show?.hosts &&
              <div>
                  <h3 className={styles.sectionHeader}>Presented by</h3>
                  <p className={styles.hosts}>{show.hosts}</p>
              </div>
          }
        </div>

        <div className={styles.onDemand}>
          <h2>On demand</h2>
          <p>Listen back to previous episodes</p>

          <div>
            {
              recordings.map((recording, i) =>
                  <a key={i} href={recording.recording}>{recording.recorded_at.toLocaleTimeString()}</a>
              )
            }

            {recordings.length == 0 &&
                <p className={styles.placeholderText}>No recordings for this show</p>
            }
          </div>

        </div>

      </motion.div>
  )
}