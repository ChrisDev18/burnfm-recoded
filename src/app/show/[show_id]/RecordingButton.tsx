"use client"

import React from 'react';
import buttonStyles from "@/app/styles/buttons.module.css";
import {useMedia} from "@/contexts/MediaContext";
import {IRecording, IShowExtended} from "@/lib/types";
import {PlayCircleIcon, StopCircleIcon} from "lucide-react";

export default function RecordingButton({show, recording}: {show: IShowExtended, recording: IRecording }) {
  const mediaContext = useMedia();

  const togglePlay = (recording: {id: number, title: string | null, recording: string, recorded_at: Date }) => {
    if (mediaContext.state.isPlaying && mediaContext.state.media?.src === recording.recording) {
      mediaContext.dispatch({ type: "STOP" });
    } else {
      mediaContext.dispatch({ type: "SET_MEDIA", payload: { src: recording.recording, show: show ?? undefined } });
    }
  }

  return (
      <button className={buttonStyles.Button}
              type={"button"}
              onClick={() => togglePlay(recording)}
      >
        {recording.title}
        { mediaContext.state.media?.src === recording.recording && mediaContext.state.isPlaying ?
            <StopCircleIcon /> :
            <PlayCircleIcon />
        }
      </button>
  );
}