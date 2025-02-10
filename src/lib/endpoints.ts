export const COMMITTEE_ENDPOINT = "https://api.burnfm.com/committee"
export const SCHEDULE_ENDPOINT = "https://api.burnfm.com/new/schedule/get_collated"
export const NOW_PLAYING_ENDPOINT = (limit: number = 0) => SCHEDULE_ENDPOINT + "?include_default=true&limit_shows=" + limit;

export const GET_RADIOSHOW_ENDPOINT = (id?: number) => {
  if (id)
    return "https://api.burnfm.com/new/radio_show/get?include_timings=true&include_recordings=true&id=" + id;
  else
    return "https://api.burnfm.com/new/radio_show/get";
}
