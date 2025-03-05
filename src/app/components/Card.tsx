import styles from "@/app/page.module.css";
import Link from "next/link";
import buttons from "@/app/styles/buttons.module.css";
import Image from "next/image";

type props = {
    // CSS colour representing the card's background and icon colour
    heading: string,
    body: string[],
    links: {
        text: string,
        link: string,
        image: { src: any, alt: string } | null
    }[]
    colour: string,
    // The Google Material Symbols id of the icon you wish to use. Do not use with image
    icon: string | null,
    // Do not use with icon
    image: { src: string, alt: string } | null,
}

export default function Card({heading, body, links, colour, icon=null, image=null}: props) {

    const linkButtons = links.map((link, i) =>
        <Link href={link.link} className={buttons.Button} key={i}>
            {link.image &&
                <Image
                    src={link.image.src}
                    alt={link.image.alt}
                    height={28}
                    width={28}
                />
            }
            {link.text}
        </Link>
    )

    return (
        <div className={styles.CardWrapper}>
            <div className={styles.Card} style={{background: colour}}>
                <h2>{heading}</h2>
                {body.map((p, i) => <p key={i}>{p}</p>)}
                {linkButtons}
            </div>

            {icon &&
                <div className={styles.CardIcon}>
                    <span className={"material-symbols-sharp notranslate"} style={{color: colour}}>
                      {icon}
                    </span>
                </div>
            }

            {image &&
                <Image
                    className={styles.CardIcon}
                    src={image.src}
                    alt={image.alt}
                    height={64}
                    width={64}
                />
            }
        </div>
    )
}