import {ShowSchedule, Show} from "@/app/lib/types";

export function decode_url(body: string) {
  // console.log("Splitting url");
  let tokens = body.split(":");
  // console.log("Tokens: " + tokens);

  let url = "https://api.broadcast.radio/api/image/" + tokens[1] + "." + tokens[0].split("/")[1] + "?g=center&w=400&h=400&c=true";
  // console.log("URL: " + url);
  return url;
}

// Returns a Schedule object with a value for current_show and top few songs (undefined amount - decided by API).
export async function getNowPlaying() {

  let schedule: ShowSchedule = {
    current_show: null,
    next_shows: []
  };

  let res = await fetch("https://api.broadcast.radio/api/nowplaying/957?");
  if (! res.ok) {
    console.error(res.statusText);
    return schedule;
  }

  let json = await res.json();


  json.body.schedule.forEach((show: any) => {

    let now = Date.now();

    let new_show: Show = {
      title: "",
      excerpt: "",
      img: null,
      start_time: new Date(parseInt(show.start_tza)),
      end_time: new Date(parseInt(show.end_tza)),
    };

    show.content.forEach((content: any) => {

      if (content.contentType.slug === "featuredImage") {
        new_show.img = decode_url(content.body);
      }

      if (content.contentType.slug === "show") {
        new_show.title = content.display_title;
        new_show.excerpt = content.excerpt;
      }
    });

    if (now >= show.start_tza && now <= show.end_tza) {
      // this is current show - assign current_show field
      schedule.current_show = new_show;

    } else {
      // this is a show in the schedule
      schedule.next_shows.push(new_show);
    }
  });
  // console.log(schedule)
  return schedule;
}


// Returns a Schedule object with no value for current_show, whole schedule.
export async function getWholeSchedule() {

  let schedule: Show[][] = [[],[],[],[],[],[],[]];

  let res = await fetch("https://api.broadcast.radio/api/nowplaying/957?scheduleLength=true");
  if (! res.ok) {
    console.error(res.statusText);
    return schedule;
  }

  let json = await res.json();
  json.body.schedule.forEach((show: any) => {

    let new_show: Show = {
      title: "",
      excerpt: "",
      img: null,
      start_time: new Date(parseInt(show.start_tza)),
      end_time: new Date(parseInt(show.end_tza)),
    };

    show.content.forEach((content: any) => {
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

    // this is a show in the schedule
    let day = new_show.start_time.getDay();

    // if a show with the same title and excerpt has already been added for the same day then stop
    // NOTE: This code only works assuming the API returns shows sorted by time
    if (schedule[day].some(item =>
      item.title === new_show.title
      && item.excerpt === new_show.excerpt
      && item.start_time.getHours() == new_show.start_time.getHours())) {
      return schedule;
    }

    schedule[day].push(new_show);

  });

  // console.log("Schedule:", schedule)
  return schedule;
}

