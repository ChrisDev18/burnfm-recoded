'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BurnLogo from "@/components/BurnLogo";
import { Pivot as Hamburger } from 'hamburger-react';
import {
  CalendarIcon, Headphones,
  LayoutGridIcon, LucideProps,
  MessageCircleQuestion,
  UsersRoundIcon
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

type linkData = {
  href: string;
  label: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  match: (p: string) => boolean
}

function Sidebar({ path, links }: { path: string, links: linkData[] }) {
  return (
      <ul className="md:hidden list-none absolute top-0 left-0 h-screen bg-tertiary p-10 pt-32 pr-14 space-y-4">
        { links.map((link) => {
          const selected = link.match(path);
          return (
              <li key={link.href}>
                <Link
                    href={link.href}
                    className={`flex items-center gap-2 font-bold text-2xl transition-[colors,border] border-b-0 
                      focus-visible:outline-2 focus-visible:outline-alt-purple focus-visible:outline-offset-4
                      ${
                        selected ?
                            "border-b-2 border-alt-purple text-alt-purple active:border-b-0" 
                        :
                            "text-foreground hover:text-alt-purple hover:border-b-4 hover:border-alt-purple active:border-b-0"
                    }`}
                >
                  <link.icon size={20} strokeWidth={2.5}/>
                  <p>{link.label}</p>
                </Link>
              </li>
          )
        }) }
      </ul>
  )
}

export default function NavBar() {
  const path = usePathname();
  const [logoSize, setLogoSize] = useState<"big" | "small">("big");
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setLogoSize("small");
      } else {
        setLogoSize("big");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAlt = path.startsWith("/schedule") || path.startsWith("/shows");

  const navLinks: linkData[] = [
    {
      href: "/",
      label: "Listen",
      icon: Headphones,
      match: (p: string) => p == "/",
    },
    {
      href: `/schedule/${new Date().getDay()}`,
      label: "Schedule",
      icon: CalendarIcon,
      match: (p: string) => p.startsWith("/schedule"),
    },
    {
      href: "/shows",
      label: "Shows",
      icon: LayoutGridIcon,
      match: (p: string) => p.startsWith("/shows") || p.startsWith("/show"),
    },
    {
      href: "/faq",
      label: "FAQ",
      icon: MessageCircleQuestion,
      match: (p: string) => p.startsWith("/faq"),
    },
    {
      href: "/calendar",
      label: "Calendar",
      icon: CalendarIcon,
      match: (p: string) => p.startsWith("/calendar"),
    },
    {
      href: "/about",
      label: "About us",
      icon: UsersRoundIcon,
      match: (p: string) => p.startsWith("/about"),
    },
  ];

  return (
      <header className="sticky top-0 z-10">
        <nav
            id="header"
            className={`flex justify-between max-md:justify-center items-center px-8 py-2 md:px-16 lg:px-24 
        backdrop-blur-3xl ${isAlt ? "bg-purple text-white" : "bg-white/60 dark:bg-black/60"}`}
        >
          { isOpen &&
            <Sidebar links={navLinks} path={path} />
          }

          <Link
              href="/"
              aria-label="Burn FM Homepage"
              className="notranslate focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
          >
            <BurnLogo
                id="image"
                width={logoSize === "big" ? 100 : 64}
                height={logoSize === "big" ? 100 : 64}
                className={`transition-all duration-300 ${
                    isAlt ? "text-white" : "text-alt-purple dark:text-white"
                }`}
            />
          </Link>


          <ul className="hidden md:flex items-center gap-6 list-none">
            {navLinks.map(link => {
              const selected = link.match(path);
              return (
                  <li key={link.href}>
                    <Link
                        href={link.href}
                        className={`flex items-center gap-2 font-bold text-lg transition-[colors,border] border-b-0 
                  focus-visible:outline-2 focus-visible:outline-alt-purple focus-visible:outline-offset-4
                  ${
                            selected ? 
                                isAlt ? 
                                    "border-b-2 border-white text-white active:border-b-0" 
                                : 
                                    "border-b-2 border-alt-purple text-alt-purple active:border-b-0"
                            : 
                                isAlt ?
                                    "text-white hover:border-b-4 hover:border-white active:border-b-0" 
                                : 
                                    "text-foreground hover:text-alt-purple hover:border-b-4 hover:border-alt-purple active:border-b-0"
                        }`}
                    >
                      <link.icon size={20} strokeWidth={2.5} />
                      <p>{link.label}</p>
                    </Link>
                  </li>
              );
            })}
          </ul>
          <button
              className="absolute left-8 md:hidden z-[999]"
              aria-label="Open menu"
          >
            <Hamburger size={24} toggled={isOpen} toggle={setOpen}/>
          </button>

          {/* Mobile Nav using Radix Dialog */}
          <Dialog.Root open={isOpen} onOpenChange={setOpen}>
            {/*<Dialog.Trigger asChild>*/}
            {/*  */}
            {/*</Dialog.Trigger>*/}

            <Dialog.Portal>
              {/* Overlay */}
              <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />

              {/* Menu Panel */}
              <Dialog.Content
                  className="fixed top-0 left-0 h-full w-3/4 max-w-sm bg-tertiary p-10 space-y-6 z-50
              animate-in slide-in-from-left"
              >
                <button className="-ml-3 -mt-1" aria-label="Open menu">
                  <Hamburger size={24} toggled={isOpen} toggle={setOpen}/>
                </button>

                <ul className="flex flex-col gap-6">
                  {navLinks.map((link) => {
                    const selected = link.match(path);
                    return (
                        <li key={link.href}>
                          <Dialog.Close asChild>
                            <Link
                                href={link.href}
                                className={`flex items-center gap-3 font-bold text-xl transition-[colors,border] 
                            ${
                                    selected
                                        ? "border-b-2 border-alt-purple text-alt-purple hover:border-b-4 hover:border-alt-purple active:border-b-0"
                                        : "text-foreground hover:text-alt-purple hover:border-b-4 hover:border-alt-purple active:border-b-0"

                                }`}
                            >
                              <link.icon size={22} strokeWidth={2.5} />
                              <p>{link.label}</p>
                            </Link>
                          </Dialog.Close>
                        </li>
                    );
                  })}
                </ul>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </nav>
      </header>
  );
}