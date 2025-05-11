import React from "react";
import {notFound} from "next/navigation";
import {getShow} from "@/lib/api";
import {Metadata} from "next";
import styles from "@/app/show/[show_id]/show.module.css";
import Image from "next/image";
import RecordingButton from "@/app/show/[show_id]/RecordingButton";
import Motion from "@/app/components/motion";


export async function generateMetadata({ params }: { params: Promise<{ show_id: string }> }): Promise<Metadata> {
  const { show_id } = await params
  const id = parseInt(show_id);

  try {
    const show = await getShow(id);
    if (show) return {
      title: show.title + " - Burn FM",
    }
  } catch (e) {}

  return {
    title: "Burn FM",
  }
}


export default async function Page({ params }: { params: Promise<{ show_id: string }> }) {
  const { show_id } = await params;
  const id = parseInt(show_id);
  if (isNaN(id)) return notFound();

  const show = await getShow(id);

  if (!show) return notFound();

  return (
      <Motion type={'div'}
              className={styles.root}
              transition={{duration: 0.2, type: "tween", delay: 0.2}}
              initial={{opacity: 0}}
              animate={{opacity: 1}}>

        <div className={styles.hero}>
          {show.photo &&
            <Image className={styles.image}
                   src={show.photo}
                   alt={"Cover photo for" + show.title}
                   height={400}
                   width={400}
                   priority
            />
          }

          <h1 className={`notranslate ${styles.title}`}>{show.title}</h1>
          {show.hosts &&
            <h3 className={styles.sectionHeader}>
              Presented by { show.hosts.length > 1 ?
                <>
                  <strong>{show.hosts.slice(0, -1).join(", ")}</strong> and <strong>{show.hosts[show.hosts.length - 1]}</strong>
                </>
                :
                <strong>{show.hosts[0]}</strong>
            }
            </h3>
          }
        </div>

        <div className={styles.details}>
          {show.description ?
              <p className={styles.description}>{show.description}</p>
              :
              <p className={styles.placeholderText}>This show has no description</p>
          }
        </div>

        <div className={styles.onDemand}>
          <h2>On demand</h2>
          <p>Listen back to previous episodes, recorded every hour</p>

          <div>

            { show.recordings.length == 0 ? (
                <p className={styles.placeholderText}>No recordings for this show</p>
            ) : <>
              { show.recordings
                  .toSorted((a, b) => a.recorded_at.getTime() - b.recorded_at.getTime())
                  .map((recording, i) =>
                      <RecordingButton key={i} show={show} recording={recording} />
                  )
              }
            </>
            }

          </div>

        </div>

      </Motion>
  )
}