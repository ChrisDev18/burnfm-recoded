import styles from "@/app/components/Pills/Pills.module.css";

import Link from "next/link";
import {usePathname} from "next/navigation";

export default function Pills({
  data,
  className
}: {
  data: { link: string; text: string }[],
  className?: string
}) {
  const path = usePathname();
  const links = data.map((x, i) =>
      <Link key={i} href={x.link} className={`${styles.pill} ${path === x.link ? styles.selected : ""}`}>{x.text}</Link>
  );

  return (
      <nav aria-label="Primary" className={`${styles.navbar} ${className}`}>
        <ul className={styles.pillsContainer}>
          {links}
        </ul>
      </nav>
  )
}