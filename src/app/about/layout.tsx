"use client"

import styles from "./layout.module.css";
import Pills from "@/app/components/Pills/Pills";
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
            <Pills data={[{link: "/about/", text: "Current"},
                                      {link: "/about/2023-24/", text: "2023-2024"}]}
                   className={styles.Selector}/>
            {children}
          </div>
  )
}
