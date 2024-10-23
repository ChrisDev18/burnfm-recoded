import {useEffect, useState} from "react";
import {getShow} from "@/app/lib/fetchdata";
import {notFound} from "next/navigation";
import {Show} from "@/app/lib/types"

import styles from "./ShowDetailsPage.module.css"
import Image from "next/image";
import { motion } from "framer-motion";

export default function ShowDetailsPage({id}: {id: number}) {
  const [show, setShow] = useState<Show|null|undefined>(null);

  useEffect(() => {
    getShow(id).then(show => setShow(show))
  }, [id]);

  if (show === undefined) return notFound();

  const isJavaScriptEnabled = typeof window !== 'undefined'


  return (
      <motion.div className={styles.root}
                  transition={{duration: 0.2, type: "tween", delay: 0.2}}
                  initial={isJavaScriptEnabled ? {opacity: 0} : {opacity: 1}}
                  animate={{opacity: 1}}>
        {show?.img ?
            <Image className={styles.image} src={show.img} alt={"Cover photo for" + show.title} height={400} width={400} priority />
            :
            <div className={styles.imgPlaceholder}>
              <span className={`${styles.icon} material-symbols-rounded notranslate`}>interpreter_mode</span>
            </div>
        }

        <div className={styles.details}>
          <div>
            <h1 className={`notranslate ${styles.title}`}>{show?.title}</h1>
            <p className={styles.times}>
              {show?.day}s {show?.start_time
                  .toLocaleTimeString(['en'], {hour: "2-digit", minute: "2-digit"})} - {show?.end_time
                .toLocaleTimeString(['en'], {hour: "2-digit", minute: "2-digit"})}
            </p>
          </div>

          {show?.description !== "" ?
              <p>{show?.description}</p>
              :
              <p className={styles.placeholderText}>This show has no excerpt</p>
          }

          {show?.hosts &&
              <div>
                  <h2>Presented by</h2>
                  <p>{show.hosts}</p>
              </div>
          }
        </div>

      </motion.div>
  )
}