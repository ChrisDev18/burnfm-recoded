'use client'

import buttons from "@/app/styles/buttons.module.css"
import showPopup from "@/app/styles/ShowPopup.module.css"
import React, {useEffect, useReducer, useState} from "react";
import Image from "next/image";
import {ShowEvent, PopupState} from "@/lib/types";
import {getNowPlaying} from "@/lib/api";
import {Dialog, DialogContent} from "@/components/Popup/Popup";
import {Close} from "@radix-ui/react-dialog";
import Link from "next/link";
import {pickExcerpt} from "@/lib/excerpts";
import {initialState, nowplayingReducer} from "@/reducers/nowplayingReducer";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {useMedia} from "@/contexts/MediaContext";
import {RADIO_SRC} from "@/components/MediaPlayer";
import {PlayIcon, RadioIcon, SquareIcon, XIcon} from "lucide-react";
import styles from "@/components/RadioPlayer/RadioPlayer.module.css";

const init_popup: PopupState = {
  visible: false,
  show: {
    id: 0,
    day: 1,
    title: "",
    duration: new Date(),
    description: "",
    start_time: new Date(),
    end_time: new Date(),
    photo: "",
    hosts: []
  }
}

// ---------- Fake Test Schedule ----------
const makeFakeSchedule = () => {
  const now = new Date();
  const start = new Date(now.getTime() - 15 * 60 * 1000); // started 15m ago
  const end = new Date(now.getTime() + 45 * 60 * 1000);   // ends in 45m
  return {
    current_show: {
      id: 999,
      day: 1,
      title: "Fake Live Show",
      duration: end,
      description: "This is a fake show for testing purposes.",
      start_time: start,
      end_time: end,
      photo: "https://picsum.photos/600/600?grayscale",
      hosts: []
    },
    next_shows: [
      {
        id: 1000,
        day: 1,
        title: "Fake Up Next 1",
        duration: new Date(now.getTime() + 105 * 60 * 1000),
        description: "First fake upcoming show.",
        start_time: end,
        end_time: new Date(end.getTime() + 60 * 60 * 1000),
        photo: "https://picsum.photos/600/600?random=2",
        hosts: []
      },
      {
        id: 1001,
        day: 1,
        title: "Fake Up Next 2",
        duration: new Date(now.getTime() + 165 * 60 * 1000),
        description: "Second fake upcoming show.",
        start_time: new Date(end.getTime() + 60 * 60 * 1000),
        end_time: new Date(end.getTime() + 120 * 60 * 1000),
        photo: "https://picsum.photos/600/600?random=3",
        hosts: []
      }
    ]
  };
};

