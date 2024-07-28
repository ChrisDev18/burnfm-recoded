import styles from "@/app/components/Pills/Pills.module.css";

import Link from "next/link";
import {usePathname, useSearchParams} from "next/navigation";
import {ParsedUrlQueryInput} from "node:querystring";

export default function Pills({
  data,
  className
}: {
  data: { link: string; text: string; params?: ParsedUrlQueryInput }[],
  className?: string
}) {
  const path = usePathname();
  const params = useSearchParams();

  const checkParams = (p?: ParsedUrlQueryInput) => {
    if (!p) return params.size === 0;

    for (const key in p) {
      if (params.get(key) !== p[key]) {
        return false;
      }
    }
    return true;
  }

  const links = data.map((x, i) => {
    let link = x.link;
    if (x.params && Object.keys(x.params).length > 0) {
      let i = 0;
      for (const key in x.params) {
        if (i === 0) {
          link += `?${key}=${x.params[key]}`;
        } else {
          link += `&${key}=${x.params[key]}`
        }
      }
    }

    return <Link key={i} href={{
      pathname: x.link,
      query: x.params,
    }} className={`${styles.pill} ${path === x.link && checkParams(x.params) ? styles.selected : ""}`}>{x.text}</Link>
  });

  return (
      <nav aria-label="Primary" className={`${styles.navbar} ${className}`}>
        <ul className={styles.pillsContainer}>
          {links}
        </ul>
      </nav>
  )
}