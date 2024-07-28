import {useEffect, useState} from "react";
import {getShow} from "@/app/lib/fetchdata";
import {notFound} from "next/navigation";
import {Show} from "@/app/lib/types";

export default function ShowDetailsPage({id}: {id: number}) {
  const [show, setShow] = useState<Show|null|undefined>(null);

  useEffect(() => {
    getShow(id).then(show => setShow(show))
  }, [id]);

  if (show === undefined) return notFound();

  return (
      <div>
        <p>
          {show?.start_time
            .toLocaleTimeString(['en'], {weekday: "short", hour: "2-digit", minute: "2-digit"})} - {show?.end_time
            .toLocaleTimeString(['en'], {weekday: "short", hour: "2-digit", minute: "2-digit"})}
        </p>
        <h1>{show?.title}</h1>
        <p>{show?.excerpt !== "" ? show?.excerpt : "This show has no excerpt"}</p>
        <p>{show?.img}</p>
      </div>
  )
}