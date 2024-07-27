"use client"

import React from "react";
import ScheduleList from "@/app/schedule/ScheduleList";
import {notFound, useSearchParams} from "next/navigation";
import styles from "./page.module.css"
import '@/app/styles/icons.css';


export default function SchedulePage() {
  const searchParams = useSearchParams();
  const day = searchParams.get('day');

  if (!day) return (
      <div className={styles.content}>
        <p className={styles.emptyMessage}>No day selected</p>
      </div>
  );

  const dayNumber = parseInt(day);
  if (isNaN(dayNumber) || dayNumber < 0 || dayNumber > 6) return notFound();

  return (
      <div className={styles.content}>
        <ScheduleList day={dayNumber}/>
      </div>
  );
}