'use client'

import {useEffect} from "react";
import Link from "next/link";
import styles from "./NavBar.module.css"
import {usePathname} from "next/navigation";
import BurnLogo from "@/app/components/BurnLogo";

export default function NavBar() {
  const path = usePathname();

  useEffect(() => {
    const header = document.getElementById('header');
    const image = document.getElementById('image');
    if (image == null || header == null) {
      return;
    }

    image.dataset.size = 'big';

    const handleScroll = () => {
      if (window.scrollY > 0) {
        if (image.dataset.size === 'big') {
          image.dataset.size = 'small';
        }

        if (path !== "/schedule/") {
          header.style.boxShadow = "0px 4px 8px 0px rgba(0, 0, 0, 0.25)";
        }

      } else {
        if (image.dataset.size === 'small') {
          image.dataset.size = 'big';
          header.style.boxShadow = "none";
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [path]);

  return (
    <header className={`${styles.Root} ${path === "/schedule/" ? styles.alt : ""}`}>
      <nav className={styles.Navbar} id={"header"}>
        <Link className={`${styles.LogoLink} notranslate`} href="/">
          <BurnLogo id={"image"} className={styles.Logo}/>
        </Link>

        <ul className={styles.LinkList}>
          <li>
            <Link className={path == '/' ? `${styles.Link} ${styles.Selected}` : styles.Link}
                  href={"/"}>
              <span className={'material-symbols-rounded notranslate'}>
                headphones
              </span>
              <p>Listen</p>
            </Link>
          </li>

          <li>
            <Link className={path.startsWith('/schedule/') ? `${styles.Link} ${styles.Selected}` : styles.Link}
                  href={`/schedule/?day=${new Date().getDay()}`}>
              <span className={'material-symbols-rounded notranslate'}>
                overview
              </span>
              <p>Schedule</p>
            </Link>
          </li>

          <li>
            <Link className={path.startsWith('/about/') ? `${styles.Link} ${styles.Selected}` : styles.Link}
                  href={"/about/"}>
              <span className={'material-symbols-rounded notranslate'}>
                group
              </span>
              <p>About us</p>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}