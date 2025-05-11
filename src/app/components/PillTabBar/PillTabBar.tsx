"use client"

import styles from "@/app/components/PillNavbar/Pills.module.css";
import { useState } from "react";

export default function PillTabBar({
                                data,
                                className,
                                onSelect
                              }: {
  data: { id: number; text: string }[],
  className?: string,
  onSelect?: (id: number) => void
}) {
  const [selectedId, setSelectedId] = useState<number>(data[0]?.id || 0);

  const handleClick = (id: number) => {
    setSelectedId(id);
    if (onSelect) {
      onSelect(id);
    }
  };

  const pills = data.map((item, i) => (
      <li key={i}>
        <button
            onClick={() => handleClick(item.id)}
            className={`${styles.pill} ${selectedId === item.id ? styles.selected : ""}`}
        >
          {item.text}
        </button>
      </li>
  ));

  return (
      <nav aria-label="Primary" className={`${styles.navbar} ${className}`}>
        <ul className={styles.pillsContainer}>
          {pills}
        </ul>
      </nav>
  );
}