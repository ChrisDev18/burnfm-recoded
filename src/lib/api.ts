import {API_ScheduleItem, API_ShowExtended, IShowExtended, Schedule_API, ShowEvent, ShowSchedule} from "@/lib/types";
import {GET_RADIOSHOW_ENDPOINT, NOW_PLAYING_ENDPOINT, SCHEDULE_ENDPOINT} from "@/lib/endpoints";


// Get the time offset in milliseconds
function getTimeZoneOffset(date: Date, timeZone: string): number {
  const localOffset = - date.getTimezoneOffset() / 60;  // Convert to hours

  // Format to string given a string format of time-zone
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    timeZoneName: "short"
  }).format(date);

  let serverOffset = 0;

  // Regular expression to match GMT offset in the form of "GMT+X" or "GMT-X"
  const regex = /GMT([+-]?\d+)/;
  const match = formattedDate.match(regex);

  if (match && match[1]) {
    serverOffset = parseInt(match[1], 10);
  }

  const result = localOffset - serverOffset;

  // console.log(`Offset of server time (${timeZone}): ${serverOffset}`);
  // console.log(`Offset of local time: ${localOffset}`);
  // console.log(`Offset of local time from server: ${result} minute(s))`);

  // Convert to milliseconds
  return result * 3600000;
}

function adjustToLocalTime(serverDate: Date, serverTimeZone: string): Date {
  // Get the server time zone offset in milliseconds
  const localOffsetFromServer = getTimeZoneOffset(serverDate, serverTimeZone);

  // Adjust the server date by applying the time delta
  return new Date(serverDate.getTime() + localOffsetFromServer);
}

// Forms show object given a ScheduleItem from the API
function formShowInSchedule(show: API_ScheduleItem, time_zone: string): ShowEvent {
  let start = new Date();
  let end = new Date();
  const duration = new Date();

  let [h, m, s] = show.start_time.split(':').map(Number);
  start.setHours(h, m, s);

  [h, m, s] = show.end_time.split(':').map(Number);
  end.setHours(h, m, s);
  end.setSeconds(end.getSeconds() + 1);

  [h, m, s] = show.duration.split(':').map(Number);
  duration.setHours(h, m, s);
  duration.setSeconds(duration.getSeconds() + 1);

  start = adjustToLocalTime(start, time_zone);
  end = adjustToLocalTime(end, time_zone);

  return {
    id: show.show_id,
    day: show.day,
    title: show.title,
    description: show.description ?? "",
    photo: show.photo ? "https://api.burnfm.com/uploads/schedule_img/" + show.photo : "",
    duration: duration,
    start_time: start,
    end_time: end,
    hosts: show.hosts
  };
}

function formShowObject(show: API_ShowExtended, time_zone: string): IShowExtended {
  return {
    ...show,
    photo: show.photo ? "https://api.burnfm.com/uploads/schedule_img/" + show.photo : null,
    timings: show.timings.map(timing => {
      let start = new Date();
      let end = new Date();

      let [h, m, s] = timing.start_time.split(':').map(Number);
      start.setHours(h, m, s);

      [h, m, s] = timing.end_time.split(':').map(Number);
      end.setHours(h, m, s);
      end.setSeconds(end.getSeconds() + 1);

      start = adjustToLocalTime(start, time_zone);
      end = adjustToLocalTime(end, time_zone);

      return {
        start_time: start,
        end_time: end,
        day: timing.day,
        start_date: timing.start_date ? new Date(timing.start_date) : null,
        end_date: timing.end_date ? new Date(timing.end_date) : null,
      }
    }),
    recordings: show.recordings.map(rec => ({
      ...rec,
      recording: "https://api.burnfm.com/" + rec.recording,
      recorded_at: new Date(rec.recorded_at)
    }))
  }
}

// Gets a list of shows from the schedule. If a day is specified, it only gets that day's shows.
export async function getSchedule(day?: number): Promise<ShowEvent[]> {
  let endpoint;
  if (day !== undefined) {
    endpoint = SCHEDULE_ENDPOINT + "?day=" + day;
  } else {
    endpoint = SCHEDULE_ENDPOINT;
  }

  const json = await fetchClient<Schedule_API>(endpoint);

  return json.data
      .map(scheduleItem => formShowInSchedule(scheduleItem, json.time_zone))
      .toSorted((a, b) => a.start_time.getTime() < b.start_time.getTime() ? -1 : 1);
}

// Returns the current_show as well as a list of next_shows.
export async function getNowPlaying(): Promise<ShowSchedule> {
  let json = await fetchClient<Schedule_API>(NOW_PLAYING_ENDPOINT(4));

  const shows = json.data.map(show => formShowInSchedule(show, json.time_zone));

  return {
    current_show: shows.shift() ?? null,
    next_shows: shows
  };
}

// Retrieve a show from the API.
export async function getShow(id: number): Promise<IShowExtended> {
  const res =  await fetchClient<{ time_zone: string, data: API_ShowExtended }>(GET_RADIOSHOW_ENDPOINT(id));

  return formShowObject(res.data, res.time_zone);
}

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export async function fetchClient<T>(url: string, options?: FetchOptions): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options?.headers,
      },
    });

    if (!response.ok) {
      // Parse error response
      const errorMessage = await response.text();
      throw new Error(
          `Error: ${response.status} - ${response.statusText} - ${errorMessage}`
      );
    }

    // Safely parse JSON if content exists
    if (response.status !== 204) {
      return await response.json();
    }

    return {} as T; // Return empty object for no content
  } catch (error: any) {
    // Handle network or parsing errors
    throw new Error(error.message || 'An unexpected error occurred');
  }
}
