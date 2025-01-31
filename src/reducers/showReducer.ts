import {IShowExtended} from "@/lib/types";

export interface ShowState {
  loading: boolean;
  show: IShowExtended | null;
  error: string | null;
}

export const initialState: ShowState = {
  loading: true,
  show: null,
  error: null,
};

export type ShowAction =
    | { type: 'FETCH_REQUEST' }
    | { type: 'FETCH_SUCCESS', payload: IShowExtended }
    | { type: 'FETCH_FAILURE', payload: string };

export const showReducer = (state: ShowState, action: ShowAction): ShowState => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, show: action.payload };
    case 'FETCH_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};