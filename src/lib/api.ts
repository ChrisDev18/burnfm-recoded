import {API_ScheduleItem, API_ShowExtended, IShowExtended, Schedule_API, Show, ShowSchedule} from "@/lib/types";
import {GET_RADIOSHOW_ENDPOINT, NOW_PLAYING_ENDPOINT, SCHEDULE_ENDPOINT} from "@/lib/endpoints";


// Forms show object given a ScheduleItem from the API
function formShow(show: API_ScheduleItem): Show {
  const start = new Date();
  const end = new Date();
  const duration = new Date();

  let [h, m, s] = show.start_time.split(':').map(Number);
  start.setUTCHours(h, m, s);

  [h, m, s] = show.end_time.split(':').map(Number);
  end.setUTCHours(h, m, s);
  end.setUTCSeconds(end.getUTCSeconds() + 1);

  [h, m, s] = show.duration.split(':').map(Number);
  duration.setUTCHours(h, m, s);
  duration.setUTCSeconds(duration.getUTCSeconds() + 1);

  return {
    id: show.show_id,
    day: show.day,
    title: show.title,
    description: show.description ?? "",
    img: show.photo ? "http://api.burnfm.com/uploads/schedule_img/" + show.photo : "",
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
    endpoint = SCHEDULE_ENDPOINT + "?day=" + day;
  } else {
    endpoint = SCHEDULE_ENDPOINT;
  }

  const json = await fetchClient<Schedule_API>(endpoint);

  return json.data
      .map(scheduleItem => formShow(scheduleItem))
      .toSorted((a, b) => a.start_time.getTime() < b.start_time.getTime() ? -1 : 1);
}

// Returns the current_show as well as a list of next_shows.
export async function getNowPlaying(): Promise<ShowSchedule> {
  let json = await fetchClient<Schedule_API>(NOW_PLAYING_ENDPOINT(4));

  const shows = json.data.map(formShow);

  return {
    current_show: shows.shift() ?? null,
    next_shows: shows
  };
}

// Retrieve a show from the API.
export async function getShow(id: number): Promise<IShowExtended> {
  const show =  await fetchClient<API_ShowExtended>(GET_RADIOSHOW_ENDPOINT(id));

  console.log(show.show);

  return show.show;

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
