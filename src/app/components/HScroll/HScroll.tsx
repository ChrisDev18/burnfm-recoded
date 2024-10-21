import styles from "@/app/components/HScroll/HScroll.module.css";
import bStyles from "@/app/styles/buttons.module.css"
import {ReactNode, useCallback, useEffect, useRef, useState} from "react";

export default function HScroll({
  children,
    color
}: {
  children?: ReactNode,
  color: string
}) {
  const content = useRef<HTMLDivElement|null>(null);
  const [contentRefState, setContentRefState] =
      useState<HTMLDivElement|null>(null);

  const handleScroll = useCallback(() => {
    const visibilities = [false, false];
    if (contentRefState?.scrollLeft) {
      console.log(contentRefState.scrollWidth);
      visibilities[0] = contentRefState.scrollLeft > 1;
      visibilities[1] = contentRefState.scrollLeft < (contentRefState.scrollWidth-contentRefState.clientWidth);
    } else if (contentRefState){
      visibilities[0] = false;
      visibilities[1] = contentRefState.scrollWidth > contentRefState.clientWidth;
    }

    const left = document.getElementById("button-left")
    if (left)
      left.style.display = visibilities[0]? "flex" : "none";

    const right = document.getElementById("button-right")
    if (right)
      right.style.display = visibilities[1]? "flex" : "none";
  }, [contentRefState])

  useEffect(() => {
    if (!content.current) return
    setContentRefState(content.current);
    window.addEventListener("resize", handleScroll);
    handleScroll();
  }, [handleScroll]);

  const scrollLeft = () => {
    if (!content.current?.scrollTo) return;
    const div = content.current;
    const scrollAmount = div.clientWidth * 0.5;
    const maxScrollLeft = div.scrollLeft;
    const scrollBy = Math.min(scrollAmount, maxScrollLeft);
    content.current.scrollBy({
      top: 0,
      left: -scrollBy,
      behavior: "smooth",
    });
  }

  const scrollRight = () => {
    if (!content.current?.scrollTo) return;
    const div = content.current;
    const scrollAmount = div.clientWidth * 0.5;
    const maxScrollLeft = div.scrollWidth - div.clientWidth - div.scrollLeft;
    const scrollBy = Math.min(scrollAmount, maxScrollLeft);
    content.current.scrollBy({
      top: 0,
      left: scrollBy,
      behavior: "smooth",
    });
  }

  return (
      <div className={styles.root}>

        <div className={styles.left} id={"button-left"} style={{background: `linear-gradient(270deg, transparent 0%, ${color} 100%)`}}>
            <button className={`${bStyles.iconic} ${styles.button} ${styles.back}`}
                    onClick={scrollLeft}>
              <span className={"material-symbols-rounded notranslate"}>
                chevron_left
              </span>
            </button>
        </div>


        <div ref={content} className={styles.scrollContainer} onScroll={handleScroll}>
          {children}
        </div>

        <div className={styles.right} id={"button-right"} style={{background: `linear-gradient(90deg, transparent 0%, ${color} 100%)`}}>
            <button className={`${bStyles.iconic} ${styles.button} ${styles.forward}`}
                    onClick={scrollRight}>
              <span className={"material-symbols-rounded notranslate"}>
                chevron_right
              </span>
            </button>
        </div>

      </div>
  )
}