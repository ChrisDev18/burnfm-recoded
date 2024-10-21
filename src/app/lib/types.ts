export type Day = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export type Schedule_API = {
  schedule: API_ScheduleItem[]
}

export type Now_Playing_API = {
  now_playing: API_ScheduleItem[]
}

export type API_ScheduleItem = {
  id: number,
  day: Day,
  start_time: string,
  end_time: string,
  duration: string,
  title: string,
  description: string,
  photo: string | null,
  hosts: string[]
}

export type Presenter = {
  name: string,
  excerpt: string
}

export type Show = {
  id: number,
  day: Day,
  title: string,
  description: string,
  duration: Date,
  start_time: Date,
  end_time: Date,
  img: string,
  hosts: string[]
}

export type ShowSchedule = {
  current_show: Show | null,
  next_shows: Show[]
}

export type PopupState = {
  visible: boolean,
  show: Show,
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