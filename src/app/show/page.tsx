"use client"

import React from "react";
import ScheduleList from "@/app/schedule/ScheduleList";
import {notFound, useSearchParams} from "next/navigation";
import styles from "./page.module.css"
import '@/app/styles/icons.css';


export default function ShowPage() {
  const searchParams = useSearchParams();
  const idString = searchParams.get('id');

  if (!idString) return notFound();

  const id = parseInt(idString);
  if (isNaN(id)) return notFound();

  return (
      <div className={styles.root}>
        <p>Page for Show (id={id})</p>
      </div>
  );
}