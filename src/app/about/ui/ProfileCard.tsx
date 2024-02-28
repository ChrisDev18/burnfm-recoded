import Image from "next/image";
import {Profile} from "@/app/lib/types";
import styles from "./ProfileCard.module.css"

export default function ProfileCard({profile}: {profile: Profile}) {
  // get spotify track id
  let spotify_id;
  let temp = profile.favourite_song.match(/\/track\/([a-zA-Z0-9]+)/);
  if (temp === null || temp.length < 2) {
    console.error("Invalid url given for Spotify")
  } else {
    spotify_id = temp[1];
  }


  return (
    <div className={styles.Root}>
      {profile.picture !== "" ?
        <Image className={styles.Image}
               src={"https://burnfm.com" + profile.picture}  //.replace(/\.[^/.]+$/, "")
               alt={`Profile picture of ${profile.name}`}
               height={200}
               width={300}
               priority
        />
        :
        <div className={styles.ImgPlaceholder}>
          <span className={'material-symbols-rounded'}>person</span>
        </div>
      }

      <div className={styles.Content}>
        <p className={styles.Title}>{profile.role}</p>
        <p className={styles.Name}>{profile.name}</p>
        {/*<div className={styles.Email}>*/}
        {/*  <span className={"material-symbols-rounded"}>email</span>*/}
        {/*  <p>{profile.email}</p>*/}
        {/*</div>*/}

        <p>{profile.course !== ""? `Studies: ${profile.course}`: ""}</p>
        <p className={styles.Description}>{profile.description}</p>

        {profile.fun_fact !== "" ?
          <div className={styles.FunFact}>
            <div>
              <span className={'material-symbols-rounded'}>bolt</span>
              <p className={styles.Header}>Fun fact</p>
            </div>
            <p>{profile.fun_fact}</p>
          </div>
          : <></>
        }

        {profile.favourite_song !== "" ?
          <div className={styles.FavouriteSong}>
            <div>
              <span className={'material-symbols-rounded'}>favorite</span>
              <p className={styles.Header}>Favourite song</p>
            </div>
            <iframe style={{borderRadius: "16px", border: "none"}}
                    src={`https://open.spotify.com/embed/track/${spotify_id}?utm_source=generator`} width="100%"
                    height="80"
                    allowFullScreen={false}
                    loading="lazy"
            />
          </div>
          : <></>
        }
      </div>
    </div>
  )
    ;
}