import {ShowSchedule} from "@/lib/types";

export interface NowPlayingState {
  loading: boolean;
  schedule: ShowSchedule;
  error: string | null;
}

const emptySchedule: ShowSchedule = {
  current_show: null,
  next_shows: []
}

export const initialState: NowPlayingState = {
  loading: true,
  schedule: emptySchedule,
  error: null,
};

export type NowPlayingAction =
    | { type: 'FETCH_REQUEST' }
    | { type: 'FETCH_SUCCESS', payload: ShowSchedule }
    | { type: 'FETCH_FAILURE', payload: string };

export const nowplayingReducer = (state: NowPlayingState, action: NowPlayingAction): NowPlayingState => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, schedule: action.payload };
    case 'FETCH_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};