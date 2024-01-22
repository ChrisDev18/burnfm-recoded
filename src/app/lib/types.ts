export type Show = {
  title: string,
  excerpt: string,
  start_time: Date,
  end_time: Date,
  img: string | null
}

export type Schedule = {
  current_show: Show | null,
  next_shows: Show[]
}