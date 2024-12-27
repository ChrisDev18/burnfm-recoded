'use client'

import styles from './page.module.css'
import React, {ReactElement, useEffect, useReducer} from "react";
import ProfileCard from "@/app/components/ProfileCard/ProfileCard";
import "@/app/styles/icons.css"
import {Profile} from "@/lib/types";
import {motion} from "framer-motion";
import {fetchClient} from "@/lib/api";
import {committeeReducer, initialState} from "@/reducers/committeeReducer";
import {COMMITTEE_ENDPOINT} from "@/lib/endpoints";

export default function AboutPage() {

  const [state, dispatch] = useReducer(committeeReducer, initialState);

  // Fetch data from json file
  useEffect(() => {
    const fetchCommittee = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const committee = await fetchClient<Profile[]>(COMMITTEE_ENDPOINT + "/2023-24.json");
        dispatch({ type: 'FETCH_SUCCESS', payload: committee });
      } catch (error: any) {
        dispatch({
          type: 'FETCH_FAILURE',
          payload: error.message || 'An error occurred',
        });
      }
    };

    fetchCommittee().then();
  }, []);

  let content: ReactElement | ReactElement[];

  // UI while loading
  if (state.loading) {
    content = (
        <p>Loading committee</p>
    );
  }

  // UI if there's an error
  if (state.error || ! state.committee) {
    content = (
        <div>
          <p>Could not retrieve the team</p>
          <p>More information: {state.error}</p>
        </div>
    );
  }

  // Usual content
  else {
    content = state.committee.map((profile, i) =>
        <ProfileCard key={i} profile={profile} priority={i<3}/>
    )
  }

  return (
      <>
        <p className={styles.Subtitle}>
          Burn FM runs thanks to its dedicated committee members.
          Find out a little more about their roles below (as well as a few favourite songs and fun facts).
        </p>

        <div className={styles.Team_Section}>
          <h2 className={styles.Header}>The Team</h2>

          <motion.div className={styles.ProfileGrid}
                      transition={{duration: 0.2, type: "tween", delay: 0.2}}
                      initial={{opacity: 0}}
                      animate={{opacity: 1}}>
            { content }
          </motion.div>
        </div>
      </>
  );

}