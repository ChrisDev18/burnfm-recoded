import {
  API_ScheduleItem,
  days,
  Now_Playing_API,
  Schedule_API,
  Show as ShowType,
  Show,
  ShowSchedule
} from "@/app/lib/types";

// Forms show object given a ScheduleItem from the API
function formShow(show: API_ScheduleItem): Show {
  const start = new Date();
  const end = new Date();
  const duration = new Date();

  let [h, m, s] = show.start_time.split(':').map(Number);
  start.setHours(h, m, s);

  [h, m, s] = show.end_time.split(':').map(Number);
  end.setHours(h, m, s);
  end.setSeconds(end.getSeconds() + 1);

  [h, m, s] = show.duration.split(':').map(Number);
  duration.setHours(h, m, s);
  duration.setSeconds(duration.getSeconds() + 1);

  return {
    id: show.id,
    day: show.day,
    title: show.title,
    description: show.description,
    img: show.photo ? "https://api.burnfm.com/schedule_img/" + show.photo : "",
    duration: duration,
    start_time: start,
    end_time: end,
    hosts: show.hosts
  };
}

// Gets a list of shows from the schedule. If a day is specified, it only gets that day's shows.
export async function getSchedule(day?: number): Promise<Show[]> {
  let endpoint;
  if (day !== undefined) {
    endpoint = "https://api.burnfm.com/get_schedule?day=" + days[day];
  } else {
    endpoint = "https://api.burnfm.com/get_schedule";
  }

  const res = await fetch(endpoint);

  if (! res.ok) {
    console.error(res.statusText);
    return [];
  }

  // Extract the API Body
  let json = await res.json() as Schedule_API;

  return json.schedule
      .map(scheduleItem => formShow(scheduleItem))
      .toSorted((a, b) => a.start_time.getTime() < b.start_time.getTime() ? -1 : 1);
}

// Returns the current_show as well as a list of next_shows.
export async function getNowPlaying(): Promise<ShowSchedule> {
  let res = await fetch("https://api.burnfm.com/get_schedule?now_playing=true");

  if (! res.ok) {
    console.error(res.statusText);
    return {
      current_show: null,
      next_shows: []
    };
  }

  // Extract the API Body
  let json = await res.json() as Now_Playing_API;

  const upNext = json.up_next.map(formShow)

  const BurnOut: ShowType = {
    id: -1,
    day: days[new Date().getDay()],
    duration: new Date(),
    title: "Burn Out",
    description: "Nonstop tunes over the holidays.",
    start_time: new Date(),
    end_time: upNext? upNext[0].start_time : new Date(),
    img: "",
    hosts: ["Burn FM"]
  }

  return {
    current_show: json.now_playing ? formShow(json.now_playing[0]) : BurnOut,
    next_shows: upNext
  }
}

// Retrieve a show from the API.
export async function getShow(id: number) {
  const shows = await getSchedule();
  const occurrences = shows.filter(show => show.id === id);
  if (!occurrences.length)
    return null
  return occurrences[0]  // right now only gets first, worth editing for if a show runs multiple times a week
}
