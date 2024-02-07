'use client'

import {useEffect} from "react";
import Link from "next/link";
import logo_dark from "../../../public/logo-white.png";
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
        <Link href="/">
          <picture>
            <source media="(prefers-color-scheme: dark)" srcSet={logo_dark.src}/>
            <Image
              id={"image"}
              src={logo_light}
              alt="BurnFM Logo"
              height={100}
              width={100}
              priority
            />
          </picture>

        </Link>

        <ul className={styles.LinkList}>
          <li className={path == '/' ? styles.Selected : ""}>
            <Link href="/"><p>Listen</p></Link>
          </li>

          <li className={path == '/schedule' ? styles.Selected : ""}>
            <Link href="/schedule"><p>Schedule</p></Link>
          </li>

          <li className={path == '/about' ? styles.Selected : ""}>
            <Link href="/about"><p>About Us</p></Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}