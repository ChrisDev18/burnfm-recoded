"use client"

import styles from "./layout.module.css";
import Pills from "@/app/components/Pills/Pills";
import { motion } from "framer-motion";
import React from "react";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
        <motion.div className={styles.Root}
                    transition={{ duration: 0.2, type: "tween", delay: 0.2}}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}>
          <div className={styles.Rectangle}/>
            <h1 className={styles.Header}>About us</h1>
            <Pills data={[{link: "/about/", text: "Current"},
                                      {link: "/about/2023-24/", text: "2023-2024"}]}
                   className={styles.Selector}/>
            {children}
        </motion.div>
  )
}
