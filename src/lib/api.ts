import {API_ScheduleItem, API_ShowExtended, IShow, IShowExtended, Schedule_API, Show, ShowSchedule} from "@/lib/types";
import {GET_RADIOSHOW_ENDPOINT, SCHEDULE_ENDPOINT} from "@/lib/endpoints";


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
  let json = await fetchClient<Schedule_API>(SCHEDULE_ENDPOINT + "?include_default=true");

  const shows = json.data.map(formShow);

  const now = new Date();

  // Find the currently playing show
  const current_show = shows.find(
      show => show.day === now.getDay() &&
      show.start_time.getTime() <= now.getTime() &&
      now.getTime() < show.end_time.getTime()
  );

  // Find the next show
  const upNext = shows
      .filter(show => show.start_time.getTime() > now.getTime()) // Only future shows
      .sort((a, b) => a.start_time.getTime() - b.start_time.getTime()) // Get the next soonest show
      .slice(0, 2) || null;

  return {
    current_show: current_show ?? null,
    next_shows: upNext ? upNext : []
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
