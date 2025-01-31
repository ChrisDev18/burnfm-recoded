export const COMMITTEE_ENDPOINT = "https://api.burnfm.com/committee"
export const SCHEDULE_ENDPOINT = "https://api.burnfm.com/new/schedule/get_collated"
export const NOW_PLAYING_ENDPOINT = SCHEDULE_ENDPOINT + "?now_playing=true" // TODO: switch to this endpoint (needs to be implemented in backend)

export const GET_RADIOSHOW_ENDPOINT = (id?: number) => {
  if (id)
    return "https://api.burnfm.com/new/radio_show/get?include_timings=true&include_recordings=true&id=" + id;
  else
    return "https://api.burnfm.com/new/radio_show/get";
}
