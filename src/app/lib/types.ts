export type API = {
  body: {
    schedule: API_ScheduleItem[]
  }
}

export type API_ScheduleItem = {
  start_time_in_station_tz: number,
  end_time_in_station_tz: number,
  content: {
    contentType: {
      display_name: string,
      slug: string,
    },
    display_title: string,
    excerpt: string,
    body: string,
    href: string
  }[]
}

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

export const DefaultExcerpts = [
  "Experience the vibrant energy of student radio on another one of BurnFM's shows.",
  "Listen in to join the excitement of student-led radio with us on BurnFM.",
  "Catch the buzz of student creativity on another one of BurnFM's shows.",
  "Experience the passion and enthusiasm of student broadcasting.",
  "Join the fun with another one of our student-hosted radio programs.",
  "Stay tuned for another exciting student-led show on BurnFM."
];