export default function NewRadioPlayer() {
  const mediaContext = useMedia();
  const [popup, setPopup] = useState(init_popup);
  const [state, dispatch] = useReducer(nowplayingReducer, initialState);

  const [testMode, setTestMode] = useState({
    showTestUI: false,
    forceError: false,
    forceNoCurrent: false,
    forceNoUpcoming: false,
    useFakeSchedule: false
  });

  const [progress, setProgress] = useState(0);

  // Fetch data
  useEffect(() => {
    async function update() {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const schedule = testMode.useFakeSchedule
            ? makeFakeSchedule()
            : await getNowPlaying();
        dispatch({ type: "FETCH_SUCCESS", payload: schedule });
      } catch (error: any) {
        dispatch({
          type: "FETCH_FAILURE",
          payload: error.message || 'An error occurred',
        });
      }
    }
    update().then();
  }, [testMode.useFakeSchedule]);

  const displayPopup = (show: ShowEvent) =>
      setPopup({ visible: true, show });

  const togglePlayPause = () => {
    if (mediaContext.state.isPlaying && mediaContext.state.media?.src === RADIO_SRC)
      mediaContext.dispatch({ type: "STOP" });
    else
      mediaContext.dispatch({
        type: "SET_MEDIA",
        payload: {
          src: RADIO_SRC,
          show: state.schedule.current_show ?? undefined
        }
      });
  };

  const schedule = {
    current_show: testMode.forceNoCurrent ? null : state.schedule.current_show,
    next_shows: testMode.forceNoUpcoming ? [] : state.schedule.next_shows
  };

  useEffect(() => {
    if (!schedule.current_show) return;

    const updateProgress = () => {
      const now = Date.now();
      const start = new Date(schedule.current_show!.start_time).getTime();
      const end = new Date(schedule.current_show!.end_time).getTime();
      const pct = Math.min(
          100,
          Math.max(0, ((now - start) / (end - start)) * 100)
      );
      setProgress(pct);
    };

    updateProgress();
    const interval = setInterval(updateProgress, 30 * 1000); // update every 30s
    return () => clearInterval(interval);
  }, [schedule.current_show]);

  const error = testMode.forceError ? 'Forced error for testing' : state.error;

  if (error) {
    return (
        <div className="text-white flex flex-col relative bg-[#5D1F74] shadow-[0_0_16px_rgba(93,31,116,0.5)]">
          <div className="h-[240px] flex flex-col items-center justify-center gap-2 p-8">
            <p className="text-xl font-semibold text-white/70 text-center">Current show details unavailable</p>
            <p className="text-lg text-white/70 max-w-md text-center">Something went wrong whilst fetching schedule data. Try reloading the page.</p>
          </div>
          <div className="h-[180px] bg-[#32103F]/75 border-t border-white/25 flex items-center justify-center">
            <p className="text-white/70">Upcoming shows unavailable</p>
          </div>
        </div>
    );
  }

  return (
      <>
  {testMode.showTestUI && (
      <div className="bg-black/40 text-xs p-2 flex gap-3">
        <label><input type="checkbox" checked={testMode.forceError}
                      onChange={e=>setTestMode({...testMode,forceError:e.target.checked})}/> Error</label>
        <label><input type="checkbox" checked={testMode.forceNoCurrent}
                      onChange={e=>setTestMode({...testMode,forceNoCurrent:e.target.checked})}/> No Current</label>
        <label><input type="checkbox" checked={testMode.forceNoUpcoming}
                      onChange={e=>setTestMode({...testMode,forceNoUpcoming:e.target.checked})}/> No Upcoming</label>
        <label><input type="checkbox" checked={testMode.useFakeSchedule}
                      onChange={e=>setTestMode({...testMode,useFakeSchedule:e.target.checked})}/> ✅ Use Fake Data</label>
      </div>
  )}

      <div className="text-white flex flex-col relative bg-[#5D1F74] shadow-[0_0_16px_rgba(93,31,116,0.5)]">

        { schedule.current_show?.photo &&
          <Image className="absolute h-full w-full object-cover z-0 brightness-75"
                 src={schedule.current_show.photo}
                 alt="Background blur image"
                 height={10}
                 width={10}
          />
        }

        <Dialog open={popup.visible} onOpenChange={(change) => setPopup({...popup, visible: change})}>
          <DialogContent aria-describedby={undefined} title={popup.show.title}>
            <div className={showPopup.Popup}>
              { popup.show.photo &&
                <Image className={showPopup.Image}
                       src={popup.show.photo}
                       alt={"Cover image for the show: " + popup.show.title}
                       height={120}
                       width={120}
                />
              }

              <div>
                <DialogPrimitive.Title className="notranslate">
                  {popup.show.title}
                </DialogPrimitive.Title>

                <p className={showPopup.timing}>
                  {popup.show.start_time.toLocaleTimeString(['en'], {hour: "2-digit", minute: "2-digit"})} - {
                  popup.show.end_time.toLocaleTimeString(['en'], {hour: "2-digit", minute: "2-digit"})}
                </p>
              </div>

              {popup.show.description
                  ? <p>{popup.show.description}</p>
                  : <p className={showPopup.Default}>{pickExcerpt()}</p>}

              <div className={showPopup.buttonRow}>
                <Link className={buttons.Button} href={`/show/${popup.show.id}`}>
                  Go to Show Page
                </Link>
              </div>

              <Close className={showPopup.Close}><XIcon /></Close>
            </div>
          </DialogContent>
        </Dialog>

        {/* ---------- On Air ---------- */}
        <div className="relative h-[240px] flex items-center justify-between bg-[#5D1F74]/60 backdrop-blur-xl">
          {state.loading ? (
              /* skeleton */
              <div className="flex px-8 gap-8 w-full max-w-2xl animate-pulse">
                <div className="w-10 h-10 bg-white/20 rounded" />
                <div className="flex flex-col gap-2 w-full">
                  <div className="w-16 h-5 bg-white/20 rounded" />
                  <div className="w-48 h-6 bg-white/20 rounded" />
                  <div className="w-full h-12 bg-white/20 rounded" />
                </div>
              </div>
          ) : schedule.current_show ? (
              <div className="flex px-8 gap-8 w-full max-w-2xl">
                <button className={styles.Toggle_Button} onClick={togglePlayPause}>
                  {mediaContext.state.isPlaying &&
                  mediaContext.state.media?.src === RADIO_SRC
                      ? <SquareIcon fill="currentColor" size={40} />
                      : <PlayIcon fill="currentColor" size={40} />}
                </button>

                <button
                    onClick={() => displayPopup(schedule.current_show!)}
                    className="group flex flex-col gap-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#32103F]/75"
                >
                  <p className="text-xl text-white/70 font-semibold">LIVE</p>
                  <p className="text-2xl font-bold group-hover:underline">
                    {schedule.current_show.title}
                  </p>
                  <p className="text-sm line-clamp-3 h-[calc(theme(lineHeight.sm)*3)] group-hover:underline">
                    {schedule.current_show.description}
                  </p>
                </button>
              </div>
          ) : (
              <div className="flex px-8 gap-4 w-full max-w-2xl items-center">
                <p className="text-xl font-semibold text-white/70">
                  We're currently Off Air
                </p>
              </div>
          )}

          {state.loading ? (
              <div className="w-[240px] h-full bg-white/20 animate-pulse hidden sm:flex" />
          ) : schedule.current_show?.photo ? (
              <Image
                  src={schedule.current_show.photo}
                  alt={`Cover photo for the show: ${schedule.current_show.title}`}
                  height={240}
                  width={240}
                  className="w-auto h-full aspect-square object-cover hidden sm:flex"
              />
          ) : (
              <div className="bg-purple w-[240px] h-full aspect-square flex items-center justify-center">
                <RadioIcon size={40} className="text-white" />
              </div>
          )}

          {/* 🔹 Progress Bar Overlay */}
          {schedule.current_show && (
              <div className="absolute bottom-0 left-0 w-full h-5 px-4">
                {/* start & end times */}
                <div className="absolute bottom-2 left-4 text-sm text-white/70">
                  {new Date(schedule.current_show.start_time).toLocaleTimeString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                  })}
                </div>
                <div className="absolute bottom-2 right-4 text-sm text-white/70">
                  {new Date(schedule.current_show.end_time).toLocaleTimeString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                  })}
                </div>

                {/* border line with progress */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/25" />
                <div
                    className="absolute bottom-0 left-0 h-[2px] bg-white transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
              </div>
          )}
        </div>

        {/* ---------- Up Next ---------- */}
        <div className="flex items-center justify-between bg-[#32103F]/80 backdrop-blur-xl border-t border-white/25">
          {state.loading ? (
              [0,1].map((_, i) => (
                  <div key={i}
                       className={`flex px-8 py-6 gap-4 w-full ${i===1?'hidden md:flex':''} animate-pulse`}>
                    <div className="w-[108px] h-[108px] bg-white/20 rounded" />
                    <div className="flex flex-col gap-2 w-full">
                      <div className="w-24 h-4 bg-white/20 rounded" />
                      <div className="w-40 h-5 bg-white/20 rounded" />
                      <div className="w-full h-8 bg-white/20 rounded" />
                    </div>
                  </div>
              ))
          ) : schedule.next_shows.length ? (
              schedule.next_shows.slice(0,2).map((show,i) => (
                  <button key={i}
                          onClick={() => displayPopup(show)}
                          className={`group flex px-8 py-6 gap-4 w-full ${
                              i===1?'hidden md:flex':''} text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#32103F]/75`}>
                    {show.photo ? (
                        <Image
                            src={show.photo}
                            alt={`Cover photo for the show: ${show.title}`}
                            height={120}
                            width={120}
                            className="w-auto h-[108px] aspect-square object-cover transition group-hover:brightness-110"
                        />
                    ) : (
                        <div className="bg-purple w-[108px] h-[108px] aspect-square flex items-center justify-center group-hover:brightness-110">
                          <RadioIcon size={40} className="text-white" />
                        </div>
                    )}
                    <div className="flex flex-col w-full gap-1">
                      <span className="flex w-full justify-between">
                        <p className="font-semibold line-clamp-1">
                          {show.start_time.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',hour12:false})}
                          {' - '}
                          {show.end_time.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',hour12:false})}
                        </p>
                        <p className="text-white/50 font-semibold text-nowrap">
                          {state.schedule.next_shows.length === 1
                              ? "Up next"
                              : i === 0
                                  ? "Up next"
                                  : "And then"
                          }
                        </p>
                      </span>
                      <p className="font-bold text-lg group-hover:underline">{show.title}</p>
                      <p className="text-sm line-clamp-2 h-[calc(theme(lineHeight.sm)*2)] group-hover:underline">{show.description}</p>
                    </div>
                  </button>
              ))
          ) : (
              <div className="flex px-8 py-6 w-full justify-center">
                <div className="flex flex-col h-[108px] justify-center">
                  <p className="text-white/70">No upcoming shows scheduled</p>
                </div>
              </div>
          )}
        </div>
      </div>
      </>
  );
}