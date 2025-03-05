import {useMedia} from "@/contexts/MediaContext";
import {AnimatePresence, motion} from "motion/react";
import React, {useEffect, useRef} from "react";
import Image from "next/image";
import Link from "next/link";
import fallback from "../../../public/Radio-Microphone.png";

export const RADIO_SRC = "https://stream.aiir.com/xz12nsvoppluv";

export default function MediaPlayer() {
  const mediaContext = useMedia();
  const audioRef = useRef<HTMLAudioElement|null>(null);

  const { state: {media, isPlaying}, dispatch } = mediaContext;

  // Update MediaSession whenever the current show changes
  useEffect(() => {
    if (!("mediaSession" in navigator)) return; // ✅ Ensure browser support

    if (media?.show) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: media.show.title,
        artist: "Burn FM",
        artwork: [{
          src: media.show.photo ?? fallback.src,
          sizes: "192x192",
        }]
      });
    } else {
      navigator.mediaSession.playbackState = "none";
      navigator.mediaSession.metadata = null;
    }
  }, [media]);

  // Sync MediaContext with OS's player UI
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return; // Ensure the audio element exists

    const handlePlay = () => dispatch({ type: "PLAY" });
    const handlePause = () => dispatch({ type: "PAUSE" });
    const handleStop = () => dispatch({ type: "STOP" });

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleStop);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleStop);
    };
  });

  // Sync MediaContext with MediaSession API
  useEffect(() => {
    if (!("mediaSession" in navigator)) return;

    const handlePlay = () => dispatch({ type: "PLAY" });
    const handlePause = () => dispatch({ type: "PAUSE" });
    const handleStop = () => dispatch({ type: "STOP" });

    navigator.mediaSession.setActionHandler("play", handlePlay);
    navigator.mediaSession.setActionHandler("pause", handlePause);
    navigator.mediaSession.setActionHandler("stop", handleStop);

    return () => {
      navigator.mediaSession.setActionHandler("play", null);
      navigator.mediaSession.setActionHandler("pause", null);
      navigator.mediaSession.setActionHandler("stop", null);
    };
  }, []);

  // Sync audio element with MediaContext
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Sync play/pause state
    if (isPlaying) {
      audio.play().catch(err => console.error("Playback error:", err));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Handle toggling between play and pause on player
  const togglePlayPause = async () => {
    if (mediaContext.state.isPlaying) {
      mediaContext.dispatch({type: "PAUSE"});
    } else {
      mediaContext.dispatch({ type: "PLAY" });
    }
  }

  const stopMedia = () => {
    mediaContext.dispatch({type: "STOP"});
  }

  return (
      <AnimatePresence>
        { media &&
          <motion.div
            className="sticky z-10 bottom-0 flex items-center justify-between text-white bg-[#32103F] dark:bg-neutral-900 w-full p-4 pr-8 border-t  border-purple-900 dark:border-neutral-700 gap-8"
            key={"id"}
            initial={{y: 100}}
            animate={{y: 0}}
            exit={{y: 100}}
            transition={{ ease: [0.785, 0.135, 0.15, 0.86], duration: 0.4 }}
          >
            { media.show &&
              <div className={"flex items-center gap-4 overflow-clip w-1/3" + (media.show.photo ? "" : " pl-4")}>

                { media.show.photo &&
                  <Image src={media.show.photo} alt={"Photo for the show: " + media.show.title} height={60} width={60} />
                }

                <Link href={"/show/?id=" + media.show.id} className={"flex flex-col justify-center text-nowrap h-[60px] overflow-clip text-ellipsis hover:underline"}>
                  <p className={"font-semibold"}>{media.show.title}</p>
                  <p className={"text-sm"}>
                    { media.show.hosts.length > 1 ?
                        <>
                          {media.show.hosts.slice(0, -1).join(", ")} and {media.show.hosts[media.show.hosts.length - 1]}
                        </>
                        :
                        <>{media.show.hosts[0]}</>
                    }
                  </p>
                </Link>

              </div>
            }

            <audio id={"media"} className={"w-full"} src={media.src} onError={() => console.error("Error accessing audio")} controls autoPlay ref={audioRef} />

            <div className={"flex items-center"}>
              { media.src === RADIO_SRC &&
                <p className={"font-semibold opacity-75"}>LIVE</p>
              }

              <button className={"leading-0"} onClick={togglePlayPause}>
                <span className={"material-symbols-sharp notranslate"} style={{fontSize: 36}}>
                  {isPlaying ? media.src === RADIO_SRC ? "stop" : "pause" : "play_arrow"}
                </span>
              </button>
            </div>

            <button className={"leading-0"} onClick={stopMedia}>
                <span className={"material-symbols-sharp notranslate"}>
                  close
                </span>
            </button>

          </motion.div>
        }
      </AnimatePresence>
  );
}