'use client'

import {useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import logo_light from "../../../public/logo-purple.png";
import styles from "./NavBar.module.css"
import {usePathname} from "next/navigation";

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
          image.style.transition = 'all 300ms';
          image.style.height = '50px';
          image.style.width = '50px';
        }
        header.style.boxShadow = "0px 4px 8px 0px rgba(0, 0, 0, 0.25)";
      } else {
        if (image.dataset.size === 'small') {
          image.dataset.size = 'big';
          image.style.transition = 'all 300ms';
          image.style.height = '100px';
          image.style.width = '100px';
          header.style.boxShadow = "none";
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={styles.Root}>
      <nav className={styles.Navbar} id={"header"}>
        <Link className={"notranslate"} href="/">
          <Image
              id={"image"}
              src={logo_light}
              className={styles.Logo}
              alt="BurnFM Logo"
              height={100}
              width={100}
              priority
          />

        </Link>

        <ul className={styles.LinkList}>
          <li>
            <Link className={path == '/' ? `${styles.Link} ${styles.Selected}` : styles.Link}
                  href="/">
              <span className={'material-symbols-rounded notranslate'}>
                headphones
              </span>
              <p>Listen</p>
            </Link>
          </li>

          <li>
            <Link className={path == '/schedule/' ? `${styles.Link} ${styles.Selected}` : styles.Link}
                  href="/schedule/">
              <span className={'material-symbols-rounded notranslate'}>
                overview
              </span>
              <p>Schedule</p>
            </Link>
          </li>

          <li>
            <Link className={path == '/about/' ? `${styles.Link} ${styles.Selected}` : styles.Link}
                  href="/about/">
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