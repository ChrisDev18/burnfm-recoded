"use client"

import styles from "@/app/schedule/page.module.css";
import React, {ReactElement, useEffect, useReducer} from "react";
import {getSchedule} from "@/lib/api";
import { motion } from "motion/react";
import ScheduleItem from "@/app/components/ScheduleItem/ScheduleItem";
import {initialState, scheduleReducer} from "@/reducers/scheduleReducer";
import loading_styles from "@/app/styles/Spinner.module.css";


// The list of shows to be rendered on the schedule page.
export default function ScheduleList({day}: { day: number }) {
  const [state, dispatch] = useReducer(scheduleReducer, initialState);

  useEffect(() => {
    const fetchUser = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const user = await getSchedule(day);
        dispatch({ type: 'FETCH_SUCCESS', payload: user });
      } catch (error: any) {
        dispatch({
          type: 'FETCH_FAILURE',
          payload: error.message || 'An unexpected error occurred',
        });
      }
    };

    fetchUser();
  }, [day]);

  let message: ReactElement | ReactElement[];

  if (state.loading) {
    message = (
        <div className="flex flex-col items-center justify-center gap-2 grow">
          <div className={`${loading_styles.Spinner}`}/>
          <p className={styles.emptyMessage}>Loading</p>
        </div>
    );
  } else if (state.error || ! state.schedule) {
    message = (
        <div className="flex flex-col items-center justify-center gap-2 grow">
          <p className={styles.emptyMessage}>{state.error}</p>
          <p className={styles.emptyMessage}>An error occurred whilst trying to retrieve the schedule</p>
        </div>
    );
  } else if (state.schedule.length === 0) {
    message = (
        <div className="flex flex-col items-center justify-center gap-2 grow">
          <p className={styles.emptyMessage}>Nothing scheduled on this day</p>
        </div>
    );
  } else {
    return (
        <motion.div className={styles.ScheduleList}
                    transition={{duration: 0.2, type: "tween", delay: 0.2}}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}>
          {
            state.schedule.map((show, i) =>
                <ScheduleItem key={i} show={show}/>
            )
          }
        </motion.div>
    );
  }


  return message;
}