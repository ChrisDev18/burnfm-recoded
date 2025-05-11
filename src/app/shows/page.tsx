import React from 'react';
import {getAllShows} from "@/lib/api";
import Motion from "@/app/components/motion";
import Link from "next/link";
import Image from "next/image";
import {ChevronRightIcon, RadioIcon} from "lucide-react";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: 'Radio Shows - Burn FM',
}

const acceptableFilters = ["committee", "current", "previous"]

export default async function Page({searchParams}: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  let { filter } = await searchParams;

  let new_filter: string[] | undefined;

  if (filter) {
    if (typeof filter === 'string')
      filter = [filter];

    new_filter = filter.filter(item => acceptableFilters.includes(item));
  }

  const shows = await getAllShows(new_filter);

  return (
      <Motion
          type="div"
          className="flex flex-col self-stretch w-full gap-6 px-16 py-8 max-sm:px-8 [@media(min-width:1700px)]:px-[256px]"
          transition={{ duration: 0.2, type: "tween", delay: 0.2 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
          {shows.map((show, i) => (
              <Link
                  key={i}
                  href={`/show/${show.id}`}
                  className="group relative h-[160px] flex max-sm:flex-row-reverse items-stretch bg-tertiary border border-alt-purple/30 overflow-hidden no-underline transition-colors duration-200 hover:bg-tertiary-hover active:bg-tertiary-active focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-color"
              >
                { show.photo ?
                  <Image
                      src={show.photo}
                      alt={`Cover photo for the show: ${show.title}`}
                      height={120}
                      width={120}
                      className="w-auto h-full aspect-square object-cover transition-opacity sm:opacity-100 group-hover:opacity-50 sm:group-hover:opacity-100 group-focus-visible:opacity-50 group-active:opacity-50 max-sm:absolute right-0 top-0 bottom-0 max-sm:[mask-image:linear-gradient(to_right,rgba(0,0,0,0),70%,rgba(0,0,0,1))]"
                  />
                    :
                  <div className={"bg-purple w-auto h-full aspect-square flex items-center justify-center max-sm:[mask-image:linear-gradient(to_right,rgba(0,0,0,0),70%,rgba(0,0,0,1))]"}>
                    <RadioIcon size={40} className={"text-white"}/>
                  </div>
                }

                <div className="relative flex flex-grow items-center gap-4 p-4 sm:pr-9 overflow-hidden">
                  <div className="flex flex-col flex-grow gap-1 w-4/5">
                    <p className="text-sm text-foreground/70">Hosted by: {show.hosts.join(", ")}</p>
                    <div className="flex flex-col justify-center gap-1 w-full">
                      <h3 className="notranslate text-xl font-bold">{show.title}</h3>
                      {/*{show.description && (*/}
                      {/*    <p className="line-clamp-2 text-sm text-foreground/70">*/}
                      {/*      {show.description}*/}
                      {/*    </p>*/}
                      {/*)}*/}
                    </div>
                  </div>
                  <ChevronRightIcon className="opacity-0 -translate-x-1 transition-all duration-200 ease-in-out group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 group-active:translate-x-2 group-active:text-alt-purple" />
                </div>
              </Link>
          ))}
        </div>
      </Motion>
  );
};
