import {Profile} from "@/lib/types";

export interface CommitteeState {
  loading: boolean;
  committee: Profile[] | null;
  error: string | null;
}

export const initialState: CommitteeState = {
  loading: true,
  committee: null,
  error: null,
};

export type CommitteeAction =
    | { type: 'FETCH_REQUEST' }
    | { type: 'FETCH_SUCCESS', payload: Profile[] }
    | { type: 'FETCH_FAILURE', payload: string };

export const committeeReducer = (state: CommitteeState, action: CommitteeAction): CommitteeState => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, committee: action.payload };
    case 'FETCH_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};