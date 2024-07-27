import {API, API_ScheduleItem, Show, ShowSchedule} from "@/app/lib/types";

function decode_url(body: string) {
  // console.log("Splitting url");
  let tokens = body.split(":");
  // console.log("Tokens: " + tokens);

  return "https://api.broadcast.radio/api/image/" + tokens[1] + "." + tokens[0].split("/")[1] + "?g=center&w=400&h=400&c=true";
}

// Forms show object given a ScheduleItem from the API
function formShow(show: API_ScheduleItem) {
  let new_show: Show = {
    title: "",
    excerpt: "",
    img: null,
    start_time: new Date(show.start_time_in_station_tz),
    end_time: new Date(show.end_time_in_station_tz),
  };

  show.content.forEach((content) => {
    // only set the image if exists
    if (content.contentType.slug === "featuredImage") {
      new_show.img = decode_url(content.body);
    }

    // only set show details if exists
    if (content.contentType.slug === "show") {
      new_show.title = content.display_title;
      new_show.excerpt = content.excerpt;
    }

  });
  return new_show;
}

// Retrieve all the shows in the schedule from the API, sorted earliest to latest. Returns [] if there's an error
async function getAllShows() {
  let res = await fetch("https://api.broadcast.radio/api/nowplaying/957?scheduleLength=true");

  if (! res.ok) {
    console.error(res.statusText);
    return [];
  }

  // Extract the API Body
  let json = await res.json() as API;

  return json.body.schedule
      .map(scheduleItem => formShow(scheduleItem))
      .toSorted((a, b) => a.start_time.getTime() < b.start_time.getTime() ? -1 : 1);
}

// Returns the current_show as well as a list of next_shows.
export async function getNowPlaying() {

  let playerData: ShowSchedule = {
    current_show: null,
    next_shows: []
  };

  // Get all the shows from API (sorted from earliest to latest)
  const allShows = await getAllShows();

  // Go through the shows finding the current show, and the next three shows
  for (const show of allShows) {
    if (show.start_time.getTime() > Date.now() && playerData.next_shows.length < 3)
      playerData.next_shows.push(show);

    if (show.start_time.getTime() < Date.now() && show.end_time.getTime() > Date.now())
      playerData.current_show = show;

    if (playerData.next_shows.length >= 3 && playerData.current_show !== null)
      break;
  }

  // return {
  //   current_show: playerData.current_show,
  //   next_shows: [playerData.current_show, playerData.current_show, playerData.current_show]
  // }
  return playerData;

}

// Returns a Schedule split up by weekdays. If error, returns a list of empty lists
export async function getSchedule() {

  let schedule: Show[][] = [[],[],[],[],[],[],[]];

  const allShows = await getAllShows();

  allShows.forEach(show => {

    let day = show.start_time.getDay();

    // if a show with the same title and excerpt has already been added for the same day then stop
    if (schedule[day].some(item =>
      item.title === show.title
      && item.excerpt === show.excerpt
      && item.start_time.getHours() == show.start_time.getHours())) {
      return schedule;
    }

    schedule[day].push(show);
  });

  return schedule;
}

