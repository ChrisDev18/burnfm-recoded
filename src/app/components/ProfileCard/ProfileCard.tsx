import Image from "next/image";
import {Profile} from "@/lib/types";
import styles from "./ProfileCard.module.css"

export default function ProfileCard({profile, priority}: {profile: Profile, priority: boolean}) {
  // get spotify track id
  let spotify_id: string | null = null;
  if (profile.favourite_song !== "") {
    let temp = profile.favourite_song.match(/\/track\/([a-zA-Z0-9]+)/);
    if (temp === null || temp.length < 2) {
      console.error("Invalid url given for Spotify: " + profile.favourite_song + " goes to: " + temp)
    } else {
      spotify_id = temp[1];
    }
  }

  return (
    <div className={styles.Root}>
      {profile.picture !== "" ?
        <Image className={styles.Image}
               priority={priority}
               src={"https://api.burnfm.com/committee" + profile.picture}
               alt={`Profile picture of ${profile.name}`}
               height={200}
               width={300}
        />
        :
        <div className={styles.ImgPlaceholder}>
          <span className={'material-symbols-sharp notranslate'}>person</span>
        </div>
      }

      <div className={styles.Content}>
        <p className={styles.Title}>{profile.role}</p>
        <p className={`${styles.Name} notranslate`}>{profile.name}</p>
        <p>{profile.course !== ""? `Studies: ${profile.course}`: ""}</p>

        <div className={styles.Description}>
          {profile.description.split("\n").map((line, index) => (
              <p key={index}>
                {line}
              </p>
          ))}
        </div>

        {profile.fun_fact !== "" ?
          <div className={styles.FunFact}>
            <div className={styles.IconHeader}>
              <span className={'material-symbols-sharp notranslate'}>bolt</span>
              <p className={styles.Header}>Fun fact</p>
            </div>
            <p>{profile.fun_fact}</p>
          </div>
          : <></>
        }

        {(profile.favourite_song !== "" || spotify_id !== null) ?
          <div className={styles.FavouriteSong}>
            <div className={styles.IconHeader}>
              <span className={'material-symbols-sharp notranslate'}>favorite</span>
              <p className={styles.Header}>Favourite song</p>
            </div>
            <iframe style={{borderRadius: "16px", border: "none"}}
                    src={`https://open.spotify.com/embed/track/${spotify_id}?utm_source=generator`} width="100%"
                    height="80"
                    allowFullScreen={false}
                    title={"Spotify player"}
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