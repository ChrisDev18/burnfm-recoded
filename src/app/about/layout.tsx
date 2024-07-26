"use client"

import styles from "./layout.module.css";
import CommitteeSelector from "@/app/about/ui/CommitteeSelector";
import React from "react";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
        <div className={styles.Root}>
          <div className={styles.Rectangle}/>
            <h1 className={styles.Header}>About us</h1>
            <CommitteeSelector className={styles.Selector}/>
            {children}
          </div>
  )
}
