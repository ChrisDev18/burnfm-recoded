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
          {state.show?.photo &&
              <Image className={styles.image}
                     src={state.show.photo}
                     alt={"Cover photo for" + state.show.title}
                     height={400}
                     width={400}
                     priority
              />
          }

          <h1 className={`notranslate ${styles.title}`}>{state.show?.title}</h1>
          {state.show?.hosts &&
            <h3 className={styles.sectionHeader}>
              Presented by { state.show.hosts.length > 1 ?
                  <>
                    <strong>{state.show.hosts.slice(0, -1).join(", ")}</strong> and <strong>{state.show.hosts[state.show.hosts.length - 1]}</strong>
                  </>
                  :
                  <strong>{state.show.hosts[0]}</strong>
              }
            </h3>
          }
        </div>

        <div className={styles.details}>
          {state.show?.description ?
              <p className={styles.description}>{state.show?.description}</p>
              :
              <p className={styles.placeholderText}>This show has no description</p>
          }
        </div>

        <div className={styles.onDemand}>
          <h2>On demand</h2>
          <p>Listen back to previous episodes, recorded every hour</p>

          <div>

            { state.show.recordings.length == 0 ? (
                <p className={styles.placeholderText}>No recordings for this show</p>
                ) : <>
                  { state.show.recordings
                      .toSorted((a, b) => a.recorded_at.getTime() - b.recorded_at.getTime())
                      .map((recording, i) =>
                          <a key={i} href={"https://api.burnfm.com/" + recording.recording}>{recording.title}</a>
                      )
                  }
                </>
            }




          </div>

        </div>

      </motion.div>
  )
}