// import styles from "./ScheduleItem.module.css";

import Image from "next/image";
import fallback from "../../../../public/Radio-Microphone.png";
import React from "react";
import Link from "next/link";

import "@/app/styles/icons.css";
import {ShowEvent} from "@/lib/types";
import {ChevronRightIcon} from "lucide-react";

// An item shown in ScheduleList.
export default function ScheduleItem({
  show
}: {
  show: ShowEvent
}) {

  const duration = Math.round((show.end_time.getTime() - show.start_time.getTime()) / (1000 * 60 * 60));
  const timeString = `${show.start_time.toLocaleTimeString(['en'], {hour: "2-digit", minute: "2-digit"})} - ${show.end_time.toLocaleTimeString(['en'], {hour: "2-digit", minute: "2-digit"})}`;

  return (
      <Link href={`/show/${show.id}`}
            className="group h-[140px] font-sans relative flex flex-row-reverse sm:flex-row items-stretch bg-tertiary border border-alt-purple/30 no-underline transition-colors duration-0 focus-visible:outline-2 outline-offset-0 focus-visible:outline-offset-4 focus-visible:outline-focus-color hover:bg-tertiary-hover active:bg-tertiary-active">
        <Image
            src={show.photo ? show.photo : fallback}
            className="max-sm:absolute right-0 top-0 bottom-0 h-full w-auto aspect-square transition-opacity sm:opacity-100 group-hover:opacity-50 sm:group-hover:opacity-100 max-sm:group-focus-visible:opacity-50 group-active:opacity-50 max-sm:[mask-image:linear-gradient(to_right,rgba(0,0,0,0),70%,rgba(0,0,0,1))]"
            alt={`Cover photo for the show: ${show.title}`}
            height={140}
            width={140}
        />

        <div className="relative flex flex-grow items-center gap-4 p-4 sm:pr-9 overflow-x-hidden overflow-y-clip">
          <div className="flex flex-col flex-grow gap-1 w-4/5">
            <p className="text-base font-medium text-foreground/70">{timeString}</p>

            <div className="flex flex-col justify-center gap-1 w-full">
              <h3 className="notranslate text-xl font-bold truncate">{show.title}</h3>
              { show.description &&
                  <p className="line-clamp-2 text-base">{show.description}</p>
              }
            </div>
          </div>

          <ChevronRightIcon className={"opacity-0 -translate-x-1 transition-all duration-200 ease-in-out group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:text-focus-color group-active:translate-x-2 group-active:text-alt-purple"} />
        </div>
      </Link>
  );
}