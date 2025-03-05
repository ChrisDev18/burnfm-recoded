export type Schedule_API = {
  data: API_ScheduleItem[]
}

export type Now_Playing_API = {
  now_playing: API_ScheduleItem[],
  up_next: API_ScheduleItem[]
}

export type API_ScheduleItem = {
  show_id: number,
  day: number,
  start_time: string,
  end_time: string,
  duration: string,
  title: string,
  description: string | null,
  photo: string | null,
  hosts: string[]
}

export type IShow = {
  id: number,
  title: string,
  description: string | null,
  hosts: string[],
  photo: string | null,
}

export type ShowEvent = {
  id: number,
  title: string,
  description: string,
  photo: string | null,
  hosts: string[],

  day: number,
  duration: Date,
  start_time: Date,
  end_time: Date,
}

export type IShowExtended = IShow & {
  recordings: {
    id: number,
    title: string | null,
    recording: string,
    recorded_at: Date
  } [],
  timings: {
    start_time: Date,
    end_time: Date,
    day: number,
    start_date: Date | null,
    end_date: Date | null
  } []
}

export type API_ShowExtended = IShow & {
  recordings: {
    id: number,
    title: string | null,
    recording: string,
    recorded_at: string
  } [],
  timings: {
    start_time: string,
    end_time: string,
    day: number,
    start_date: string | null,
    end_date: string | null
  } []
}


export type Recording = {
  id: number,
  show_id: number,
  recording: string,
  recorded_at: Date
}

export type ShowSchedule = {
  current_show: ShowEvent | null,
  next_shows: ShowEvent[]
}

export type PopupState = {
  visible: boolean,
  show: ShowEvent,
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