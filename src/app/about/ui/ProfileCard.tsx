import Image from "next/image";
import {Profile} from "@/app/lib/types";
import styles from "./ProfileCard.module.css"

export default function ProfileCard({profile}: {profile: Profile}) {
  // get spotify track id
  let spotify_id;
  let temp = profile.fav_song.spotify.match(/\/track\/([a-zA-Z0-9]+)/);
  if (temp === null || temp.length < 2) {
    console.error("Invalid url given for Spotify")
  } else {
    spotify_id = temp[1];
  }


  return (
    <div className={styles.Root}>
      <Image className={styles.Image}
             src={"https://burnfm.com" + profile.picture.replace(/\.[^/.]+$/, "")}
             alt={`Profile picture of ${profile.name}`}
             height={200}
             width={300}
      />

      <div className={styles.Content}>
        <p className={styles.Title}>{profile.title}</p>
        <p className={styles.Name}>{profile.name}</p>
        <div className={styles.Email}>
          <span className={"material-symbols-rounded"}>email</span>
          <p>{profile.email}</p>
        </div>

        <p className={styles.Description}>{profile.description}</p>
        {/*<p>{profile.fav_song.title}</p>*/}
        {/*<p>{profile.fav_song.artist}</p>*/}
        <p className={styles.SongHeader}>Favourite song</p>
        <iframe style={{borderRadius: "12px", border: "none"}}
                src={`https://open.spotify.com/embed/track/${spotify_id}?utm_source=generator`} width="100%"
                height="80"
                allowFullScreen={false}
                loading="lazy"
        />
        {/*<iframe allow="autoplay *; encrypted-media *;"*/}
        {/*        height="150"*/}
        {/*        style={{border: "none", borderRadius: "12px", width: "100%", maxWidth: "660px", overflow: "hidden", background:"transparent"}}*/}
        {/*        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"*/}
        {/*        src="https://embed.music.apple.com/gb/album/my-mind-me/1652136594?i=1652136887"*/}
        {/*/>*/}
      </div>
    </div>
  );
}