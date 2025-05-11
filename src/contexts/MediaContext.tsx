"use client"

import React, { createContext, useContext, useReducer } from "react";
import {IShow} from "@/lib/types";

type IMedia = { src: string, show?: IShow }

type MediaState = {
  media: IMedia | null;
  isPlaying: boolean;
}

type MediaAction =
    | { type: 'PLAY' }
    | { type: 'PAUSE' }
    | { type: 'STOP' }
    | { type: 'SET_MEDIA', payload: IMedia};


// Initial state
const initialState: MediaState = {
  isPlaying: false,
  media: null, // The currently playing media (URL, metadata, etc.)
};

// Reducer function
function mediaReducer(state: MediaState, action: MediaAction): MediaState {
  switch (action.type) {
    case "PLAY":
      return { ...state, isPlaying: true };
    case "PAUSE":
      return { ...state, isPlaying: false };
    case "STOP":
      return { ...state, isPlaying: false, media: null };
    case "SET_MEDIA":
      return { ...state, media: action.payload, isPlaying: true };
    default:
      return state;
  }
}

// Create context
const MediaContext = createContext<{ state: MediaState, dispatch: React.ActionDispatch<[action: MediaAction]> } | null>(null);

// Provider component
export const MediaProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mediaReducer, initialState);

  return (
      <MediaContext.Provider value={{ state, dispatch }}>
        {children}
      </MediaContext.Provider>
  );
};

// Custom hook to use media context
export const useMedia = () => {
  const context = useContext(MediaContext);
  if (context === null) {
    throw new Error(
        'useAudioPlayerContext must be used within an AudioPlayerProvider'
    );
  }
  return context;
}