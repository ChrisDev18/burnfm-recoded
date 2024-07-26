import styles from "@/app/about/layout.module.css";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function CommitteeSelector({className}: {className?: string}) {
  const path = usePathname();
  console.log(path)
  return (
      <nav aria-label="Primary" className={`${styles.navbar} ${className}`}>
        {/*<p className={styles.navbarPrompt}>Year:</p>*/}
        <ul className={styles.pillsContainer}>
          <Link href={"/about"} className={`${styles.pill} ${path === '/about/' ? styles.active : ""}`}>Current</Link>
          <Link href={"/about/2023-24"} className={`${styles.pill} ${path === '/about/2023-24/' ? styles.active : ""}`}>2023-2024</Link>
        </ul>
      </nav>
  )
}