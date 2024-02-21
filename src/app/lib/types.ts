export type Show = {
  title: string,
  excerpt: string,
  start_time: Date,
  end_time: Date,
  img: string | null
}

export type ShowSchedule = {
  current_show: Show | null,
  next_shows: Show[]
}

export type PopupState = {
  visible: boolean,
  img: string | null,
  title: string,
  excerpt: string
}

export type Profile = {
  name: string,
  role: string,
  course: string,
  description: string,
  picture: string,
  favourite_song: string,
  fun_fact: string,
}

export const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
] as const;

export type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6;