import React from "react";
import {notFound} from "next/navigation";
import {getSchedule} from "@/lib/api";
import {Metadata} from "next";
import styles from "@/app/schedule/schedule.module.css";
import ScheduleItem from "@/app/components/ScheduleItem/ScheduleItem";
import Motion from "@/app/components/motion";


export const metadata: Metadata = {
  title: 'Schedule - Burn FM',
}

export default async function Page({ params }: { params: Promise<{ day: string }> }) {
  const { day } = await params;

  const day_n = parseInt(day);
  if (isNaN(day_n) || day_n < 0 || day_n > 6) return notFound();

  const schedule = await getSchedule(day_n);

  if (!schedule) return notFound();

  if (schedule.length === 0) {
    return (
        <Motion type={'div'}
                className={styles.content}
                transition={{duration: 0.2, type: "tween", delay: 0.2}}
                initial={{opacity: 0}}
                animate={{opacity: 1}}>
          <div className="flex flex-col items-center justify-center gap-2 grow">
            <p className={styles.emptyMessage}>Nothing scheduled on this day</p>
          </div>
        </Motion>

    );
  }

  return (
      <Motion type={'div'}
              className={styles.ScheduleList}
              transition={{duration: 0.2, type: "tween", delay: 0.2}}
              initial={{opacity: 0}}
              animate={{opacity: 1}}>
        {
          schedule.map((show, i) =>
              <ScheduleItem key={i} show={show}/>
          )
        }
      </Motion>
  );
}