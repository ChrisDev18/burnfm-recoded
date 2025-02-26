import React, {useEffect, useReducer} from "react";
import {getShow} from "@/lib/api";
import {notFound} from "next/navigation";

import styles from "./ShowDetailsPage.module.css"
import Image from "next/image";
import { motion } from "motion/react";
import {initialState, showReducer} from "@/reducers/showReducer";
import loading_styles from "@/app/styles/Spinner.module.css";


export default function ShowDetailsPage({id}: {id: number}) {
  const [state, dispatch] = useReducer(showReducer, initialState);

  useEffect(() => {
    const fetchShow = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const show = await getShow(id);
        dispatch({ type: 'FETCH_SUCCESS', payload: show });
      } catch (error: any) {
        dispatch({
          type: 'FETCH_FAILURE',
          payload: error.message || 'An unexpected error occurred',
        });
      }
    };

    fetchShow().then();
  }, [id]);

  if (state.loading)
    return (
      <>
        <p className={styles.emptyMessage}>Loading</p>
        <div className={`${loading_styles.Spinner} ${loading_styles.Light}`}/>
      </>
    );

  if (state.error == "404 - not found")
    return notFound();

  if (state.error || !state.show)
    return (
        <>
          <p className={styles.emptyMessage}>{state.error}</p>
          <p className={styles.emptyMessage}>An error occurred whilst trying to retrieve the schedule</p>
        </>
    );



  const isJavaScriptEnabled = typeof window !== 'undefined';

  return (
      <motion.div className={styles.root}
                  transition={{duration: 0.2, type: "tween", delay: 0.2}}
                  initial={isJavaScriptEnabled ? {opacity: 0} : {opacity: 1}}
                  animate={{opacity: 1}}>

        <div className={styles.hero}>
          {state.show?.photo ?
              <>
                <Image className={styles.image}
                       src={"https://api.burnfm.com/uploads/schedule_img/" + state.show.photo}
                       alt={"Cover photo for" + state.show.title}
                       height={400}
                       width={400}
                       priority
                />
                <h1 className={`notranslate ${styles.title}`}>{state.show?.title}</h1>
                {/*<p className={styles.times}>*/}
                {/*  {days[state.show?.day]}s {state.show?.start_time*/}
                {/*    .toLocaleTimeString(['en'], {hour: "2-digit", minute: "2-digit"})} - {state.show?.end_time*/}
                {/*    .toLocaleTimeString(['en'], {hour: "2-digit", minute: "2-digit"})}*/}
                {/*</p>*/}
              </>
              :
              <>
                <h1 className={`notranslate ${styles.title}`}>{state.show?.title}</h1>
                {/*<p className={styles.times}>*/}
                {/*  {days[state.show?.day]}s {state.show?.start_time*/}
                {/*    .toLocaleTimeString(['en'], {hour: "2-digit", minute: "2-digit"})} - {state.show?.end_time*/}
                {/*    .toLocaleTimeString(['en'], {hour: "2-digit", minute: "2-digit"})}*/}
                {/*</p>*/}
              </>
          }
        </div>

        <div className={styles.details}>
          {state.show?.description ?
              <p className={styles.description}>{state.show?.description}</p>
              :
              <p className={styles.placeholderText}>This show has no description</p>
          }

          {state.show?.hosts &&
              <div>
                  <h3 className={styles.sectionHeader}>Presented by</h3>
                  <p className={styles.hosts}>
                    { state.show.hosts.length > 1 ?
                        state.show.hosts.slice(0, -1).join(", ") + " and " + state.show.hosts[state.show.hosts.length - 1]
                      :
                        state.show.hosts[0]
                    }
                  </p>
              </div>
          }
        </div>

        <div className={styles.onDemand}>
          <h2>On demand</h2>
          <p>Listen back to previous episodes</p>

          <div>
            { state.show.recordings.map((recording, i) =>
                  <a key={i} href={"https://api.burnfm.com/" + recording.recording}>{recording.title}</a>
              )
            }

            { state.show.recordings.length == 0 &&
                <p className={styles.placeholderText}>No recordings for this show</p>
            }
          </div>

        </div>

      </motion.div>
  )
}