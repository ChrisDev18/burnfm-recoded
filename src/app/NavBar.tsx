'use client'

import {useEffect} from "react";
import Link from "next/link";
import logo_dark from "../../public/logo-white.png";
import Image from "next/image";
import logo_light from "../../public/logo-purple.png";

export default function NavBar() {
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
          image.style.height = '40px';
          image.style.width = '40px';
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
    <header className={"Header"}>
      <nav className={"Navbar"} id={"header"}>
        <Link href="#">
          <picture>
            <source media="(prefers-color-scheme: dark)" srcSet={logo_dark.src}/>
            <Image
              id={"image"}
              src={logo_light}
              alt="BurnFM Logo"
              height={80}
              width={80}
              priority
            />
          </picture>

        </Link>

        <ul className={"NavLinks"}>

          {/*<li>*/}
          {/*  <Link href="#">Listen</Link>*/}
          {/*</li>*/}
          <li><p>Coming soon:</p></li>
          <li>
            <Link href="#" aria-disabled={true}>About Us</Link>
          </li>
          <li>
            <Link href="#" aria-disabled={true}>Schedule</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}