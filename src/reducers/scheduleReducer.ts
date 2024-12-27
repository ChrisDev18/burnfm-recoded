import {Show} from "@/lib/types";

export interface ScheduleState {
  loading: boolean;
  schedule: Show[] | null;
  error: string | null;
}

export const initialState: ScheduleState = {
  loading: true,
  schedule: null,
  error: null,
};

export type ScheduleAction =
    | { type: 'FETCH_REQUEST' }
    | { type: 'FETCH_SUCCESS', payload: Show[] }
    | { type: 'FETCH_FAILURE', payload: string };

export const scheduleReducer = (state: ScheduleState, action: ScheduleAction): ScheduleState => {
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